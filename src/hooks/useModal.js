import { useState, useEffect } from "react";

export function useModal(initialState) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const closeModalEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", closeModalEsc);
    return () => window.removeEventListener("keydown", closeModalEsc);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
