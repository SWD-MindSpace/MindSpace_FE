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

interface ListActionsProps {
    id?: number;
    onToggleStatus?: () => void;
    toggleStatusLabel?: {
        active: string;
        inactive: string;
    };
    viewDetailHref?: string;
    editHref?: string;
    onView?: () => void;
    onEdit?: () => void;
}

export default function ListActions({
    id,
    onToggleStatus,
    toggleStatusLabel = {
        active: 'Vô hiệu hóa',
        inactive: 'Kích hoạt'
    },
    viewDetailHref,
    editHref
}: ListActionsProps) {
    const pathname = usePathname()
    const router = useRouter()

    // Default view handler
    const handleView = () => {
        if (viewDetailHref) {
            window.open(viewDetailHref, '_blank')
        } else {
            window.open(`${pathname}/detail/${id}`, '_blank')
        }
    }

    // Default edit handler
    const handleEdit = () => {
        if (editHref) {
            router.push(editHref)
        } else {
            router.push(`${pathname}/edit/${id}`)
        }
    }

    // Default toggle status handler
    const handleToggleStatus = () => {
        if (onToggleStatus) {
            onToggleStatus()
        }
    }

    return (
        <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
                <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                    </Button>
                </DropdownTrigger>

                <DropdownMenu>
                    <DropdownItem
                        key="view"
                        color="primary"
                        onAction={handleView}
                    >
                        Xem
                    </DropdownItem>
                    {onToggleStatus ? (
                        <DropdownItem
                            key="disable"
                            color="primary"
                            onAction={handleToggleStatus}
                        >
                            Chỉnh sửa trạng thái
                        </DropdownItem>
                    ) : null}
                    <DropdownItem
                        key="edit"
                        color="primary"
                        onAction={handleEdit}
                    >
                        Chỉnh sửa
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}