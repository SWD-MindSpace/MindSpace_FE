// 'use client'

// import React, { useCallback, useEffect, useState } from 'react'
// import { TEST_LIST_COLUMNS, TEST_CENTER_COLUMNS } from './constants'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { useDebouncedCallback } from 'use-debounce';
// import { toast } from 'react-toastify'
// import { truncateText } from '@/lib/utils'
// import { TestTableData } from '@/features/tests/schemas/testTableDataSchema'
// import { getAllTests, TestQueryParams } from '@/features/tests/APIs'
// import ListActions from '@/components/list/ListActions'
// import ListLayout from '@/components/ListLayout'
// import { QuestionTableData } from '@/features/questions/schemas';

// const LIMIT = 12

// export default function QuestionListPage() {
//     const [data, setData] = useState<QuestionTableData[] | null>(null)
//     const [totalPages, setTotalPages] = useState<number | null>(null)
//     const [totalItems, setTotalItems] = useState<number | null>(null)

//     const router = useRouter()
//     const pathname = usePathname()
//     const searchParams = useSearchParams();


//     const fetchData = async () => {
//         const result = await getAllQuestions(Object.fromEntries(searchParams) as QuestionQueryParams)

//         if (result.status === 'success') {
//             const { data, count } = result.data
//             if (count) {
//                 setData(data)
//                 setTotalItems(count)
//                 setTotalPages(Math.ceil(count / LIMIT))
//             } else {
//                 setData([])
//                 setTotalItems(null)
//                 setTotalPages(null)
//             }
//         } else {
//             setData([])
//             toast.error(result?.error)
//         }
//     }


//     // for optimization: useDebouncedCallback
//     const handleInputChange = useDebouncedCallback((key, value) => {
//         const params = new URLSearchParams(searchParams);

//         params.set(key, value);
//         if (params.has('PageIndex') && key !== 'PageIndex') {   // if search or filter, reset pageIndex to 1
//             params.delete('PageIndex')
//         }
//         if (!value) {
//             params.delete(key)
//         }

//         router.replace(`${pathname}?${params.toString()}`);
//     }, 300)


//     const renderCell = useCallback((questionData: QuestionTableData, columnKey: React.Key) => {
//         const cellValue = questionData[columnKey as keyof QuestionTableData]

//         switch (columnKey) {
//             case "id":
//                 return <div>{cellValue as number}</div>
//             case "content":
//                 return <div>{cellValue as string}</div>
//             case "actions":
//                 return <ListActions />
//         }
//     }, [])

//     const searchBoxProps = {
//         placeholder: 'Tìm kiếm tiêu đề',
//         searchField: 'SearchQuestionContent'
//     }

//     useEffect(() => {
//         fetchData()
//     }, [searchParams])



//     return (
//         <>
//             {data &&
//                 <ListLayout
//                     data={data}
//                     tableColumns={TEST_LIST_COLUMNS}
//                     tableCenterColumns={TEST_CENTER_COLUMNS}
//                     searchParams={searchParams}
//                     totalPages={totalPages as number | null}
//                     createHref='/questions/create'
//                     searchBoxProps={searchBoxProps}
//                     totalItems={totalItems}
//                     renderCell={renderCell}
//                     onInputChange={handleInputChange}
//                 />
//             }
//         </>
//     )
// }
