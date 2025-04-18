'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { BLOG_LIST_COLUMNS, BLOG_CENTER_COLUMNS } from '@/features/resources/blogs/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify'
import { truncateText } from '@/lib/utils'
import { BlogTableData } from '@/features/resources/blogs/schemas/blogTableDataSchema'

import { getAllBlogs, BlogQueryParams } from '@/features/resources/blogs/APIs'
import ListActions from '@/components/list/ListActions'
import ListLayout from '@/components/ListLayout'
import { toggleResourceStatus } from '@/features/resources/common/APIs';

const LIMIT = 12

export default function BlogListPage() {
    const [data, setData] = useState<BlogTableData[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | null>(null)
    const [totalItems, setTotalItems] = useState<number | null>(null)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();


    const fetchData = async () => {
        const result = await getAllBlogs(Object.fromEntries(searchParams) as BlogQueryParams)

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
            const result = await toggleResourceStatus(id);
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


    const renderCell = useCallback((blogTableData: BlogTableData, columnKey: React.Key) => {
        const cellValue = blogTableData[columnKey as keyof BlogTableData]

        switch (columnKey) {
            case "id":
                return <div>{cellValue as number}</div>
            case "title":
                return <div className='w-80 truncate'>{cellValue as string}</div>
            case "introduction":
                return <div className='w-80 truncate'>{cellValue as string}</div>
            case "resourceType":
                return <div>{cellValue as string}</div>
            case "isActive":
                return (<span
                    className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${cellValue == true
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'}
                    `}
                >
                    {cellValue == true ? "Enabled" : "Disabled"}
                </span>)
            case "specializationName":
                return <div>{cellValue as string}</div>
            case "schoolManagerName":
                return <div>{cellValue as string}</div>
            case "actions":
                return <ListActions
                    id={blogTableData.id}
                    onToggleStatus={() => handleToggleStatus(blogTableData.id)}
                />
        }
    }, [handleToggleStatus])

    const searchBoxProps = {
        placeholder: 'Tìm kiếm tiêu đề',
        searchField: 'SearchTitle'
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])



    return (
        <>
            {data &&
                <ListLayout
                    data={data}
                    tableColumns={BLOG_LIST_COLUMNS}
                    tableCenterColumns={BLOG_CENTER_COLUMNS}
                    searchParams={searchParams}
                    totalPages={totalPages as number | null}
                    createHref='/blogs/create'
                    searchBoxProps={searchBoxProps}
                    totalItems={totalItems}
                    renderCell={renderCell}
                    onInputChange={handleInputChange}
                />
            }
        </>
    )
}
