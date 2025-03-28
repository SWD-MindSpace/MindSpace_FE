import React from 'react'
import { Button, Card } from '@heroui/react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { LiaCircleSolid } from "react-icons/lia";



interface QuestionOption {
    displayedText: string;
}

interface SelectedQuestion {
    id: string;
    content: string;
    questionOptions: QuestionOption[];
}

export default function DetailedQuestionModal({ selectedQuestion, isOpen, onOpenChange, onCloseQuestion, onAddQuestionToForm }: { selectedQuestion: SelectedQuestion; isOpen: boolean; onOpenChange: (isOpen: boolean) => void; onCloseQuestion: () => void; onAddQuestionToForm: (id: string, content: string) => void }) {

    const handleAddQuestionsToForm = () => {
        onAddQuestionToForm(selectedQuestion.id, selectedQuestion.content)
        onCloseQuestion()
    }

    return (
        <Modal
            backdrop="opaque"
            className='min-h-96'
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 uppercase bg-primary-blue text-white">chi tiết câu hỏi</ModalHeader>

                        <ModalBody>
                            <p className='text-md font-semibold mt-2'>{selectedQuestion.content}</p>

                            <div className='flex flex-col gap-y-3'>
                                {selectedQuestion.questionOptions.map((option, index) => (
                                    <Card
                                        key={index}
                                        className='w-full border-1 py-2 px-3 border-gray-500'
                                        shadow="sm"
                                        radius="none"
                                    >
                                        <div className='flex flex-row justify-between'>
                                            <p>{option.displayedText}</p>
                                            <LiaCircleSolid size={24} />
                                        </div>

                                    </Card>
                                ))}

                            </div>

                        </ModalBody>

                        <ModalFooter className='border-t-1 bg-gray-100'>
                            <Button color="danger" onPress={onCloseQuestion}>
                                Đóng
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
