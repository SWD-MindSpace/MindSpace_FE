'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { TEST_LIST_COLUMNS, TEST_CENTER_COLUMNS } from '../../features/tests/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify'
import { truncateText } from '@/lib/utils'
import { TestTableData } from '@/features/tests/schemas/testTableDataSchema'

import { getAllTests, TestQueryParams, toggleTestStatus } from '@/features/tests/APIs'
import ListActions from '@/components/list/ListActions'
import ListLayout from '@/components/ListLayout'

const LIMIT = 12

export default function TestListPage() {
    const [data, setData] = useState<TestTableData[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | null>(null)
    const [totalItems, setTotalItems] = useState<number | null>(null)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();


    const fetchData = async () => {
        const result = await getAllTests(Object.fromEntries(searchParams) as TestQueryParams)

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
            const result = await toggleTestStatus(id);
            fetchData();
        } catch (error) {
            toast.error('Có lỗi xảy ra');
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


    const renderCell = useCallback((testData: TestTableData, columnKey: React.Key) => {
        const cellValue = testData[columnKey as keyof TestTableData]

        switch (columnKey) {
            case "id":
                return <div>{cellValue as number}</div>
            case "title":
                return <div className='w-80 truncate'>{cellValue as string}</div>
            case "testCode":
                return <div>{cellValue as string}</div>
            case "targetUser":
                return <div>{cellValue as string === 'Student' ? 'Học sinh' : 'Phụ huynh'}</div>
            case "description":
                return <div>{truncateText(cellValue as string)}</div>
            case "questionCount":
                return <div>{cellValue as number}</div>
            case "price":
                return <div>{cellValue as number}</div>
            case "testStatus":
                return (
                    <span
                        className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${cellValue === 'Enabled'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'}
                        `}
                    >
                        {cellValue}
                    </span>
                )
            case "actions":
                return (
                    <ListActions
                        id={testData.id}
                        onToggleStatus={() => handleToggleStatus(testData.id)}
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
                    tableColumns={TEST_LIST_COLUMNS}
                    tableCenterColumns={TEST_CENTER_COLUMNS}
                    searchParams={searchParams}
                    totalPages={totalPages as number | null}
                    createHref='/tests/create'
                    searchBoxProps={searchBoxProps}
                    totalItems={totalItems}
                    renderCell={renderCell}
                    onInputChange={handleInputChange}
                />
            }
        </>
    )
}
