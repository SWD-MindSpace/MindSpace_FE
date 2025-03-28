import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export default function ImageUpload({ form, onFormInputChange }) {

    const onSuccessfulUpload = (result: CloudinaryUploadWidgetResults) => {
        onFormInputChange('thumbnailUrl', result.info.secure_url)
    }

    const handleClickButton = (e) => {
        console.log('button clicked')
        console.log(e)
        return
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
                    onUploadAddedAction={handleClickButton}
                    onSuccess={onSuccessfulUpload}
                    uploadPreset={cloudPresetName}
                    className="bg-blue-500 py-2 px-3 rounded border mt-4 text-white
                hover:bg-blue-600 transition ease-in-out delay-200"
                >
                    <span className="text-center text-md font-semibold uppercase">Tải hình</span>
                </CldUploadButton>


            </CardBody>
        </Card >
    );
}
