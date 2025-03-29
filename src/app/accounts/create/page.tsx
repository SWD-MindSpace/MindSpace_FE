'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createNewAccountByImport } from '@/features/accounts/common/APIs';
import { Select, SelectItem } from "@heroui/select";
import { ROLE_ID } from '@/features/accounts/common/constants';
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { redirect } from 'next/navigation'



export default function CreateAccountPage() {

    const userInfo = localStorage.getItem('userInfo');
    const role = userInfo ? JSON.parse(userInfo).role : null;

    if (role !== 'Admin' && role !== 'SchoolManager') {
        redirect('/login')
    }

    const roleMenuForAdmin = [
        { key: "psychologist", label: "Chuyên viên tâm lý" },
        { key: "manager", label: "Quản lý trường" },
    ];

    const roleMenuForSchoolManager = [
        { key: "student", label: "Học sinh" },
    ]

    const choosenRoleMenu = role === 'Admin' ? roleMenuForAdmin : roleMenuForSchoolManager;


    const [file, setFile] = useState<File | null>(null); // Store the uploaded file


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0]; // Get the uploaded file
        if (!uploadedFile) return;

        setFile(uploadedFile); // Save the file to state
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            toast.error('Không có file nào được chọn');
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', file); // Append the file to the FormData object

        // Get the role name from the form
        const form = e.target as HTMLFormElement;
        const roleName = (form.elements.namedItem('role') as HTMLSelectElement).value;

        // Call the API to upload the file
        const response = await createNewAccountByImport(roleName, formData);
        if (response.status === 'success') {
            toast.success('Tạo tài khoản thành công');
        } else {
            toast.error('Tạo tài khoản thất bại');
        }
        form.reset();
        (e.target as HTMLFormElement).reset();
    };

    return (
        <>
            <div>
                <form className="w-[50%]" onSubmit={handleSubmit}>
                    <Card
                        className='h-full -z-0'
                        radius='sm'
                    >

                        <CardHeader className='text-white bg-primary-blue'>
                            <div className='w-full text-center text-md font-semibold uppercase'>TÀI KHOẢN MỚI</div>
                        </CardHeader>

                        <CardBody>
                            <div className='flex flex-col gap-5 p-5'>

                                <div className='flex flex-row justify-start items-center gap-5'>
                                    <Select
                                        label="Loại tài khoản"
                                        placeholder="Chọn loại tài khoản"
                                        name="role"
                                    >
                                        {choosenRoleMenu.map((role) => (
                                            <SelectItem
                                                key={role.key}
                                                value={role.key}
                                            >
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </Select>


                                    <input
                                        type="file"
                                        accept=".xlsx, .xls"
                                        onChange={handleFileUpload} // Handle file selection
                                    />
                                </div>

                                <Button
                                    color="primary"
                                    type="submit"
                                    className='w-10'
                                >
                                    Lưu lại
                                </Button>
                            </div>
                        </CardBody>

                    </Card>



                </form>
            </div>

        </>
    );
}