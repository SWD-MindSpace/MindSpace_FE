'use client'

import React from "react";
import { User } from "@heroui/user";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useRouter } from "next/navigation";


export default function Header() {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("userInfo")
        router.replace('/login')
    }

    return (
        <header className="sticky top-0 z-10 border-b-1 bg-white">
            <div className="flex flex-row justify-between items-center px-10 h-16 bg-white">
                <h1 className="text-md font-bold font-noto-sans text-primary-blue">TẠO BÀI TEST MỚI</h1>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <User
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            }}
                            name="Jane Doe"
                            description="Role"
                            className="hover:cursor-pointer"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem onPress={logout} key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    );
}
