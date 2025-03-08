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

export default function NewQuestionModal({ isOpen, onOpenChange, onCloseNewQuestionModal, onAddNewQuestionToForm }) {

    const [options, setOptions] = useState<QuestionOption[]>([{
        id: Date.now() * Math.random(),
        displayedText: ''
    }])


    const handleAddOptions = () => {
        setOptions(prev => ([...prev, {
            id: Date.now() * Math.random(),
            displayedText: ''
        }]))
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const content = formData.get('questionContent')

        const questionOptions = []

        for (const [keys, values] of formData.entries()) {

            let count = 0

            if (keys.startsWith('option')) {
                questionOptions.push({
                    id: count++,
                    displayedText: values
                })
            }
        }

        const testDraft = JSON.parse(localStorage.getItem('testDraft'))

        const newQuestionId = testDraft.newQuestionId - 1

        const newQuestion = {
            id: newQuestionId,
            content,
            questionOptions,
            isNewQuestion: true
        }

        localStorage.setItem('testDraft', JSON.stringify({ ...testDraft, newQuestionId }))

        e.target.reset()

        onAddNewQuestionToForm(newQuestion)
    }

    const handleDeleteOption = (id: string) => {
        const updatedOptions = options.filter((option) => id !== option.id)
        setOptions(updatedOptions)
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

                            <ModalHeader className="flex flex-col gap-1 uppercase bg-primary-blue text-white">thêm câu hỏi mới</ModalHeader>

                            <ModalBody className='overflow-y-auto'>

                                {/* QUESTION CONTENT */}
                                <div className='flex flex-row items-start justify-start gap-x-5 pt-5'>
                                    <label aria-label="questionContent" className='w-[20%] font-semibold' htmlFor="questionContent">Câu hỏi</label>
                                    <Textarea
                                        aria-label="questionContent"
                                        className='w-[80%]'
                                        radius='sm'
                                        size='lg'
                                        id="questionContent"
                                        name="questionContent"
                                        placeholder="Nhập nội dung câu hỏi"
                                        type='text'
                                        isRequired
                                        errorMessage={'Không được để trống nội dung câu hỏi'}
                                    />
                                </div>



                                {/* OPTIONS */}
                                {options.map((option, index) => (
                                    <div key={option.id} className='flex flex-row items-center justify-start gap-x-5'>
                                        <label aria-label="option" className='w-[20%] font-semibold' htmlFor="option">Lựa chọn {index + 1}</label>
                                        <div className='w-[80%] flex flex-row justify-center items-center gap-x-5'>
                                            <Input
                                                aria-label="option"
                                                className='w-[90%]'
                                                radius='sm'
                                                size='lg'
                                                id="option"
                                                name="option"
                                                placeholder="Nhập lựa chọn"
                                                type='text'
                                                isRequired
                                                errorMessage={'Không được để trống nội dung lựa chọn'}
                                                defaultValue={option.displayedText || ''}
                                            />

                                            {options.length === 1 ? (
                                                <BsTrash3
                                                    size={40}
                                                    color="gray"
                                                    className='bg-gray-100 rounded-full p-2'
                                                />
                                            ) : (
                                                <BsTrash3
                                                    size={40}
                                                    color="red"
                                                    className='bg-red-100 rounded-full p-2 hover:bg-red-300 self-start mt-1'
                                                    onClick={() => handleDeleteOption(option.id)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}



                                <div className='flex justify-end'>
                                    <Button
                                        className='w-[25%] mt-3 bg-green-300'
                                        variant="shadow"
                                        endContent={<PlusIcon />}
                                        onPress={handleAddOptions}
                                    >
                                        Thêm lựa chọn
                                    </Button>
                                </div>

                            </ModalBody>


                            <ModalFooter className='border-t-1 bg-gray-100'>
                                <Button color="danger" onPress={onCloseNewQuestionModal}>
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
