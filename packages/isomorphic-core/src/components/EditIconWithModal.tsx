import { useState } from "react";
import { ActionIcon } from "rizzui"; 
import { Modal } from "rizzui"; 
import PencilIcon from "@core/components/icons/pencil";

interface ActionIconWithModalProps {
  viewComponent: React.ReactNode;
  modalTitle?: string;
}

const ActionIconWithModal = ({ viewComponent, modalTitle = "Edit" }: ActionIconWithModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {/* ActionIcon to trigger the modal */}
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label="Edit Item"
        onClick={handleOpenModal}
      >
        <PencilIcon className="size-4" />
      </ActionIcon>

      {/* RizzUI Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
        {/* Modal content */}
        <div
  className="p-4 bg-white rounded-lg shadow-lg mx-auto max-w-full sm:max-w-lg"
  style={{ width: "600px" }}
>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">{modalTitle}</h2>
          </div>
          <div>{viewComponent}</div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCloseModal}
              className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ActionIconWithModal;

