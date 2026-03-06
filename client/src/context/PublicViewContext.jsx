import { createContext, useContext, useState } from "react";

const PublicViewContext = createContext();

export function PublicViewProvider({ children }) {
  const [isPublic, setIsPublic] = useState(false);
  const togglePublic = () => setIsPublic((v) => !v);
  return (
    <PublicViewContext.Provider value={{ isPublic, togglePublic }}>
      {children}
    </PublicViewContext.Provider>
  );
}

export const usePublicView = () => useContext(PublicViewContext);