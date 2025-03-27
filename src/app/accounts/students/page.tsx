'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ACCOUNT_LIST_COLUMNS, ACCOUNT_CENTER_COLUMNS } from '@/features/accounts/common/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify'
import { formatDate, truncateText } from '@/lib/utils'
import { AccountTableData } from '@/features/accounts/common/schemas/AccountTableSchema'

import { getAllAccounts, AccountQueryParams, getAllStudents, toggleAccountStatus } from '@/features/accounts/common/APIs'
import ListActions from '@/components/list/ListActions'
import ListLayout from '@/components/ListLayout'

import { ROLE_ID } from '@/features/accounts/common/constants';

const LIMIT = 12

export default function StudentListPage() {
    const [data, setData] = useState<AccountTableData[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | null>(null)
    const [totalItems, setTotalItems] = useState<number | null>(null)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const currentUser = localStorage.getItem('userInfo');
    const schoolId = currentUser ? JSON.parse(currentUser).schoolId : null;


    const fetchData = async () => {
        const params = Object.fromEntries(searchParams) as AccountQueryParams
        params.RoleId = ROLE_ID.STUDENT
        params.PageSize = LIMIT
        params.SchoolId = schoolId

        const result = await getAllStudents(params)
        if (result.status === 'success') {
            const { data, count } = result.data
            if (count) {
                setData(data)
                setTotalItems(count)
                setTotalPages(Math.ceil(count / LIMIT))
            } else {
                setData([])
                setTotalItems(null)
                setTotalPages(null)
            }
        } else {
            setData([])
            toast.error(result?.error)
        }
    }

    const handleToggleStatus = async (id: number) => {
        try {
            const result = await toggleAccountStatus(id);
            fetchData();
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    }

    // for optimization: useDebouncedCallback
    const handleInputChange = useDebouncedCallback((key, value) => {
        const params = new URLSearchParams(searchParams);

        params.set(key, value);
        if (params.has('PageIndex') && key !== 'PageIndex') {
            params.delete('PageIndex')
        }
        if (!value) {
            params.delete(key)
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300)


    const renderCell = useCallback((accountData: AccountTableData, columnKey: React.Key) => {
        const cellValue = accountData[columnKey as keyof AccountTableData]
        switch (columnKey) {
            case "id":
            case "email":
            case "fullName":
            case "phoneNumber":
            case "userName":
                return <span>{cellValue}</span>
            case "status":
                return (<span
                    className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${cellValue === 'Enabled'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'}
                    `}
                >
                    {cellValue}
                </span>)
            case "dateOfBirth":
                return <span>{formatDate(typeof cellValue === 'number' ? cellValue.toString() : cellValue)}</span>
            case "actions":
                return (
                    <ListActions
                        id={accountData.id}
                        onToggleStatus={() => handleToggleStatus(accountData.id)}
                    />
                )
            default:
                return <span>{cellValue}</span>
        }
    }, [handleToggleStatus])

    const searchBoxProps = {
        placeholder: 'Tìm kiếm tiêu đề',
        searchField: 'Title'
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])

    return (
        <>
            {data &&
                <ListLayout
                    data={data}
                    tableColumns={ACCOUNT_LIST_COLUMNS}
                    tableCenterColumns={ACCOUNT_CENTER_COLUMNS}
                    searchParams={searchParams}
                    totalPages={totalPages as number | null}
                    createHref='/students/create'
                    searchBoxProps={searchBoxProps}
                    totalItems={totalItems}
                    renderCell={renderCell}
                    onInputChange={handleInputChange}
                />
            }
        </>
    )
}
