'use client';

import Modal from '@/components/ui/modal';
import { useModalStore } from '@/hooks/use-modal-store';
import { FC } from 'react';

const StoreModal: FC = () => {
  const { isOpen, onClose } = useModalStore();

  return (
    <Modal
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
      title="Create store"
    >
      <div>123 TODO: State Form</div>
    </Modal>
  );
};

export default StoreModal;
