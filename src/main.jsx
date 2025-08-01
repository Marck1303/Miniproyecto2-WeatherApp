import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { UnidadProvider } from "./context/UnidadContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UnidadProvider>
        <App />
      </UnidadProvider>
    </BrowserRouter>
  </StrictMode>
);
