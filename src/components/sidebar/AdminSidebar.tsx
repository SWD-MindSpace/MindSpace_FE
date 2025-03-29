import { Accordion, AccordionItem, AccordionItemProps } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

type Props = {
    itemClasses: AccordionItemProps,
    subLinkStyle: string,
    mainLinkStyle: string
}

export default function AdminSidebar({ itemClasses, subLinkStyle, mainLinkStyle }: Props) {
    return (
        <div>
            <div className={mainLinkStyle}>
                <Link href="/dashboard">Thống kê</Link>
            </div>
            <Accordion
                selectionMode="multiple"
                itemClasses={itemClasses}
                showDivider={false}
            >
                <AccordionItem key="1" aria-label="Manage Accounts" title="Quản lý tài khoản">
                    <div className='flex flex-col'>
                        <Link href='/' className={subLinkStyle}>Tạo tài khoản mới</Link>
                        <Link href='/' className={subLinkStyle}>Chuyên viên tâm lý</Link>
                        <Link href='/' className={subLinkStyle}>Quản lý trường học</Link>
                    </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Manage Articles" title="Quản lý bài đăng">
                    <div className='flex flex-col'>
                        <Link href='/' className={subLinkStyle}>Tạo bài đăng mới</Link>
                        <Link href='/' className={subLinkStyle}>Xem tất cả bài đăng</Link>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
