'use client';

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from '@heroui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function TopNav() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar
            maxWidth="2xl"
            className="border-b border-gray-300 h-24 px-4 md:px-8"
        >
            <div className="flex justify-between items-center w-full">
                <NavbarBrand className="gap-2">
                    <FaBrain className="text-blue-600 w-6 h-6" />
                    <Link href="/" className="text-2xl font-bold">MindSpace</Link>
                </NavbarBrand>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <Button variant="light" onPress={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </Button>
                </div>
            </div>

            {/* Desktop Menu */}
            <NavbarContent className="hidden md:flex gap-5">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light">Tài khoản <FiChevronDown size={20} /></Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="profile">
                            <Link href="/profile">Hồ sơ</Link>
                        </DropdownItem>
                        <DropdownItem key="text-history">
                            <Link href="#">Lịch sử kiểm tra</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light">Cuộc hẹn <FiChevronDown size={20} /></Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="book-appointment">
                            <Link href="#">Đặt cuộc hẹn</Link>
                        </DropdownItem>
                        <DropdownItem key="future-appointments">
                            <Link href="#">Cuộc hẹn đang đợi</Link>
                        </DropdownItem>
                        <DropdownItem key="appointment-history">
                            <Link href="#">Lịch sử cuộc hẹn</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light">Chương trình hỗ trợ <FiChevronDown size={20} /></Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="all-programs">
                            <Link href="/supporting-programs">Các chương trình hỗ trợ</Link>
                        </DropdownItem>
                        <DropdownItem key="registered-program">
                            <Link href="#">Đăng kí chương trình</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem><Link href="/alltests">Bài kiểm tra</Link></NavbarItem>
                <NavbarItem><Link href="/resources">Tài nguyên</Link></NavbarItem>
                <NavbarItem><Link href="/psychologists">Chuyên gia tâm lí</Link></NavbarItem>
                <NavbarItem><Link href="/about-us">Về chúng tôi</Link></NavbarItem>
            </NavbarContent>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-24 left-0 w-full bg-white shadow-md z-50 flex flex-col p-4 md:hidden">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="light">Tài khoản <FiChevronDown size={20} /></Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="profile">
                                <Link href="#">Hồ sơ</Link>
                            </DropdownItem>
                            <DropdownItem key="text-history">
                                <Link href="#">Lịch sử kiểm tra</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="light">Cuộc hẹn <FiChevronDown size={20} /></Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="book-appointment">
                                <Link href="#">Đặt cuộc hẹn</Link>
                            </DropdownItem>
                            <DropdownItem key="future-appointments">
                                <Link href="#">Cuộc hẹn đang đợi</Link>
                            </DropdownItem>
                            <DropdownItem key="appointment-history">
                                <Link href="#">Lịch sử cuộc hẹn</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="light">Chương trình hỗ trợ <FiChevronDown size={20} /></Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="all-programs">
                                <Link href="/supporting-programs">Các chương trình hỗ trợ</Link>
                            </DropdownItem>
                            <DropdownItem key="registered-program">
                                <Link href="#">Đăng kí chương trình</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Link href="/alltests" className="py-2 text-center">Bài kiểm tra</Link>
                    <Link href="/resources" className="py-2 text-center">Tài nguyên</Link>
                    <Link href="#" className="py-2 text-center">Chuyên gia tâm lí</Link>
                    <Link href="/about-us" className="py-2 text-center">Về chúng tôi</Link>
                    {user ? (
                        <Button onPress={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md mt-4">
                            Đăng xuất
                        </Button>
                    ) : (
                        <>
                            <Button onPress={() => router.push('/login')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md mt-4">
                                Đăng nhập
                            </Button>
                            <Button onPress={() => router.push('/register')} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md mt-4">
                                Đăng kí
                            </Button>
                        </>
                    )}
                </div>
            )}

            <NavbarContent className="hidden md:flex font-bold pl-20 items-center gap-4">
                {user ? (
                    <Button onPress={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md">
                        Đăng xuất
                    </Button>
                ) : (
                    <>
                        <Button onPress={() => router.push('/login')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md">
                            Đăng nhập
                        </Button>
                        <Button onPress={() => router.push('/register')} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md">
                            Đăng kí
                        </Button>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}
