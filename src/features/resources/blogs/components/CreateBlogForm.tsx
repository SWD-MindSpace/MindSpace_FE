import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { BsTrash3 } from "react-icons/bs";
import { PlusIcon } from "@/components/icon/PlusIcon";



export default function CreateBlogForm({
    form,
    specializationArr,
    onSubmit,
    onFormInputChange,
    onClearAllFields,
    onOpenNewSectionModal,
    onClickDeleteContent
}) {

    const contentInFormStyles = {
        base: 'cursor-pointer',
        label: 'cursor-pointer font-semibold',
        input: 'cursor-pointer',
        inputWrapper: 'cursor-pointer hover:bg-gray-100',
        innerWrapper: 'cursor-pointer',
        mainWrapper: 'cursor-pointer',
    }

    return (
        <form className='w-full text-center' onSubmit={onSubmit}>
            <Card
                className='h-full -z-0'
                radius='sm'
            >

                <CardHeader className='text-white bg-primary-blue'>
                    <div className='w-full text-center text-md font-semibold uppercase'>BÀI BLOG MỚI</div>
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
                            placeholder="Nhập tiêu đề bài blog"
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
                            placeholder="Nhập giới thiệu về bài blog"
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

                                <div>
                                    <PlusIcon
                                        onClick={onOpenNewSectionModal}
                                        size={40}
                                        color="white"
                                        className='bg-green-400 rounded-full p-2 hover:bg-green-500'
                                    />
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
                                                // onClick={() => onClickQuestion(item.isNewQuestion, item.id)}
                                                />

                                                <div className="px-2">
                                                    {item.htmlContent.slice(3, -4)}
                                                </div>
                                            </Card>

                                            <BsTrash3
                                                onClick={() => onClickDeleteContent(item.id)}
                                                size={40}
                                                color="red"
                                                className='bg-red-100 rounded-full p-2 hover:bg-red-300'
                                            />

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
