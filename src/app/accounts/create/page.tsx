'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createNewAccountByImport } from '@/features/accounts/common/APIs';
import { Select, SelectItem } from "@heroui/select";
import { ROLE_ID } from '@/features/accounts/common/constants';


export default function CreateAccountPage() {

    const roleMenuForAdmin = [
        { key: ROLE_ID.PSYCHOLOGIST, value: "psychologist", label: "Chuyên viên tâm lý" },
        { key: ROLE_ID.SCHOOL_MANAGER, value: "manager", label: "Quản lý trường" },
    ];

    const roleMenuForSchoolManager = [
        { key: ROLE_ID.STUDENT, value: "student", label: "Học sinh" },
    ]


    const [file, setFile] = useState(null); // Store the uploaded file


    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0]; // Get the uploaded file
        if (!uploadedFile) return;

        setFile(uploadedFile); // Save the file to state
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error('Không có file nào được chọn');
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', file); // Append the file to the FormData object

        const roleName = 'psychologist';

        // Call the API to upload the file
        const response = await createNewAccountByImport(roleName, formData);
        if (response.status === 'success') {
            toast.success('Tạo tài khoản thành công');
        } else {
            toast.error('Tạo tài khoản thất bại');
        }

        e.target.reset()
    };

    return (
        <>
            <Select className="max-w-xs" label="Loại tài khoản" placeholder="Chọn loại tài khoản">
                {roleMenuForAdmin.map((role) => (
                    <SelectItem key={role.key} value={role.value}>{role.label}</SelectItem>
                ))}
            </Select>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload} // Handle file selection
                />
                <button color="primary" type="submit">
                    Upload
                </button>
            </form>
        </>
    );
}