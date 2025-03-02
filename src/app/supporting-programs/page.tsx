'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { SUPPORTING_PROGRAM_LIST_COLUMNS, SUPPORTING_PROGRAM_CENTER_COLUMNS } from '@/features/supporting-programs/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify'
import { truncateText } from '@/lib/utils'
import { parse, format } from 'date-fns'
import { SupportingProgramTableData } from '@/features/supporting-programs/schemas/supportingProgramTableDataSchema'

import { getAllSupportingPrograms, SupportingProgramQueryParams } from '@/features/supporting-programs/APIs'
import ListActions from '@/components/list/ListActions'
import ListLayout from '@/components/ListLayout'

const LIMIT = 12

export default function TestListPage() {
    const [data, setData] = useState<SupportingProgramTableData[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | null>(null)
    const [totalItems, setTotalItems] = useState<number | null>(null)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();


    const fetchData = async () => {
        const result = await getAllSupportingPrograms(Object.fromEntries(searchParams) as SupportingProgramQueryParams)

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

    const formatDate = (date: string) => {
        return format(parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date()), 'dd/MM/yyyy HH:mm')
    }

    const renderCell = useCallback((articleTableData: SupportingProgramTableData, columnKey: React.Key) => {
        const cellValue = articleTableData[columnKey as keyof SupportingProgramTableData]

        switch (columnKey) {
            case "id":
                return <div>{cellValue as number}</div>
            case "title":
                return <div className='w-80 truncate'>{cellValue as string}</div>
            case "street":
                return <div>{cellValue as string}</div>
            case "ward":
                return <div>{cellValue as string}</div>
            case "city":
                return <div>{cellValue as string}</div>
            case "province":
                return <div>{cellValue as string}</div>
            case "postalCode":
                return <div>{cellValue as string}</div>
            case "startDateAt":
                return <div>{formatDate(cellValue as string)}</div>
            case "isActive":
                return <div>{cellValue == true ? "Hiện" : "Ẩn"}</div>
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
                    tableColumns={SUPPORTING_PROGRAM_LIST_COLUMNS}
                    tableCenterColumns={SUPPORTING_PROGRAM_CENTER_COLUMNS}
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
