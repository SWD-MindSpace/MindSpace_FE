'use client'

import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogById } from "@/features/resources/blogs/APIs";
import DetailedBlogForm from "@/features/resources/blogs/components/DetailedBlogForm";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { toast } from "react-toastify";

export default function BlogDetailPage() {

    const [blog, setBlog] = useState(null)

    const params = useParams()


    const fetchBlogById = async () => {
        const result = await getBlogById(Number(params.id))

        if (result.status === 'success') {
            setBlog(result.data)
        } else {
            toast(result.error)
        }
    }


    useEffect(() => {
        fetchBlogById()
    }, [params])

    return (
        blog && (
            <div className='flex flex-row h-auto gap-x-5'>

                {/* DETAILED FORM */}
                <div className='w-[60%]'>
                    <DetailedBlogForm
                        form={blog}
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
                                src={blog.thumbnailUrl || 'https://placehold.co/600x400'}
                                width="100%"
                            />
                        </CardBody>
                    </Card >
                </div>


            </div>
        )

    )
}
