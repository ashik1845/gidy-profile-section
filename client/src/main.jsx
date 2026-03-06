import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PublicViewProvider } from "./context/PublicViewContext.jsx";
import { ModalProvider } from "./context/ModalContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PublicViewProvider>
      <ModalProvider>
      <App />
      </ModalProvider>
    </PublicViewProvider>
  </StrictMode>
);