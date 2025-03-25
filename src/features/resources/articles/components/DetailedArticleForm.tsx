import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";


export default function DetailedArticleForm({ form }) {

    return (
        <form className='w-full text-center'>
            <Card
                className='h-full -z-0'
                radius='sm'
            >

                <CardHeader className='text-white bg-primary-blue'>
                    <div className='w-full text-center text-md font-semibold uppercase'>chi tiết bài báo</div>
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
                            minRows={4}
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

                </CardBody>

                <Divider />

            </Card>

        </form>
    )
}
