'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ACCOUNT_LIST_COLUMNS, ACCOUNT_CENTER_COLUMNS } from '@/features/accounts/common/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify'
import { truncateText } from '@/lib/utils'
import { AccountTableData } from '@/features/accounts/common/schemas/AccountTableSchema'

import { getAllAccounts, AccountQueryParams } from '@/features/accounts/common/APIs'
import ListActions from '@/components/list/ListActions'
import ListLayout from '@/components/ListLayout'

const LIMIT = 12

export default function PsychologistListPage() {
    const [data, setData] = useState<AccountTableData[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | null>(null)
    const [totalItems, setTotalItems] = useState<number | null>(null)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();


    const fetchData = async () => {
        let params = Object.fromEntries(searchParams) as AccountQueryParams
        params.RoleId = 3
        const result = await getAllAccounts(params)

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


    // for optimization: useDebouncedCallback
    const handleInputChange = useDebouncedCallback((key, value) => {
        const params = new URLSearchParams(searchParams);

        params.set(key, value);
        if (params.has('PageIndex') && key !== 'PageIndex') {   // if search or filter, reset pageIndex to 1
            params.delete('PageIndex')
        }
        if (!value) {
            params.delete(key)
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300)


    const renderCell = useCallback((testData: AccountTableData, columnKey: React.Key) => {
        const cellValue = testData[columnKey as keyof AccountTableData]
        switch (columnKey) {
            case "id":
                return <span>{cellValue}</span>
            case "email":
                return <span>{cellValue}</span>
            case "fullName":
                return <span>{cellValue}</span>
            case "phoneNumber":
                return <span>{cellValue}</span>
            case "userName":
                return <span>{cellValue}</span>
            case "dateOfBirth":
                return <span>{cellValue}</span>
            case "status":
                return <span>{cellValue}</span>
            case "actions":
                return <ListActions />
        }
    }, [])

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
                    createHref='/psychologists/create'
                    searchBoxProps={searchBoxProps}
                    totalItems={totalItems}
                    renderCell={renderCell}
                    onInputChange={handleInputChange}
                />
            }
        </>
    )
}
