import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";


export default function CreateArticleForm({
    form,
    specializationArr,
    onSubmit,
    onFormInputChange,
    onClearAllFields,
}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className='w-full text-center' onSubmit={handleSubmit}>
            <Card
                className='h-full -z-0'
                radius='sm'
            >

                <CardHeader className='text-white bg-primary-blue'>
                    <div className='w-full text-center text-md font-semibold uppercase'>BÀI BÁO MỚI</div>
                </CardHeader>

                <CardBody>

                    {/* TITLE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="title" className='w-[20%] font-semibold' htmlFor="title">Tiêu đề</label>
                        <Input
                            aria-label="title"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="title"
                            name="title"
                            placeholder="Nhập tiêu đề bài báo"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống tiêu đề'}
                            defaultValue={form?.title || ''}
                            onValueChange={(value) => onFormInputChange('title', value)}
                        />
                    </div>


                    {/* INTRODUCTION */}
                    <div className='flex flex-row items-start justify-start p-3 gap-x-5'>
                        <label aria-label="introduction" className='w-[20%] font-semibold' htmlFor="introduction">Giới thiệu</label>
                        <Textarea
                            aria-label="introduction"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="introduction"
                            name="introduction"
                            minRows={4}
                            placeholder="Nhập giới thiệu về bài báo"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống phần giới thiệu'}
                            defaultValue={form?.introduction || ''}
                            onValueChange={(value) => onFormInputChange('introduction', value)}
                        />
                    </div>


                    {/* SPECIALIZATION */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="specialization" className='w-[20%] font-semibold' htmlFor="specialization">Chuyên môn</label>
                        <Select
                            className="w-[80%]"
                            id="specialization"
                            name="specialization"
                            aria-label="specialization"
                            size="lg"
                            radius="sm"
                            placeholder="Chọn chuyên môn"
                            isRequired
                            errorMessage={'Bắt buộc chọn loại chuyên môn'}
                            defaultSelectedKeys={form?.specializationId ? [form.specializationId.toString()] : []}
                            onChange={(e) => onFormInputChange('specializationId', Number(e.target.value))}
                        >
                            {specializationArr.map(specialization => (
                                <SelectItem
                                    key={specialization.id}
                                    value={specialization.id}
                                >
                                    {specialization.title}
                                </SelectItem>
                            ))}
                        </Select>
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

        </form>
    )
}
