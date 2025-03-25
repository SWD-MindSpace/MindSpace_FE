import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from '@heroui/react';
import { Input } from "@heroui/input";

export default function DetailedSPForm({ form }) {

    const pdfInputStyle = {
        base: "cursor-pointer",
        mainWrapper: "cursor-pointer",
        inputWrapper: "cursor-pointer",
        innerWrapper: "cursor-pointer",
        input: "cursor-pointer",
    }

    return (
        <form className='w-full text-center'>
            <Card
                className='h-full -z-0'
                radius='sm'
            >

                <CardHeader className='text-white bg-primary-blue'>
                    <div className='w-full text-center text-md font-semibold uppercase'>chương trình hỗ trợ mới</div>
                </CardHeader>

                <CardBody>

                    {/* TITLE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="title" className='w-[25%] font-semibold' htmlFor="title">Tiêu đề</label>
                        <Input
                            isReadOnly
                            aria-label="title"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="title"
                            type='text'
                            defaultValue={form.title}
                        />
                    </div>

                    {/* PSYCHOLOGIST */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="psychologist" className='w-[25%] font-semibold' htmlFor="psychologist">Chuyên viên tâm lý</label>
                        <Input
                            isReadOnly
                            aria-label="psychologist"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="psychologist"
                            type='text'
                            defaultValue={form.psychologistName}
                        />
                    </div>


                    {/* MAX QUANTITY */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="maxQuantity" className='w-[25%] font-semibold' htmlFor="maxQuantity">Số lượng đăng ký</label>
                        <Input
                            isReadOnly
                            aria-label="maxQuantity"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="maxQuantity"
                            type='text'
                            defaultValue={form.maxQuantity}
                        />
                    </div>


                    {/* CITY/PROVINCE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="city" className='w-[25%] font-semibold' htmlFor="city">Tỉnh/Thành phố</label>
                        <Input
                            isReadOnly
                            aria-label="city"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="city"
                            type='text'
                            defaultValue={form.city}
                        />
                    </div>


                    {/* DISTRICT */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="district" className='w-[25%] font-semibold' htmlFor="district">Quận/Huyện</label>
                        <Input
                            isReadOnly
                            aria-label="district"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="district"
                            type='text'
                            defaultValue={form.province}
                        />
                    </div>


                    {/* WARD */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="ward" className='w-[25%] font-semibold' htmlFor="ward">Phường/Xã</label>
                        <Input
                            isReadOnly
                            aria-label="ward"
                            className='w-[80%]'
                            radius='sm' 
                            size='lg'
                            id="ward"
                            type='text'
                            defaultValue={form.ward}
                        />
                    </div>


                    {/* STREET */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="street" className='w-[25%] font-semibold' htmlFor="street">Địa chỉ</label>
                        <Input
                            isReadOnly
                            aria-label="street"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="street"
                            type='text'
                            defaultValue={form.street}
                        />
                    </div>


                    {/* POSTAL CODE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="postalCode" className='w-[25%] font-semibold' htmlFor="postalCode">Mã bưu điện</label>
                        <Input
                            isReadOnly
                            aria-label="postalCode"
                            id="postalCode"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            type='text'
                            defaultValue={form.postalCode}
                        />
                    </div>


                    {/* START DATE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="startDateAt" className='w-[25%] font-semibold' htmlFor="startDateAt">Ngày bắt đầu</label>
                        <Input
                            isReadOnly
                            aria-label="startDateAt"
                            id="startDateAt"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            type='text'
                            defaultValue={form.startDateAt}
                        />
                    </div>


                    {/* PDF */}
                    <div className='flex flex-row items-center justify-start px-3 p-3 gap-x-5'>
                        <label aria-label="pdffileUrl" className='w-[25%] font-semibold' htmlFor="pdffileUrl">Tài liệu chi tiết</label>
                        <Input
                            isReadOnly
                            aria-label="pdffileUrl"
                            id="pdffileUrl"
                            classNames={pdfInputStyle}
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            type='text'
                            defaultValue={form.pdffileUrl}
                            onClick={() => { window.open(form.pdffileUrl, '_blank') }}
                        />
                    </div>


                    {/* ACTIVE STATUS */}
                    <div className='flex flex-row items-center justify-start px-3 p-3 gap-x-5'>
                        <label aria-label="status" className='w-[25%] font-semibold' htmlFor="status">Trạng thái</label>
                        <Input
                            isReadOnly
                            aria-label="status"
                            id="status"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            type='text'
                            color={form.isActive ? 'success' : 'danger'}
                            defaultValue={form.isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                        />
                    </div>

                </CardBody>

                <Divider />


            </Card>

        </form >
    )
}
