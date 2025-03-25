import { Accordion, AccordionItem, AccordionItemProps } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

type Props = {
    itemClasses: AccordionItemProps,
    subLinkStyle: string,
    mainLinkStyle: string
}

export default function SchoolManagerSidebar({ itemClasses, subLinkStyle, mainLinkStyle }: Props) {
    return (
        <div>
            <Accordion
                selectionMode="multiple"
                itemClasses={itemClasses}
                showDivider={false}
            >
                <AccordionItem key="1" aria-label="Manage Accounts" title="Quản lý tài khoản">
                    <div className='flex flex-col'>
                        <Link href='/accounts/create' className={subLinkStyle}>Tạo tài khoản mới</Link>
                        <Link href='/accounts/students' className={subLinkStyle}>Học sinh</Link>
                    </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Manage Psychological Tests" title="Quản lý bài test">
                    <div className='flex flex-col'>
                        <Link href='/tests/create' className={subLinkStyle}>Tạo bài test mới</Link>
                        <Link href='/tests' className={subLinkStyle}>Xem tất cả bài test</Link>
                        {/* <Link href='/questions' className={subLinkStyle}>Xem tất cả câu hỏi</Link> */}
                    </div>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Manage Supporting Programs" title="Quản lý chương trình hỗ trợ">
                    <div className='flex flex-col'>
                        <Link href='/supporting-programs/create' className={subLinkStyle}>Tạo chương trình mới</Link>
                        <Link href='/supporting-programs' className={subLinkStyle}>Xem tất cả chương trình</Link>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
