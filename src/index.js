import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ModalPropertyProvider } from "./hooks/useModalProperty";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalPropertyProvider>
        <App />
      </ModalPropertyProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
