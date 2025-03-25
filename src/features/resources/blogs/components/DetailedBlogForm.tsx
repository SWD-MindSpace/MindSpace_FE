import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";


export default function DetailedBlogForm({ form, specializationArr }) {

    const contentInFormStyles = {
        base: 'cursor-pointer',
        label: 'cursor-pointer font-semibold',
        input: 'cursor-pointer',
        inputWrapper: 'cursor-pointer hover:bg-gray-100',
        innerWrapper: 'cursor-pointer',
        mainWrapper: 'cursor-pointer',
    }

    return (
        <form className='w-full text-center'>
            <Card
                className='h-full -z-0'
                radius='sm'
            >

                <CardHeader className='text-white bg-primary-blue'>
                    <div className='w-full text-center text-md font-semibold uppercase'>chi tiết bài blog</div>
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
                            defaultValue={form?.title || ''}
                        />
                    </div>


                    {/* INTRODUCTION */}
                    <div className='flex flex-row items-start justify-start p-3 gap-x-5'>
                        <label aria-label="introduction" className='w-[20%] font-semibold' htmlFor="introduction">Giới thiệu</label>
                        <Textarea
                            isReadOnly
                            aria-label="introduction"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            type='text'
                            defaultValue={form?.introduction || ''}
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
                            defaultValue={form.specializationName}
                        />
                    </div>


                    {/* BLOG CONTENT */}
                    <div className='p-2 mt-5'>
                        <Card
                            radius='sm'
                            shadow='sm'
                            className='h-auto'
                        >
                            <CardHeader className='bg-secondary-blue text-white font-semibold uppercase flex flex-row justify-between'>
                                <div>
                                    Nội dung cho bài blog
                                </div>
                            </CardHeader>
                            <CardBody className='h-auto flex flex-col gap-y-6'>
                                {form.sections.length > 0 ? (
                                    form.sections.map((item, index) => (
                                        <div key={item.id} className='flex flex-row items-center gap-x-5'>
                                            <Card className=" flex-1 flex flex-col gap-3 p-3">
                                                <Input
                                                    isReadOnly
                                                    defaultValue={item.heading}
                                                    label={`Đề mục ${index + 1}`}
                                                    variant="bordered"
                                                    classNames={contentInFormStyles}
                                                />

                                                <div className="px-2">
                                                    {item.htmlContent.slice(3, -4)}
                                                </div>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div className='flex items-center justify-center h-16'>Chưa có nội dung nào</div>
                                )}


                            </CardBody>
                        </Card>
                    </div>

                </CardBody>

                <Divider />

            </Card>

        </form>
    )
}
