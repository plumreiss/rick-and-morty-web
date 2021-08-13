import { TooManyRequests } from "http-errors";
import { useState } from "react";

export function useModal(initialState) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (e) => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
