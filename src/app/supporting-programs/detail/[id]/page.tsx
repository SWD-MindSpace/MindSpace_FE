'use client'

import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSupportingProgramById } from '@/features/supporting-programs/APIs';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { toast } from "react-toastify";
import DetailedSPForm from '@/features/supporting-programs/components/DetailedSPForm';

export default function SPDetailPage() {

    const [supportingProgram, setSupportingProgram] = useState(null)

    const params = useParams()

    const fetchSupportingProgramById = async () => {
        const result = await getSupportingProgramById(Number(params.id))

        if (result.status === 'success') {
            setSupportingProgram(result.data)
        } else {
            toast(result.error)
        }
    }

    useEffect(() => {
        fetchSupportingProgramById()
    }, [params])

    return (
        supportingProgram && (
            <div className='flex flex-row h-auto gap-x-5'>

                {/* DETAILED FORM */}
                <div className='w-[60%]'>
                    <DetailedSPForm
                        form={supportingProgram}
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
                                src={supportingProgram.thumbnailUrl || 'https://placehold.co/600x400'}
                                width="100%"
                            />
                        </CardBody>
                    </Card >
                </div>

            </div>
        )

    )
}
