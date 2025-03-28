import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { formatDateForInput, formatPrice } from "@/lib/utils";

export default function DetailedPsychologistForm({ form }) {

    return (
        <form className='w-full text-center'>
            <Card
                className='h-full -z-0'
                radius='sm'
            >

                <CardHeader className='text-white bg-primary-blue'>
                    <div className='w-full text-center text-md font-semibold uppercase'>Thông tin cá nhân</div>
                </CardHeader>

                <CardBody>

                    {/* EMAIL */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="email" className='w-[20%] font-semibold' htmlFor="email">Email</label>
                        <Input
                            isReadOnly
                            aria-label="email"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="email"
                            type='text'
                            defaultValue={form?.email || ''}
                        />
                    </div>


                    {/* USER NAME */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="userName" className='w-[20%] font-semibold' htmlFor="userName">Tên tài khoản</label>
                        <Input
                            isReadOnly
                            aria-label="userName"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="userName"
                            type='text'
                            defaultValue={form?.userName || ''}
                        />
                    </div>


                    {/* FULL NAME */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="fullName" className='w-[20%] font-semibold' htmlFor="fullName">Tên</label>
                        <Input
                            isReadOnly
                            aria-label="fullName"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="fullName"
                            type='text'
                            defaultValue={form?.fullName || ''}
                        />
                    </div>


                    {/* BIO */}
                    <div className='flex flex-row items-start justify-start p-3 gap-x-5'>
                        <label aria-label="bio" className='w-[20%] font-semibold' htmlFor="bio">Giới thiệu</label>
                        <Textarea
                            isReadOnly
                            aria-label="bio"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            type='text'
                            defaultValue={form?.bio || `Đây là một nhà tâm lý học chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực tư vấn tâm lý.`}
                        />
                    </div>


                    {/* PHONE NUMBER */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="phoneNumber" className='w-[20%] font-semibold' htmlFor="phoneNumber">Số điện thoại</label>
                        <Input
                            isReadOnly
                            aria-label="phoneNumber"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="phoneNumber"
                            type='text'
                            defaultValue={form?.phoneNumber || 'Chưa có số điện thoại'}
                        />
                    </div>


                    {/* DATE OF BIRTH */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="dateOfBirth" className='w-[20%] font-semibold' htmlFor="dateOfBirth">Ngày sinh</label>
                        <Input
                            isReadOnly
                            aria-label="dateOfBirth"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="dateOfBirth"
                            type='text'
                            defaultValue={form?.dateOfBirth ? formatDateForInput(form.dateOfBirth) : ''}
                        />
                    </div>


                    {/* RATING */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="averageRating" className='w-[20%] font-semibold' htmlFor="averageRating">Đánh giá</label>
                        <Input
                            isReadOnly
                            aria-label="averageRating"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="averageRating"
                            type='text'
                            defaultValue={form?.averageRating || ''}
                        />
                    </div>


                    {/* PRICE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="sessionPrice" className='w-[20%] font-semibold' htmlFor="sessionPrice">Giá tư vấn</label>
                        <Input
                            isReadOnly
                            aria-label="sessionPrice"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="sessionPrice"
                            type='text'
                            defaultValue={formatPrice(form?.sessionPrice) || ''}
                        />
                    </div>


                    {/* COMISSION RATE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="comissionRate" className='w-[20%] font-semibold' htmlFor="comissionRate">Tiền hoa hồng</label>
                        <Input
                            isReadOnly
                            aria-label="comissionRate"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="comissionRate"
                            type='text'
                            defaultValue={form?.comissionRate || ''}
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
                            defaultValue={form.specialization}
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




                </CardBody>

                <Divider />

            </Card>

        </form>
    )
}
