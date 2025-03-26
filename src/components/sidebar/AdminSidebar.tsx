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
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <Accordion
                selectionMode="multiple"
                itemClasses={itemClasses}
                showDivider={false}
            >
                <AccordionItem key="1" aria-label="Manage Accounts" title="Quản lý tài khoản">
                    <div className='flex flex-col'>
                        <Link href='/accounts/create' className={subLinkStyle}>Tạo tài khoản mới</Link>
                        <Link href='/accounts/psychologists' className={subLinkStyle}>Chuyên viên tâm lý</Link>
                        <Link href='/accounts/school-managers' className={subLinkStyle}>Nhân viên quản lý trường học</Link>
                        <Link href='/accounts/parents' className={subLinkStyle}>Phụ huynh</Link>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
