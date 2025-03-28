import React from 'react'
import {
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Button
} from '@heroui/react'
import VerticalDotsIcon from '../icon/VerticalDotsIcon'
import { usePathname, useRouter } from 'next/navigation'


export default function ListActions() {

    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="relative flex justify-end items-center gap-2">
            <Dropdown>

                <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                    </Button>
                </DropdownTrigger>

                <DropdownMenu>
                    <DropdownItem key="view" color="primary" onAction={() => window.open(`${pathname}/detail/id`, '_blank')}>
                        Xem
                    </DropdownItem>
                    <DropdownItem key="edit" color="primary" onAction={() => router.push(`${pathname}/edit/id`)}>Chỉnh sửa</DropdownItem>
                </DropdownMenu>

            </Dropdown>
        </div>
    )
}
