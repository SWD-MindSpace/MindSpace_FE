import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { formatDateForInput } from "@/lib/utils";

export default function DetailedStudentForm({ form }) {

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


                </CardBody>

                <Divider />

            </Card>

        </form>
    )
}
