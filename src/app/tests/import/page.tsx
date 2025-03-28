'use client'
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "@heroui/card";
import {
    Button,
    Input,
    Select,
    SelectItem
} from '@heroui/react';
import { Textarea } from "@heroui/input";
import { getAllSpecializations } from '@/features/specializations/APIs';
import { Specialization } from '@/features/dashboard/schemas/statisticsSchema';
import toast from 'react-hot-toast';
import router from 'next/router';
import { importTest } from '@/features/tests/APIs';
import { useRouter } from 'next/navigation';


interface TestImportForm {
    title: string;
    testCode: string;
    targetUser: number;
    description: string;
    price: number;
    authorId?: number;
    schoolId?: number;
    testCategoryId: number;
    specializationId: number;
    testFile: File | null;
}

export default function TestImportPage() {
    const [specializationArr, setSpecializationArr] = useState<Specialization[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [form, setForm] = useState<TestImportForm>({
        title: '',
        testCode: '',
        targetUser: 0,
        description: '',
        price: 0,
        testCategoryId: 0,
        specializationId: 0,
        testFile: null
    });


    useEffect(() => {
        // Fetch specializations
        const fetchSpecializations = async () => {
            try {
                const response = await getAllSpecializations();
                setSpecializationArr(response.data.data);
            } catch (error) {
                console.error('Failed to fetch specializations', error);
            }
        };

        // Set user info from localStorage
        const currentUser = localStorage.getItem('userInfo');
        if (currentUser) {
            const userInfo = JSON.parse(currentUser);
            console.log("userId: ", userInfo.userId)
            setForm(prev => ({
                ...prev,
                authorId: userInfo.userId,
                schoolId: userInfo.schoolId
            }));
        }

        fetchSpecializations();
    }, []);


    const handleInputChange = (field: string, value: string | number) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setForm(prev => ({
                ...prev,
                testFile: file
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate form
        if (!form.testFile) {
            toast.error("Vui lòng chọn tệp Excel");
            return;
        }

        // Create FormData for multipart/form-data upload
        const formData = new FormData();

        // Append all form fields
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value as string | Blob);
            }
        });

        setIsSubmitting(true);

        try {
            const response = await importTest(formData);

            // Extract testId from Location header
            const locationHeader = response.headers?.['location'] ?? null;
            const testId = locationHeader ? locationHeader.split('/').pop() : null;

            toast.success("Bài test đã được nhập thành công");

            // Navigate to test details page
            if (testId) {
                router.push(`/test/details/${testId}`);
            } else {
                router.push('/test');
            }
        } catch (error) {
            console.error('Import error', error);
            toast.error("Xảy ra lỗi khi nhập bài test");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <form onSubmit={handleSubmit} className='w-full max-w-2xl mx-auto'>
                <Card className='h-full' radius='sm'>
                    <CardHeader className='text-white bg-primary-blue'>
                        <div className='w-full text-center text-md font-semibold uppercase'>
                            NHẬP LIỆU BÀI TEST TỪ EXCEL
                        </div>
                    </CardHeader>

                    <CardBody className='space-y-4'>
                        {/* Title */}
                        <div className='flex flex-row items-center gap-x-5'>
                            <label className='w-[20%] font-semibold'>Tiêu đề</label>
                            <Input
                                className='w-[80%]'
                                placeholder="Nhập tiêu đề bài test"
                                value={form.title}
                                onValueChange={(value) => handleInputChange('title', value)}
                                isRequired
                            />
                        </div>

                        {/* Test Code */}
                        <div className='flex flex-row items-center gap-x-5'>
                            <label className='w-[20%] font-semibold'>Mã bài test</label>
                            <Input
                                className='w-[80%]'
                                placeholder="Nhập mã bài test"
                                value={form.testCode}
                                onValueChange={(value) => handleInputChange('testCode', value)}
                                isRequired
                            />
                        </div>

                        {/* Description */}
                        <div className='flex flex-row items-start gap-x-5'>
                            <label className='w-[20%] font-semibold'>Mô tả</label>
                            <Textarea
                                className='w-[80%]'
                                placeholder="Nhập mô tả bài test"
                                value={form.description}
                                onValueChange={(value) => handleInputChange('description', value)}
                                isRequired
                            />
                        </div>

                        {/* Target User */}
                        <div className='flex flex-row items-center gap-x-5'>
                            <label className='w-[20%] font-semibold'>Đối tượng</label>
                            <Select
                                className='w-[80%]'
                                placeholder="Chọn đối tượng"
                                selectedKeys={form.targetUser ? [form.targetUser.toString()] : []}
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0];
                                    handleInputChange('targetUser', Number(selected));
                                }}
                                isRequired
                            >
                                <SelectItem key="1" value="1">Học sinh</SelectItem>
                                <SelectItem key="2" value="2">Phụ huynh</SelectItem>
                                <SelectItem key="0" value="0">Tất cả</SelectItem>
                            </Select>
                        </div>

                        {/* Test Category */}
                        <div className='flex flex-row items-center gap-x-5'>
                            <label className='w-[20%] font-semibold'>Loại bài test</label>
                            <Select
                                className='w-[80%]'
                                placeholder="Chọn loại bài test"
                                selectedKeys={form.testCategoryId ? [form.testCategoryId.toString()] : []}
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0];
                                    handleInputChange('testCategoryId', Number(selected));
                                }}
                                isRequired
                            >
                                <SelectItem key="1" value="1">Tâm lý</SelectItem>
                                <SelectItem key="2" value="2">Giáo dục con cái</SelectItem>
                                <SelectItem key="3" value="3">Định kỳ</SelectItem>
                            </Select>
                        </div>

                        {/* Specialization */}
                        <div className='flex flex-row items-center gap-x-5'>
                            <label className='w-[20%] font-semibold'>Chuyên môn</label>
                            <Select
                                className='w-[80%]'
                                placeholder="Chọn chuyên môn"
                                selectedKeys={form.specializationId ? [form.specializationId.toString()] : []}
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0];
                                    handleInputChange('specializationId', Number(selected));
                                }}
                                isRequired
                            >
                                {specializationArr.map(specialization => (
                                    <SelectItem
                                        key={specialization.id}
                                        value={specialization.id.toString()}
                                    >
                                        {specialization.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Price */}
                        <div className='flex flex-row items-center gap-x-5'>
                            <label className='w-[20%] font-semibold'>Giá</label>
                            <Input
                                className='w-[80%]'
                                placeholder="Nhập giá"
                                type="number"
                                value={form.price.toString()}
                                onValueChange={(value) => handleInputChange('price', Number(value))}
                                isRequired
                            />
                        </div>

                        {/* File Upload */}
                        <div className='flex flex-row items-center gap-x-5'>
                            <label className='w-[20%] font-semibold'>Tệp Excel</label>
                            <div className='w-[80%] flex items-center gap-x-3'>
                                <Input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    className='w-full'
                                    onChange={handleFileUpload}
                                    isRequired
                                />
                                {form.testFile && (
                                    <span className='text-sm text-gray-600'>
                                        {form.testFile.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter className='flex justify-end gap-3 bg-gray-100'>
                        <Button
                            type="submit"
                            className='bg-primary-blue text-white uppercase font-semibold w-32'
                        >
                            Nhập
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}