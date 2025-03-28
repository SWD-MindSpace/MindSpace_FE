import { Accordion, AccordionItem, AccordionItemProps } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

type Props = {
    itemClasses: AccordionItemProps,
    subLinkStyle: string,
    mainLinkStyle: string
}

export default function PsychologistSidebar({ itemClasses, subLinkStyle, mainLinkStyle }: Props) {
    return (
        <div>
            <div className={mainLinkStyle}>
                <Link href="/schedules">Xếp lịch làm việc</Link>
            </div>
            {/* <Accordion
                selectionMode="multiple"
                itemClasses={itemClasses}
                showDivider={false}
            >
                <AccordionItem key="1" aria-label="Manage Appointments" title="Quản lý lịch hẹn">
                    <div className='flex flex-col'>
                        <Link href='/' className={subLinkStyle}>Lịch hẹn sắp tới</Link>
                        <Link href='/' className={subLinkStyle}>Lịch sử lịch hẹn</Link>
                    </div>
                </AccordionItem>
            </Accordion> */}
        </div>
    )
}
