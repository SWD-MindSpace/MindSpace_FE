'use client'

import React, { useState, useEffect } from 'react'
import { getBlogDraftById, updateBlogDraft, deleteBlogDraftById } from '@/features/resources/blogs/APIs';
import { createManualForm } from '@/features/resources/blogs/APIs';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import { useDisclosure } from '@heroui/react';
import { toast } from 'react-toastify'
import NewSectionModal from '@/features/resources/blogs/components/NewSectionModal';
import CreateBlogForm from '@/features/resources/blogs/components/CreateBlogForm'
import ImageUpload from '@/features/resources/blogs/components/ImageUpload';
import { Specialization } from '@/features/dashboard/schemas/statisticsSchema';
import { getAllSpecializations } from '@/features/specializations/APIs';

// interface Blog Form

export default function BlogCreatePage() {
    // const [form, setForm] = useState<TestCreatedForm | null>(null)
    const [form, setForm] = useState<{ sections: any[] } | null>({ sections: [] })
    const [isAddingNewSection, setAddingNewSection] = useState<boolean>(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [specializationArr, setSpecializationArr] = useState<Specialization[]>([])


    const getInitialBlogDraftData = async () => {   // initial form can be a brand new OR incomplete form

        const blogDraft = localStorage.getItem('blogDraft')

        let blogDraftId = ''

        // in case of a whole new form, generate test draft id and set it to localStorage
        if (!blogDraft) {
            blogDraftId = `blogdrafts:${uuidv4()}`
            const blogDraft = {
                blogDraftId,
                newContentId: 0 // to track negative ids when adding new contentcontent
            }
            localStorage.setItem('blogDraft', JSON.stringify(blogDraft))
        } else {
            blogDraftId = JSON.parse(blogDraft).blogDraftId
        }

        const result = await getBlogDraftById(blogDraftId)
        if (result.status === 'success') {
            setForm(result.data)
        } else {
            toast.error(result?.error)
        }
    }


    const handleFormInputChange = useDebouncedCallback(async (key, value) => {
        await updateBlogDraft({
            ...form,
            [key]: value
        })
        await getInitialBlogDraftData()
    }, 0)


    const handleAddNewContentToForm = async (newContent: any) => {

        await updateBlogDraft({
            ...form,
            sections: [...(form?.sections || []), newContent]
        })

        await getInitialBlogDraftData()

        closeNewSectionModal()
    }


    const handleClickDeleteContent = async (contentId: any) => {
        const updatedSections = form?.sections?.filter((item) => item.id !== contentId) || [];

        await updateBlogDraft({
            ...form,
            sections: updatedSections
        })
        await getInitialBlogDraftData()
    }


    const handleClearAllFields = async () => {
        const blogDraftId = JSON.parse(localStorage.getItem('blogDraft') || '{}').blogDraftId
        await deleteBlogDraftById(blogDraftId)
        window.location.reload()
    }

    const openNewSectionModal = () => {
        setAddingNewSection(true)
    }

    const closeNewSectionModal = () => {
        setAddingNewSection(false)
    }


    const handleSubmitForm = async () => {

        await updateBlogDraft({
            ...form,
            schoolManagerId: JSON.parse(localStorage.getItem('userInfo') || '{}').userId
        })

        const blogDraftId = JSON.parse(localStorage.getItem('blogDraft') || '{}').blogDraftId

        console.log('handleSubmitForm: ', blogDraftId)

        const result = await createManualForm(blogDraftId)

        // upon successful submission
        if (result.status === 'success') {
            localStorage.removeItem('blogDraft')
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

    useEffect(() => {
        getInitialBlogDraftData()
    }, [])



    return (
        <div className='flex flex-row h-auto gap-x-5'>

            <div className='w-[60%]'>
                {/* TEST FORM */}
                {form &&
                    <CreateBlogForm
                        form={form}
                        specializationArr={specializationArr}
                        onFormInputChange={handleFormInputChange}
                        onClearAllFields={handleClearAllFields}
                        onOpenNewSectionModal={openNewSectionModal}
                        onSubmit={handleSubmitForm}
                        onClickDeleteContent={handleClickDeleteContent}
                    />
                }

                {isAddingNewSection &&
                    <NewSectionModal
                        isOpen={true}
                        onCloseNewSectionModal={closeNewSectionModal}
                        onOpenChange={onOpenChange}
                        onAddNewContentToForm={handleAddNewContentToForm}
                    />
                }

            </div>


            {form && (
                <div className='w-[40%]'>
                    <ImageUpload
                        form={form}
                        onFormInputChange={handleFormInputChange}
                    />
                </div>
            )}

        </div>
    )
}
