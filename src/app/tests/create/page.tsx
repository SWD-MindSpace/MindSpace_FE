'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { getAllQuestions, getQuestionById } from '@/features/questions/APIs';
import { deleteTestDraftById, getTestDraftById, updateTestDraft, createManualForm } from '@/features/tests/APIs';
import { useDebouncedCallback } from 'use-debounce';
import { v4 as uuidv4 } from 'uuid';
import { Button, useDisclosure } from '@heroui/react';
import { toast } from 'react-toastify'
import NewQuestionModal from '@/features/tests/components/NewQuestionModal';
import DetailedQuestionModal from '@/features/tests/components/DetailedQuestionModal';
import QuestionBank from '@/features/tests/components/QuestionBank';
import CreateTestForm from '@/features/tests/components/CreateTestForm';
import { TestCreateForm as TestCreatedForm } from '@/features/tests/schemas/testCreateFormSchema';


type QuestionOption = {
    id: number
    displayedText: string
    questionId: number
}

export type Question = {
    id: number
    content: string
    questionOptions: QuestionOption[]
}


const LIMIT = 10

export default function TestCreatePage() {
    const [questionBank, setQuestionBank] = useState<Question[] | null>(null)
    const [filteredQuestionBank, setFilteredQuestionBank] = useState<Question[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | null>(null)   // pagination for question bank
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
    const [isAddingNewQuestion, setAddingNewQuestion] = useState<boolean>(false)
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



    const fetchSelectedQuestion = async (isNewQuestion, id) => {

        if (isNewQuestion) {
            const foundQuestion = form?.questionItems.find((question) => question.id === id)
            setSelectedQuestion(foundQuestion)

        } else { // existing questions in db
            const result = await getQuestionById(id)

            if (result.status === 'success') {
                setSelectedQuestion(result.data)
            } else {
                setSelectedQuestion(null)
                toast.error(result?.error)
            }
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
                    content,
                    isNewQuestion: false
                }
            ]
        })
        await getInitialTestDraftData()
        filterQuestionBank()
    }


    const getInitialTestDraftData = async () => {   // initial form can be a brand new OR incomplete form

        const testDraft = localStorage.getItem('testDraft')

        let testDraftId = ''

        // in case of a whole new form, generate test draft id and set it to localStorage
        if (!testDraft) {
            testDraftId = `testdrafts:${uuidv4()}`
            const testDraft = {
                testDraftId,
                newQuestionId: 0 // to track negative ids when adding new questions
            }
            localStorage.setItem('testDraft', JSON.stringify(testDraft))
        } else {
            testDraftId = JSON.parse(testDraft).testDraftId
        }

        const result = await getTestDraftById(testDraftId)
        if (result.status === 'success') {
            setForm(result.data)
        } else {
            toast.error(result?.error)
        }
    }


    const handleFormInputChange = useDebouncedCallback(async (key, value) => {
        await updateTestDraft({
            ...form,
            [key]: value
        })
        await getInitialTestDraftData()
    }, 0)


    const handleClearAllFields = async () => {
        const testDraftId = JSON.parse(localStorage.getItem('testDraft')).testDraftId
        await deleteTestDraftById(testDraftId)
        window.location.reload()
    }



    const handleClickDeleteQuestion = async (questionId) => {
        const newQuestionItems = form.questionItems.filter((item) => item.id !== questionId);

        await updateTestDraft({
            ...form,
            questionItems: newQuestionItems
        })
        await getInitialTestDraftData()
    }


    const handleAddNewQuestionToForm = async (newQuestion) => {

        await updateTestDraft({
            ...form,
            questionItems: [...form.questionItems, newQuestion]
        })

        await getInitialTestDraftData()

        closeNewQuestionModal()
    }



    const handleSubmitForm = async () => {

        await updateTestDraft({
            ...form,
            questionCount: form.questionItems.length,
            authorId: JSON.parse(localStorage.getItem('userInfo')).userId
        })

        const testDraftId = JSON.parse(localStorage.getItem('testDraft')).testDraftId

        console.log('handleSubmitForm: ', testDraftId)

        const result = await createManualForm(testDraftId)

        // upon successful submission
        if (result.status === 'success') {
            localStorage.removeItem('testDraft')
            window.location.replace(`detail/${result.data}`)
        } else {
            toast.error(result.error)
        }
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

    const openNewQuestionModal = () => {
        setAddingNewQuestion(true)
    }

    const closeNewQuestionModal = () => {
        setAddingNewQuestion(false)
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
                    <DetailedQuestionModal
                        selectedQuestion={selectedQuestion}
                        isOpen={true}
                        onOpenChange={onOpenChange}
                        onCloseQuestion={handleCloseQuestion}
                        onAddQuestionToForm={handleAddQuestionToForm}
                    />
                }



                {/* ADD NEW QUESTIONS SECTION */}
                {form && (
                    <div className='h-1/6 w-full flex flex-row gap-x-5'>
                        {/* <Button className='bg-primary-blue text-white flex-1 h-12 w-full'>Tải câu hỏi lên form</Button> */}
                        <Button
                            className='bg-primary-blue text-white flex-1 h-12'
                            onPress={openNewQuestionModal}
                        >
                            Thêm câu hỏi mới vào form
                        </Button>
                    </div>
                )
                }


                {isAddingNewQuestion &&
                    <NewQuestionModal
                        isOpen={true}
                        onCloseNewQuestionModal={closeNewQuestionModal}
                        onOpenChange={onOpenChange}
                        onAddNewQuestionToForm={handleAddNewQuestionToForm}
                    />
                }
            </div>


        </div>
    )
}
