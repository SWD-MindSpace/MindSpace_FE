'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTestById } from "@/features/tests/APIs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { useDisclosure } from '@heroui/react';
import { toast } from "react-toastify";
import DetailedQuestionModal from "@/features/tests/components/DetailedQuestionModal";
import { getQuestionById } from "@/features/questions/APIs";
import { Question } from "../../create/page";
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import TestResponseStatistics from "@/features/tests/components/TestResponsesStatistics";


export default function TestDetailPage() {

    const [test, setTest] = useState(null)
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setIsLoading] = useState(false)

    const params = useParams()

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

    const categoryArr = [
        { id: '1', title: 'Tâm lý' },
        { id: '2', title: 'Giáo dục con cái' },
        { id: '3', title: 'Định kỳ' },
    ]

    const questionInFormStyles = {
        base: 'cursor-pointer',
        label: 'cursor-pointer font-semibold',
        input: 'cursor-pointer',
        inputWrapper: 'cursor-pointer hover:bg-gray-100',
        innerWrapper: 'cursor-pointer',
        mainWrapper: 'cursor-pointer',
    }


    const fetchTestById = async (id: number) => {
        setIsLoading(false)
        const result = await getTestById(Number(params.id))

        if (result.status === 'success') {
            setTest(result.data)
            setIsLoading(true)
        } else {
            toast(result.error)
            setIsLoading(true)
        }
    }


const fetchSelectedQuestion = async (id: number) => {

        // existing questions in db
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


    useEffect(() => {
        fetchTestById(Number(params.id))
    }, [params])

    return (
        <>
            {loading && (
                <div className='flex flex-col items-center w-full space-y-4 p-4'>
                    <Card
                        className='h-full -z-0 w-[70%]'
                        radius='sm'
                    >

                        <CardHeader className='text-white bg-primary-blue'>
                            <div className='w-full text-center text-md font-semibold uppercase'>chi tiết bài test</div>
                        </CardHeader>

                        <CardBody>

                            {/* TITLE */}
                            <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                                <label aria-label="title" className='w-[20%] font-semibold' htmlFor="title">Tiêu đề</label>
                                <Input
                                    isReadOnly
                                    aria-label="title"
                                    className='w-[80%]'
                                    radius='sm'
                                    size='lg'
                                    id="title"
                                    type='text'
                                    defaultValue={test?.title}
                                />
                            </div>


                            {/* DESCRIPTION */}
                            <div className='flex flex-row items-start justify-start p-3 gap-x-5'>
                                <label aria-label="description" className='w-[20%] font-semibold' htmlFor="description">Mô tả</label>
                                <Textarea
                                    isReadOnly
                                    aria-label="description"
                                    className='w-[80%]'
                                    radius='sm'
                                    size='lg'
                                    id="description"
                                    type='text'
                                    defaultValue={test?.description}
                                />
                            </div>


                            {/* TEST CODE */}
                            <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                                <label aria-label="testCode" className='w-[20%] font-semibold' htmlFor="testCode">Mã bài test</label>
                                <Input
                                    isReadOnly
                                    aria-label="testCode"
                                    className='w-[80%]'
                                    radius='sm'
                                    size='lg'
                                    id="testCode"
                                    type='text'
                                    defaultValue={test?.testCode}
                                />
                            </div>


                            {/* CATEGORY */}
                            <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                                <label aria-label="category" className='w-[20%] font-semibold' htmlFor="category">Chuyên môn</label>
                                <Input
                                    isReadOnly
                                    aria-label="category"
                                    className='w-[80%]'
                                    radius='sm'
                                    size='lg'
                                    id="category"
                                    type='text'
                                    defaultValue={categoryArr.find((item) => Number(item.id) === test.testCategory.id)?.title}
                                />
                            </div>


                            {/* SPECIALIZATION */}
                            <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                                <label aria-label="specialization" className='w-[20%] font-semibold' htmlFor="specialization">Chuyên môn</label>
                                <Input
                                    isReadOnly
                                    aria-label="specialization"
                                    className='w-[80%]'
                                    radius='sm'
                                    size='lg'
                                    id="specialization"
                                    type='text'
                                    defaultValue={specializationArr.find((item) => Number(item.id) === test.specialization.id)?.title}
                                />
                            </div>


                            {/* TARGET USER */}
                            <div className='flex flex-row items-start justify-start p-3 gap-x-5'>
                                <label aria-label="targetUser" className='w-[20%] font-semibold' htmlFor="targetUser">Đối tượng</label>
                                <Input
                                    isReadOnly
                                    aria-label="targetUser"
                                    className='w-[80%]'
                                    radius='sm'
                                    size='lg'
                                    id="targetUser"
                                    name="targetUser"
                                    type='text'
                                    defaultValue={test?.targetUser === 'Student' ? 'Học sinh' :
                                        test?.targetUser === 'Parent' ? 'Phụ huynh' : 'Tất cả (học sinh và phụ huynh)'
                                    }
                                />
                            </div>


                            {/* PRICE */}
                            <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                                <label aria-label="price" className='w-[20%] font-semibold' htmlFor="price">Giá</label>
                                <Input
                                    isReadOnly
                                    aria-label="price"
                                    className='w-[80%]'
                                    radius='sm'
                                    size='lg'
                                    id="price"
                                    type='text'
                                    errorMessage={'Bắt buộc nhập giá'}
                                    defaultValue={test?.price}
                                />
                            </div>


                            {/* QUESTIONS IN A FORM */}
                            <div className='p-2 mt-5'>
                                <Card
                                    radius='sm'
                                    shadow='sm'
                                    className='h-auto'
                                >
                                    <CardHeader className='bg-secondary-blue text-white font-semibold uppercase'>
                                        Câu hỏi cho bài test
                                    </CardHeader>
                                    <CardBody className='h-auto flex flex-col gap-y-3'>
                                        {test?.questions.map((item, index) => (
                                            <div key={item.id} className='flex flex-row items-center gap-x-5'>
                                                <Input
                                                    isReadOnly
                                                    defaultValue={item.content}
                                                    label={`Question ${index + 1}`}
                                                    variant="bordered"
                                                    size="lg"
                                                    classNames={questionInFormStyles}
                                                    onClick={() => fetchSelectedQuestion(item.id)}
                                                />
                                            </div>
                                        ))}
                                    </CardBody>
                                </Card>
                            </div>

                        </CardBody>
                    </Card>
                    <TestResponseStatistics />
                </div>
            )}


            {selectedQuestion &&
                <DetailedQuestionModal
                    selectedQuestion={selectedQuestion}
                    isOpen={true}
                    onOpenChange={onOpenChange}
                    onCloseQuestion={handleCloseQuestion}
                />
            }

        </>
    )
}
