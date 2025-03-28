import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { toast } from 'react-toastify';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

interface ImageUploadProps {
    form: {
        thumbnailUrl: string;
    };
    onFormInputChange: (field: string, value: string) => void;
}

export default function ImageUpload({ form, onFormInputChange }: ImageUploadProps) {
    const onSuccessfulUpload = (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            onFormInputChange('thumbnailUrl', result.info.secure_url);
        }
    }

    return (
        <Card
            className='-z-0'
            radius='sm'
        >
            <CardHeader className='text-white bg-primary-blue'>
                <div className='w-full text-center text-md font-semibold uppercase'>hình ảnh</div>
            </CardHeader>
            <CardBody>
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={form.thumbnailUrl || 'https://placehold.co/600x400'}
                    width="100%"
                />

                <CldUploadButton
                    onSuccess={onSuccessfulUpload}
                    uploadPreset={cloudPresetName}
                    className="bg-blue-500 py-2 px-3 rounded border mt-4 text-white
                hover:bg-blue-600 transition ease-in-out delay-200"
                    options={{
                        maxFileSize: MAX_FILE_SIZE,
                        resourceType: 'image',
                        sources: ['local'],
                        clientAllowedFormats: ['png', 'jpg', 'jpeg']
                    }}
                >
                    <span className="text-center text-md font-semibold uppercase">Tải hình</span>
                </CldUploadButton>

                <div className="mt-2 text-sm text-gray-500">
                    Chỉ chấp nhận file PNG, JPG. Kích thước tối đa: 100MB
                </div>
            </CardBody>
        </Card>
    );
}
