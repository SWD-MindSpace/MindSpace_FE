'use client'

import React from 'react'
import { usePathname } from "next/navigation";
import AdminSidebar from './sidebar/AdminSidebar';
import PsychologistSidebar from './sidebar/PsychologistSidebar';
import SchoolManagerSidebar from './sidebar/SchoolManagerSidebar';

export default function SideBar() {
    const pathname = usePathname()

    const isLoginPage = pathname === '/login'

    if (isLoginPage) return

    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-sm px-2 data-[open=true]:text-primary-blue",
        trigger: "px-2 py-0 data-[hover=true]:bg-gray-100 rounded-lg h-14 flex items-center data-[open=true]:bg-gray-100",
        indicator: "text-medium",
        content: "text-small px-3",
    };

    const mainLinkStyle = 'text-sm hover:bg-gray-100 rounded-lg h-14 flex items-center mx-2 px-4'

    const subLinkStyle = 'hover:bg-default-100 hover:text-primary-blue px-3 py-2 rounded-lg flex items-center'

    return (
        <div className='sticky top-0 flex flex-col'>
            <div className='flex items-center justify-center h-16 border-b-1 mx-5'>
                <p className='text-xl bg-primary-blue font-semibold text-white px-6 py-2 rounded-full'>MindSpace</p>
            </div>

            <div className='py-4'>
                <AdminSidebar itemClasses={itemClasses} subLinkStyle={subLinkStyle} mainLinkStyle={mainLinkStyle} />
                <PsychologistSidebar itemClasses={itemClasses} subLinkStyle={subLinkStyle} mainLinkStyle={mainLinkStyle} />
                <SchoolManagerSidebar itemClasses={itemClasses} subLinkStyle={subLinkStyle} mainLinkStyle={mainLinkStyle} />
            </div>
        </div>
    )
}
