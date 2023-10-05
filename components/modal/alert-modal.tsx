'use client';

import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { FC, useEffect, useState } from 'react';

interface AlertModalProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: FC<AlertModalProps> = ({
  isLoading,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      description="This action can't be undone."
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isLoading} onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={onConfirm} variant="destructive">
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
