'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FC, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: FC<ModalProps> = ({
  children,
  description,
  isOpen,
  onClose,
  title,
}) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
