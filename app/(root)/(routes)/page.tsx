'use client';

import { useModalStore } from '@/hooks/use-modal-store';
import { FC, useEffect } from 'react';

const SetupPage: FC = () => {
  const { isOpen, onOpen } = useModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);

  return null;
};

export default SetupPage;
