'use client'

import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getProfileById } from '@/features/accounts/common/APIs';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { toast } from "react-toastify";
import DetailedManagerForm from '@/features/accounts/components/DetailedManagerForm';

export default function ManagerDetailPage() {

    const [form, setForm] = useState(null)

    const params = useParams()

    const fetchManagerById = async () => {
        const result = await getProfileById(Number(params.id))

        if (result.status === 'success') {
            setForm(result.data)
        } else {
            toast(result.error)
        }
    }


    useEffect(() => {
        fetchManagerById()
    }, [params])


    return (
        form && (
            <div className='flex flex-row h-auto gap-x-5'>

                {/* DETAILED FORM */}
                <div className='w-[60%]'>
                    <DetailedManagerForm
                        form={form}
                    />
                </div>


                {/* IMAGE */}
                <div className='w-[40%]'>
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
                                src={form?.imageUrl || 'https://placehold.co/600x400'}
                                width="100%"
                            />
                        </CardBody>
                    </Card >
                </div>


            </div>
        )

    )
}
