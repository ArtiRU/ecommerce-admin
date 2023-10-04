import { create } from 'zustand';

type UseModalStore = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useModalStore = create<UseModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
