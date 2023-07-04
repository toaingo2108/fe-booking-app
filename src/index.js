import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ModalPropertyProvider } from "./hooks/useModalProperty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalPropertyProvider>
        <App />
        <ToastContainer />
      </ModalPropertyProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
