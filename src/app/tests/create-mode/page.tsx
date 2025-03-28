'use client'
import React, { useState } from 'react';
import {
    Card,
    Button
} from '@heroui/react';
import { useRouter } from 'next/navigation';

const TestCreationSelection = () => {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const creationMethods = [
        {
            id: 'import',
            title: 'Nhập Test',
            description: 'Tải lên nội dung bài kiểm tra từ file Excel'
        },
        {
            id: 'create',
            title: 'Tạo Test Thủ Công',
            description: 'Tạo test mới bằng cách nhập dữ liệu thủ công'
        }
    ];

    const handleMethodSelect = (method: string | null) => {
        setSelectedMethod(method);
        if (method) {
            router.push(`/tests/${method}`);
        }

    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Tạo bài kiểm tra mới</h1>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <div className="text-center text-2xl font-bold mb-6">
                        Chọn Phương Thức Tạo Bài Kiểm Tra
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {creationMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`
                border-2 rounded-lg p-6 text-center cursor-pointer 
                transition-all duration-300 
                ${selectedMethod === method.id
                                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
              `}
                            >
                                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                                <p className="text-gray-600 mb-4">{method.description}</p>
                                <Button
                                    color={selectedMethod === method.id ? 'primary' : 'secondary'}
                                    className="w-full"
                                    onPress={() => handleMethodSelect(method.id)}
                                >
                                    Chọn
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>

    );
};

export default TestCreationSelection;