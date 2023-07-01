import { useState, createContext, useContext } from "react";

export const ModalPropertyContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalPropertyProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <ModalPropertyContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalPropertyContext.Provider>
  );
};

export const useModalProperty = () => useContext(ModalPropertyContext);
