'use client'

import { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { FaWpforms } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";



export default function CreateTestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [formSelected, setFormSelected] = useState<boolean>(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const modalStyle = {
        body: "py-6",
        backdrop: "bg-gradient-to-t from-zinc-600 to-zinc-600/10 backdrop-opacity-20",
        header: "border-b-[1px] border-gray",
        footer: "border-t-[1px] border-gray",
    }

    return (
        <div>
            {/* <div>
                <Button onPress={onOpen}>Open Modal</Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                    size="2xl"
                    hideCloseButton={true}
                    scrollBehavior="inside"
                    classNames={modalStyle}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 capitalize">Tạo bài test mới</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                        adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                        officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                        nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                        deserunt nostrud ad veniam.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Hủy
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Lưu
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

            <div className="flex flex-row gap-4">
                <Button
                    className='bg-black text-white w-32'
                    variant="shadow"
                    radius="sm"
                    startContent={<CgSoftwareUpload size={22} />}
                    onPress={() => setFormSelected(false)}
                >
                    Tải tệp
                </Button>
                <Button
                    className='bg-black text-white w-32'
                    variant="shadow"
                    radius="sm"
                    startContent={<SiGoogleforms size={22} />}
                    onPress={() => setFormSelected(true)}
                >
                    Điền form
                </Button>
            </div> */}
            {/* {formSelected && <>{children}</>} */}
            {true && <>{children}</>}
        </div>
    )
}
