import SearchBox from "@/components/list/SearchBox";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, Divider } from '@heroui/react';
import { Pagination } from "@heroui/react";


export default function QuestionBank({ data, searchParams, totalPages, onInputChange, onClickQuestion, onAddQuestionToForm }) {


    const paginationItemStyle = {
        item: 'border-1 border-gray-200',
        cursor: 'bg-primary-blue text-white'
    }

    const searchBoxProps = {
        placeholder: 'Tìm kiếm câu hỏi',
        searchField: 'SearchQuestionContent'
    }


    return (
        <Card
            className='h-5/6 -z-0'
            radius='sm'
        >
            <CardHeader className='text-white bg-primary-blue'>
                <div className='w-full text-center text-md font-semibold uppercase'>Danh sách câu hỏi</div>
            </CardHeader>
            <Divider />


            <>
                <CardBody className='p-7 flex flex-col gap-y-3'>
                    <div className="w-full mb-5">
                        <SearchBox
                            searchParams={searchParams}
                            onInputChange={onInputChange}
                            searchBoxProps={searchBoxProps}
                        />
                    </div>

                    {data.length === 0 ?
                        (<div className="w-full h-full flex justify-center items-center text-xl">Không có câu hỏi nào</div>)
                        :
                        (
                            data.map(question => (
                                <div key={question.id} className='flex flex-row gap-2'>
                                    <Card
                                        className='w-5/6 flex justify-center pl-4 border-1 border-gray-400'
                                        isPressable
                                        shadow='sm'
                                        onPress={() => onClickQuestion(question.id)}
                                    >
                                        <div className='w-full text-left truncate'>{question.content}</div>
                                    </Card>
                                    <Button className='bg-primary-blue text-white w-1/6' onPress={() => onAddQuestionToForm(question.id, question.content)}>Thêm</Button>
                                </div>
                            ))
                        )
                    }

                </CardBody>

                <CardFooter className="flex justify-center items-center py-4 border-t-1 border-gray-300">
                    <Pagination
                        initialPage={1}
                        page={searchParams.has('PageIndex') ? Number(searchParams.get('PageIndex')) : 1}
                        total={totalPages as number}
                        showControls
                        showShadow
                        variant="flat"
                        classNames={paginationItemStyle}
                        onChange={(selectedPage) => onInputChange('PageIndex', selectedPage)}
                    />
                </CardFooter>
            </>


        </Card>
    )
}
