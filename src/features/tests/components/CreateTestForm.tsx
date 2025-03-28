import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, Divider } from '@heroui/react';
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { BsTrash3 } from "react-icons/bs";
import { Specialization } from "@/features/dashboard/schemas/statisticsSchema";


interface CreateTestFormProps {
    form: {
        title?: string;
        description?: string;
        testCode?: string;
        testCategoryId?: number;
        specializationId?: number;
        targetUser?: number;
        price?: number;
        questionItems: { id: number; content: string; isNewQuestion: boolean }[];
    };
    specializationArr: Specialization[];
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onFormInputChange: (field: string, value: any) => void;
    onClearAllFields: () => void;
    onClickQuestion: (isNewQuestion: boolean, id: number) => void;
    onClickDeleteQuestion: (id: number) => void;
}

export default function CreateTestForm({
    form,
    specializationArr,
    onSubmit,
    onFormInputChange,
    onClearAllFields,
    onClickQuestion,
    onClickDeleteQuestion
}: CreateTestFormProps) {

    const questionInFormStyles = {
        base: 'cursor-pointer',
        label: 'cursor-pointer font-semibold',
        input: 'cursor-pointer',
        inputWrapper: 'cursor-pointer hover:bg-gray-100',
        innerWrapper: 'cursor-pointer',
        mainWrapper: 'cursor-pointer',
    }

    return (
        <form className='w-[60%] text-center' onSubmit={onSubmit}>
            <Card
                className='h-full -z-0'
                radius='sm'
            >

                <CardHeader className='text-white bg-primary-blue'>
                    <div className='w-full text-center text-md font-semibold uppercase'>BÀI TEST MỚI</div>
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
                            placeholder="Nhập tiêu đề bài test"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống tiêu đề'}
                            defaultValue={form?.title || ''}
                            onValueChange={(value) => onFormInputChange('title', value)}
                        />
                    </div>


                    {/* DESCRIPTION */}
                    <div className='flex flex-row items-start justify-start p-3 gap-x-5'>
                        <label aria-label="description" className='w-[20%] font-semibold' htmlFor="description">Mô tả</label>
                        <Textarea
                            aria-label="description"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="description"
                            name="description"
                            placeholder="Nhập mô tả về bài test"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống mô tả'}
                            defaultValue={form?.description || ''}
                            onValueChange={(value) => onFormInputChange('description', value)}
                        />
                    </div>


                    {/* TEST CODE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="testCode" className='w-[20%] font-semibold' htmlFor="testCode">Mã bài test</label>
                        <Input
                            aria-label="testCode"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="testCode"
                            name="testCode"
                            placeholder="Nhập mã bài test"
                            type='text'
                            isRequired
                            errorMessage={'Không được bỏ trống mã bài test'}
                            defaultValue={form?.testCode || ''}
                            onValueChange={(value) => onFormInputChange('testCode', value)}
                        />
                    </div>


                    {/* CATEGORY */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="category" className='w-[20%] font-semibold' htmlFor="category">Loại</label>
                        <Select
                            className="w-[80%]"
                            id="category"
                            name="category"
                            aria-label="category"
                            size="lg"
                            radius="sm"
                            placeholder="Chọn loại bài test"
                            isRequired
                            errorMessage={'Bắt buộc chọn loại bài test'}
                            defaultSelectedKeys={form?.testCategoryId ? [form.testCategoryId.toString()] : []}
                            onChange={(e) => onFormInputChange('testCategoryId', Number(e.target.value))}

                        >
                            <SelectItem key="1" value="1">Tâm lý</SelectItem>
                            <SelectItem key="2" value="2">Giáo dục con cái</SelectItem>
                            <SelectItem key="3" value="3">Định kỳ</SelectItem>
                        </Select>
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
                                    {specialization.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>


                    {/* TARGET USER */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="targetUser" className='w-[20%] font-semibold' htmlFor="targetUser">Đối tượng</label>
                        <Select
                            className="w-[80%]"
                            id="targetUser"
                            name="targetUser"
                            aria-label="targetUser"
                            size="lg"
                            radius="sm"
                            placeholder="Chọn đối tượng"
                            isRequired
                            errorMessage={'Bắt buộc chọn loại đối tượng'}
                            defaultSelectedKeys={form?.targetUser ? [form.targetUser.toString()] : []}
                            onChange={(e) => onFormInputChange('targetUser', Number(e.target.value))}
                        >
                            <SelectItem key="1" value="1">Học sinh</SelectItem>
                            <SelectItem key="2" value="2">Phụ huynh</SelectItem>
                            <SelectItem key="0" value="0">Tất cả</SelectItem>
                        </Select>
                    </div>


                    {/* PRICE */}
                    <div className='flex flex-row items-center justify-start p-3 gap-x-5'>
                        <label aria-label="price" className='w-[20%] font-semibold' htmlFor="price">Giá</label>
                        <Input
                            aria-label="price"
                            className='w-[80%]'
                            radius='sm'
                            size='lg'
                            id="price"
                            name="price"
                            placeholder="Nhập giá"
                            type='text'
                            isRequired
                            errorMessage={'Bắt buộc nhập giá'}
                            defaultValue={form?.price !== undefined ? String(form.price) : ''}
                            onValueChange={(value) => onFormInputChange('price', Number(value))}
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
                                {form.questionItems.length > 0 ? (
                                    form.questionItems.map((item, index) => (
                                        <div key={item.id} className='flex flex-row items-center gap-x-5'>
                                            <Input
                                                isReadOnly
                                                defaultValue={item.content}
                                                label={`Question ${index + 1}`}
                                                variant="bordered"
                                                classNames={questionInFormStyles}
                                                onClick={() => onClickQuestion(item.isNewQuestion, item.id)}
                                            />

                                            <BsTrash3
                                                onClick={() => onClickDeleteQuestion(item.id)}
                                                size={40}
                                                color="red"
                                                className='bg-red-100 rounded-full p-2 hover:bg-red-300'
                                            />

                                        </div>
                                    ))
                                ) : (
                                    <div className='flex items-center justify-center h-16'>Chưa có câu hỏi nào</div>
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
