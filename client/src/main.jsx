import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PublicViewProvider } from "./context/PublicViewContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PublicViewProvider>
      <App />
    </PublicViewProvider>
  </StrictMode>
);