import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [openCount, setOpenCount] = useState(0);

  const registerOpen  = () => setOpenCount(c => c + 1);
  const registerClose = () => setOpenCount(c => Math.max(0, c - 1));

  return (
    <ModalContext.Provider value={{ anyModalOpen: openCount > 0, registerOpen, registerClose }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);