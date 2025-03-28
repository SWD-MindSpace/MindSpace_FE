import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/react";
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';



export default function CreateSPForm({
    psychologistArr,
    address,
    onAdressChange,
    onSubmit,
    onClearAllFields,
}) {

    const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;


    const [pdf, setPdf] = useState('')


    const onSuccessfulUpload = (result: CloudinaryUploadWidgetResults) => {
        setPdf(result.info.secure_url)
    }


    const handleViewPdf = () => {
        if (pdf) {
            window.open(pdf, '_blank')
        } else return
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!pdf) {
            alert('Vui lòng tải lên tài liệu chi tiết')
            return
        }

        const formData = new FormData(e.target)

        const cityId = Number(formData.get('cityId'))
        const cityName = address.provinces.find(province => province.code === cityId).name

        const districtId = Number(formData.get('districtId'))
        const districtName = address.districts.find(district => district.code === districtId).name

        const wardId = Number(formData.get('wardId'))
        const wardName = address.wards.find(ward => ward.code === wardId).name

        const data = {}

        formData.forEach((value, key) => {
            switch (key) {
                case 'cityId':
                    key = 'city'
                    value = cityName
                    break;
                case 'districtId':
                    key = 'province'
                    value = districtName
                    break;
                case 'wardId':
                    key = 'ward'
                    value = wardName
                    break;
                case 'psychologistId':
                    value = Number(value)
                    break
                case 'maxQuantity':
                    value = Number(value)
                    break
            }

            data[key] = value

        })

        onSubmit(data)

    }


    const pdfInputStyle = {
        base: "cursor-pointer",
        mainWrapper: "cursor-pointer",
        inputWrapper: "cursor-pointer",
        innerWrapper: "cursor-pointer",
        input: "cursor-pointer",
    }

    return (
        <form className='w-full text-center' onSubmit={handleSubmit}>
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
                            aria-label="title"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="title"
                            placeholder="Nhập tiêu đề chương trình"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống tiêu đề'}
                            name="title"
                        />
                    </div>


                    {/* PSYCHOLOGISTS */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="psychologist" className='w-[25%] font-semibold' htmlFor="psychologist">Chuyên viên tâm lý</label>
                        <Select
                            className="w-[80%]"
                            id="psychologist"
                            aria-label="psychologist"
                            size="lg"
                            radius="sm"
                            placeholder="Chọn chuyên viên tâm lý"
                            isRequired
                            errorMessage={'Bắt buộc chọn chuyên viên tâm lý'}
                            name="psychologistId"
                        >
                            {psychologistArr.map(psychologist => (
                                <SelectItem
                                    key={psychologist.id}
                                    value={psychologist.id}
                                >
                                    {psychologist.fullName}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>


                    {/* MAX QUANTITY */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="maxQuantity" className='w-[25%] font-semibold' htmlFor="maxQuantity">Số lượng đăng ký</label>
                        <Input
                            aria-label="maxQuantity"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="maxQuantity"
                            placeholder="Nhập số lượng đăng ký"
                            type='number'
                            isRequired
                            name="maxQuantity"
                        />
                    </div>


                    {/* CITY/PROVINCE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="city" className='w-[25%] font-semibold' htmlFor="city">Tỉnh/Thành phố</label>
                        <Select
                            className="w-[80%]"
                            id="city"
                            aria-label="city"
                            size="lg"
                            radius="sm"
                            placeholder="Chọn tỉnh/thành phố"
                            isRequired
                            errorMessage={'Bắt buộc chọn tỉnh/thành phố'}
                            onChange={(e) => onAdressChange('provinces', Number(e.target.value))}
                            name="cityId"
                        >
                            {address.provinces.map(province => (
                                <SelectItem
                                    key={province.code}
                                    value={province.code}
                                >
                                    {province.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>


                    {/* DISTRICT */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="district" className='w-[25%] font-semibold' htmlFor="district">Quận/Huyện</label>
                        <Select
                            className="w-[80%]"
                            id="district"
                            aria-label="district"
                            size="lg"
                            radius="sm"
                            placeholder="Chọn quận/huyện"
                            isRequired
                            errorMessage={'Bắt buộc chọn quận/huyện'}
                            onChange={(e) => onAdressChange('districts', Number(e.target.value))}
                            name="districtId"
                        >
                            {address.districts.map(district => (
                                <SelectItem
                                    key={district.code}
                                    value={district.code}
                                >
                                    {district.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>


                    {/* WARD */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="ward" className='w-[25%] font-semibold' htmlFor="ward">Phường/Xã</label>
                        <Select
                            className="w-[80%]"
                            id="ward"
                            aria-label="ward"
                            size="lg"
                            radius="sm"
                            placeholder="Chọn phường/xã"
                            isRequired
                            errorMessage={'Bắt buộc chọn phường/xã'}
                            name="wardId"
                        >
                            {address.wards.map(ward => (
                                <SelectItem
                                    key={ward.code}
                                    value={ward.code}
                                >
                                    {ward.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>


                    {/* STREET */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="street" className='w-[25%] font-semibold' htmlFor="street">Địa chỉ</label>
                        <Input
                            aria-label="street"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="street"
                            placeholder="Nhập địa chỉ"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống địa chỉ'}
                            name="street"
                        />
                    </div>


                    {/* POSTAL CODE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="postalCode" className='w-[25%] font-semibold' htmlFor="postalCode">Mã bưu điện</label>
                        <Input
                            aria-label="postalCode"
                            id="postalCode"
                            name="postalCode"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            placeholder="Nhập mã bưu điện"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống mã bưu điện'}
                        />
                    </div>


                    {/* START DATE */}
                    <div className='flex flex-row items-start justify-center p-3 gap-x-5'>
                        <label aria-label="startDateAt" className='w-[25%] font-semibold pt-3' htmlFor="startDateAt">Ngày bắt đầu</label>
                        <DatePicker
                            aria-label="startDateAt"
                            id="startDateAt"
                            name="startDateAt"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            variant="bordered"
                            isRequired
                        />
                    </div>


                    {/* PDF */}
                    <div className='flex flex-row items-center justify-start px-3 p-3 gap-x-5'>
                        <label aria-label="pdffileUrl" className='w-[25%] font-semibold' htmlFor="pdffileUrl">Tài liệu chi tiết</label>
                        <div className="flex flex-row items-center justify-between w-[80%] gap-x-3">
                            <Input
                                isReadOnly
                                aria-label="pdffileUrl"
                                id="pdffileUrl"
                                name="pdffileUrl"
                                classNames={pdf ? pdfInputStyle : {}}
                                className='w-[80%]'
                                radius='sm'
                                size='lg'
                                placeholder="Tải lên tài liệu chi tiết"
                                type='text'
                                isRequired
                                value={pdf}
                                onClick={handleViewPdf}
                            />
                            <CldUploadButton
                                onSuccess={onSuccessfulUpload}
                                uploadPreset={cloudPresetName}
                                className="w-[20%] bg-blue-500 p-2 rounded border text-white
                                                                            hover:bg-blue-600 transition ease-in-out delay-200"
                            >
                                <span className="text-center font-semibold">Tải lên</span>
                            </CldUploadButton>
                        </div>
                    </div>

                </CardBody>

                <Divider />


                {/* SAVE & CLEAR BUTTON */}
                <CardFooter className='flex flex-row gap-3 justify-end px-5 bg-gray-100 h-20'>
                    <Button onPress={onClearAllFields} className='bg-red-500 text-white font-semibold uppercase w-32' type="submit" radius='sm'
                    >
                        Xóa toàn bộ
                    </Button>
                    <Button
                        className='bg-primary-blue text-white uppercase font-semibold w-32'
                        type="submit"
                        radius='sm'
                    >
                        Tạo
                    </Button>
                </CardFooter>

            </Card>

        </form >
    )
}
