'use client'

import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArticleById } from '@/features/resources/articles/APIs';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { toast } from "react-toastify";
import DetailedArticleForm from '@/features/resources/articles/components/DetailedArticleForm';

export default function ArticleDetailPage() {

    const [article, setArticle] = useState(null)

    const params = useParams()

    const fetchArticleById = async () => {
        const result = await getArticleById(Number(params.id))

        if (result.status === 'success') {
            setArticle(result.data)
        } else {
            toast(result.error)
        }
    }

    useEffect(() => {
        fetchArticleById()
    }, [params])

    return (
        article && (
            <div className='flex flex-row h-auto gap-x-5'>

                {/* DETAILED FORM */}
                <div className='w-[60%]'>
                    <DetailedArticleForm
                        form={article}
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
                                src={article.thumbnailUrl || 'https://placehold.co/600x400'}
                                width="100%"
                            />
                        </CardBody>
                    </Card >
                </div>

            </div>
        )

    )
}
