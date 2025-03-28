'use client'

import React, { useState, useEffect } from 'react'
import { createNewArticle } from '@/features/resources/articles/APIs';
import ImageUpload from '@/features/resources/blogs/components/ImageUpload';
import CreateArticleForm from '@/features/resources/articles/components/CreateArticleForm';
import { toast } from 'react-toastify'
import { Specialization } from '@/features/dashboard/schemas/statisticsSchema';
import { getAllSpecializations } from '@/features/specializations/APIs';

// interface Blog Form

export default function ArticleCreatePage() {
    // const [form, setForm] = useState<TestCreatedForm | null>(null)
    const [form, setForm] = useState({
        articleUrl: 'https://www.annualreviews.org/content/journals/10.1146/annurev.psych.55.090902.141927',
        thumbnailUrl: 'https://placehold.co/600x400',
        schoolManagerId: JSON.parse(localStorage.getItem('userInfo') || '{}').userId
    })
    const [thumbnailUrl, setThumbnailUrl] = useState('https://placehold.co/600x400')
    const [specializationArr, setSpecializationArr] = useState<Specialization[]>([])


    const handleFormInputChange = (key: string, value: any) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleThumbnailUrlChange = (key: string, url: string) => {
        setThumbnailUrl(url)
    }

    const handleClearAllFields = async () => {
        setForm({
            articleUrl: 'https://www.annualreviews.org/content/journals/10.1146/annurev.psych.55.090902.141927',
            thumbnailUrl: 'https://placehold.co/600x400',
            schoolManagerId: JSON.parse(localStorage.getItem('userInfo') || '{}').userId
        })
        setThumbnailUrl('https://placehold.co/600x400')
    }


    const handleSubmitForm = async () => {
        const newArticle = {
            ...form,
            thumbnailUrl: thumbnailUrl
        }

        const result = await createNewArticle(newArticle)

        // upon successful submission
        if (result.status === 'success') {
            window.location.replace(`detail/${result.data}`)
        } else {
            toast.error(result.error)
        }
    }


    const fetchSpecializations = async () => {
        const response = await getAllSpecializations();
        setSpecializationArr(response.data.data)
    }

    useEffect(() => {
        fetchSpecializations()
    }, [])


    return (
        <div className='flex flex-row h-screen gap-x-5'>

            <div className='w-[60%]'>
                {/* TEST FORM */}
                <CreateArticleForm
                    form={form}
                    specializationArr={specializationArr}
                    onClearAllFields={handleClearAllFields}
                    onSubmit={handleSubmitForm}
                    onFormInputChange={handleFormInputChange}
                />
            </div>


            <div className='w-[40%]'>
                <ImageUpload
                    form={form}
                    onFormInputChange={handleThumbnailUrlChange}
                />
            </div>


        </div>
    )
}
