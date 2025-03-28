// components/DeleteConfirmationPopup.tsx
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { toast } from 'react-toastify';

interface DeleteConfirmationPopupProps {
    entityId: number;
    entityName: string;
    onDelete: (id: number) => Promise<void>;
    children?: React.ReactNode;
}

const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({ entityId, entityName, onDelete }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleConfirmDelete = async () => {
        try {
            const result = await onDelete(entityId);
            setIsOpen(false);
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
                <ModalHeader>
                    <h2 className="text-xl font-semibold text-gray-800">Xác nhận xóa {entityName}</h2>
                </ModalHeader>
                <ModalBody>
                    <p className="text-gray-600">
                        Bạn có chắc muốn xóa {entityName} này? Bản ghi này sẽ bị xóa vĩnh viễn khỏi hệ thống.
                    </p>
                </ModalBody>
                <ModalFooter className="flex justify-end gap-3">
                    <Button
                        variant="bordered"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                        onPress={() => setIsOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onPress={handleConfirmDelete}
                    >
                        Xác nhận
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteConfirmationPopup;