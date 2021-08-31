import { useState, useEffect } from "react";

export function useModal(initialState) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflowY = "auto";
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
