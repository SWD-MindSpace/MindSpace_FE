'use client'

import React from "react";
import { User } from "@heroui/user";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useRouter } from "next/navigation";



export default function AdminHeader() {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        router.replace('/login')
    }

    return (
        <header>
            <div className="flex flex-row justify-between items-center shadow-md px-10 h-16 bg-white">
                <h1 className="text-xl font-bevnpro font-bold">Dashboard</h1>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <User
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            }}
                            name="Jane Doe"
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
