'use client'

import React, { useState, useEffect } from 'react'
import { Button, useDisclosure } from '@heroui/react';
import { getAllQuestions, getQuestionById } from '@/features/questions/APIs';
import { toast } from 'react-toastify'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import CreateTestForm from '@/features/tests/components/CreateTestForm';
import QuestionBank from '@/features/tests/components/QuestionBank';
import QuestionModal from '@/features/tests/components/QuestionModal';
import { v4 as uuidv4 } from 'uuid';
import { deleteTestDraftById, getTestDraftById, updateTestDraft, createManualForm } from '@/features/tests/APIs';
import { useDebouncedCallback } from 'use-debounce';
import { TestCreateForm as TestCreatedForm } from '@/features/tests/schemas/testCreateFormSchema';
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";


type QuestionOption = {
    id: number
    displayedText: string
    questionId: number
}

type Question = {
    id: number
    content: string
    questionOptions: QuestionOption[]
}


const LIMIT = 10

export default function TestCreateForm() {
    const [questionBank, setQuestionBank] = useState<Question[] | null>(null)
    const [filteredQuestionBank, setFilteredQuestionBank] = useState<Question[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | null>(null)   // pagination for question bank
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [form, setForm] = useState<TestCreatedForm | null>(null)


    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();


    const fetchQuestionBank = async () => {

        const result = await getAllQuestions(Object.fromEntries(searchParams) as QuestionQueryParams)

        if (result.status === 'success') {
            const { data, count } = result.data
            if (count) {
                setQuestionBank(data)
                setTotalPages(Math.ceil(count / LIMIT))
            } else {
                setQuestionBank([])
                setTotalPages(null)
            }
        } else {
            setQuestionBank([])
            toast.error(result?.error)
        }
    }



    const filterQuestionBank = () => {
        if (form.questionItems.length > 0) {
            const questionItemsIds = form.questionItems.map((item) => item.id)
            const filterItems = questionBank?.filter((item) => {
                return !questionItemsIds.includes(item.id)
            })
            setFilteredQuestionBank(filterItems)
        }
        else {
            setFilteredQuestionBank(questionBank)
        }
    }



    // for optimization: useDebouncedCallback
    const handleInputChange = useDebouncedCallback((key, value) => {
        const params = new URLSearchParams(searchParams);

        params.set(key, value);
        if (params.has('PageIndex') && key !== 'PageIndex') {   // if search or filter, reset pageIndex to 1
            params.delete('PageIndex')
        }
        if (!value) {
            params.delete(key)
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300)



    const fetchSelectedQuestion = async (id) => {
        const result = await getQuestionById(id)

        if (result.status === 'success') {
            setSelectedQuestion(result.data)
        } else {
            setSelectedQuestion(null)
            toast.error(result?.error)
        }
    }


    const handleCloseQuestion = () => {
        setSelectedQuestion(null)
    }


    const handleAddQuestionToForm = async (questionId: number, content: string) => {
        await updateTestDraft({
            ...form,
            questionItems: [
                ...form.questionItems,
                {
                    id: questionId,
                    content
                }
            ]
        })
        await getInitialTestDraftData()
        filterQuestionBank()
    }


    const getInitialTestDraftData = async () => {   // initial form can be a brand new OR incomplete form

        let testDraftId = localStorage.getItem('testDraftId') || null

        // in case of a whole new form, generate test draft id and set it to localStorage
        if (!testDraftId) {
            testDraftId = `testdrafts:${uuidv4()}`
            localStorage.setItem('testDraftId', testDraftId)
        }

        const result = await getTestDraftById(testDraftId)
        if (result.status === 'success') {
            setForm(result.data)
        } else {
            toast.error(result?.error)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }


    const handleFormInputChange = useDebouncedCallback(async (key, value) => {
        await updateTestDraft({
            ...form,
            [key]: value
        })
        await getInitialTestDraftData()
    }, 0)

    const handleClearAllFields = async () => {
        const testDraftId = localStorage.getItem('testDraftId')
        await deleteTestDraftById(testDraftId)
        window.location.reload()
    }



    const handleClickDeleteQuestion = async (questionId) => {
        console.log(questionId)
        const newQuestionItems = form.questionItems.filter((item) => item.id !== questionId);

        console.log(newQuestionItems)

        await updateTestDraft({
            ...form,
            questionItems: newQuestionItems
        })
        await getInitialTestDraftData()
    }



    const handleSubmitForm = async () => {

        await updateTestDraft({
            ...form,
            questionCount: form.questionItems.length,
            authorId: JSON.parse(localStorage.getItem('userInfo')).userId
        })

        const testDraftId = localStorage.getItem('testDraftId')

        console.log('handleSubmitForm: ', testDraftId)

        await createManualForm(testDraftId)

        // upon successful submission
        localStorage.removeItem('testDraftId')
    }



    const specializationArr = [
        { id: '1', title: 'Lâm sàng' },
        { id: '2', title: 'Nhận thức' },
        { id: '3', title: 'Thần kinh' },
        { id: '4', title: 'Giáo dục' },
        { id: '5', title: 'Phát triển' },
        { id: '6', title: 'Pháp y' },
        { id: '7', title: 'Sức khỏe' },
        { id: '8', title: 'Thể thao' },
        { id: '9', title: 'Công nghiệp - Tổ chức' },
        { id: '10', title: 'Xã hội' },
        { id: '11', title: 'Tư vấn' },
        { id: '12', title: 'Thực nghiệm' },
        { id: '13', title: 'Tích cực' },
        { id: '14', title: 'Phục hồi' },
        { id: '15', title: 'Trường học' },
    ]

    const handleUploadQuestions = (e) => {
        console.log(e.target)
    }


    useEffect(() => {
        getInitialTestDraftData()
    }, [])


    useEffect(() => {
        fetchQuestionBank()
    }, [searchParams])


    // not optimized
    useEffect(() => {
        if (form && questionBank) {
            filterQuestionBank()
        }
    }, [form, questionBank])


    return (
        <div className='flex flex-row h-screen gap-x-5'>

            {/* TEST FORM */}
            {form &&
                <CreateTestForm
                    form={form}
                    specializationArr={specializationArr}
                    onSubmit={handleSubmitForm}
                    onFormInputChange={handleFormInputChange}
                    onClearAllFields={handleClearAllFields}
                    onClickQuestion={fetchSelectedQuestion}
                    onClickDeleteQuestion={handleClickDeleteQuestion}
                />
            }



            <div className='w-[40%] flex flex-col gap-y-10'>
                {/* QUESTION BANK */}
                {form && questionBank && filteredQuestionBank &&
                    <QuestionBank
                        data={filteredQuestionBank}
                        searchParams={searchParams}
                        totalPages={totalPages}
                        onInputChange={handleInputChange}
                        onClickQuestion={fetchSelectedQuestion}
                        onAddQuestionToForm={handleAddQuestionToForm}
                    />
                }
                {selectedQuestion &&
                    <QuestionModal
                        isOpen={true}
                        selectedQuestion={selectedQuestion}
                        onOpenChange={onOpenChange}
                        onCloseQuestion={handleCloseQuestion}
                    />
                }



                {/* ADD NEW QUESTIONS SECTION */}
                <div className='h-1/6 w-full flex flex-row gap-x-5'>
                    <Button className='bg-primary-blue text-white flex-1 h-12 w-full'>Tải câu hỏi lên form</Button>
                    <Button className='bg-primary-blue text-white flex-1 h-12'>Thêm câu hỏi mới vào form</Button>
                </div>
            </div>


        </div>
    )
}
