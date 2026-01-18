import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal show={isOpen} size="md" onClose={onCancel} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-gray-200" />
          {title && (
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h3>
          )}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message || "Are you sure you want to delete this?"}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white"
              onClick={onConfirm}
            >
              Yes, I'm sure
            </Button>
            <Button
              className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 focus:ring-4 focus:ring-gray-200"
              onClick={onCancel}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
