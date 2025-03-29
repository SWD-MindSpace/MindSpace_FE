'use client'

import React from 'react'
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';
import { TableData as Data } from '@/types';
import TableData from './list/TableData'
import Pagination from './list/Pagination'
import SearchBox from './list/SearchBox'
import { Button } from '@heroui/react';
import { PlusIcon } from './icon/PlusIcon';

type Props = {
    tableColumns: Array<{ name: string, uid: string }>
    data: Data[]
    tableCenterColumns: string[]
    searchParams: ReadonlyURLSearchParams
    totalPages: number | null
    totalItems: number | null
    createHref: string
    searchBoxProps: { placeholder: string, searchField: string }
    renderCell: (data: Data, columnKey: React.Key) => React.JSX.Element | undefined
    onInputChange: (key: string, value: any) => void
}

export default function ListLayout({ data, tableColumns, tableCenterColumns, totalPages, totalItems,
    searchParams, createHref, searchBoxProps, renderCell, onInputChange }: Props) {

    const router = useRouter()

    return (
        <div className='flex flex-col'>

            <div className='flex flex-row justify-between'>

                {/* Search, Filter, Sort */}
                <SearchBox
                    searchParams={searchParams}
                    onInputChange={onInputChange}
                    searchBoxProps={searchBoxProps}
                />

                {createHref && (
                    <Button
                        className='bg-black text-white'
                        variant="shadow"
                        endContent={<PlusIcon />}
                        onPress={() => router.push(createHref)}
                    >
                        Tạo mới
                    </Button>
                )}

            </div>


            {/* Table Data */}
            <TableData
                columns={tableColumns}
                centerColumns={tableCenterColumns}
                data={data}
                renderCell={renderCell}
            />

            {/* Pagination */}
            {totalPages && (
                <Pagination
                    searchParams={searchParams}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onInputChange={onInputChange}
                />
            )}

        </div>
    )
}
