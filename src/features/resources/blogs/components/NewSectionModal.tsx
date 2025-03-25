import React, { useState } from 'react'
import { Button, Input, Textarea } from '@heroui/react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { BsTrash3 } from "react-icons/bs";
import { PlusIcon } from '@/components/icon/PlusIcon';



type NewQuestion = {
    id: number
    content: string
    questionOptions: {
        id: number
        displayedText: string
    }[],
    numOfOptions: number
}

type QuestionOption = {
    id: number
    displayedText: string
}

export default function NewSectionModal({ isOpen, onOpenChange, onCloseNewSectionModal, onAddNewContentToForm }) {


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const heading = formData.get('heading')
        const content = formData.get('content')

        const blogDraft = JSON.parse(localStorage.getItem('blogDraft'))

        const newContentId = blogDraft.newContentId - 1

        const newContent = {
            id: newContentId,
            heading: heading,
            htmlContent: `<p>${content}</p>`
        }

        localStorage.setItem('blogDraft', JSON.stringify({ ...blogDraft, newContentId }))

        e.target.reset()

        onAddNewContentToForm(newContent)
    }


    return (
        <Modal
            backdrop="opaque"
            className='h-[70%]'
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            size='2xl'
        >
            <form onSubmit={handleSubmit}>
                <ModalContent>
                    {() => (
                        <>

                            <ModalHeader className="flex flex-col gap-1 uppercase bg-primary-blue text-white">thêm nội dung vào bài blog</ModalHeader>

                            <ModalBody className='overflow-y-auto'>

                                {/* HEADING */}
                                <div className='flex flex-row items-start justify-start gap-x-5 pt-5'>
                                    <label aria-label="heading" className='w-[20%] font-semibold' htmlFor="heading">Đề mục</label>
                                    <Textarea
                                        aria-label="heading"
                                        className='w-[80%]'
                                        radius='sm'
                                        size='lg'
                                        minRows={3}
                                        id="heading"
                                        name="heading"
                                        placeholder="Nhập đề mục"
                                        type='text'
                                        isRequired
                                        errorMessage={'Không được để trống đề mục'}
                                    />
                                </div>


                                {/* CONTENT */}
                                <div className='flex flex-row items-start justify-start gap-x-5 pt-2'>
                                    <label aria-label="content" className='w-[20%] font-semibold' htmlFor="content">Nội dung</label>
                                    <Textarea
                                        aria-label="content"
                                        className='w-[80%]'
                                        radius='sm'
                                        size='lg'
                                        minRows={6}
                                        id="content"
                                        name="content"
                                        placeholder="Nhập nội dung"
                                        type='text'
                                        isRequired
                                        errorMessage={'Không được để trống nội dung'}
                                    />
                                </div>


                            </ModalBody>


                            <ModalFooter className='border-t-1 bg-gray-100'>
                                <Button color="danger" onPress={onCloseNewSectionModal}>
                                    Hủy
                                </Button>
                                <Button color="primary" type='submit'>
                                    Thêm
                                </Button>
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    )
}
