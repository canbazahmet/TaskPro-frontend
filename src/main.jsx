import React from "react";
import "modern-normalize";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./redux/store.js";

import App from "./components/App/App.jsx";
import "./styles/index.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://taskpro-backend-qxl7.onrender.com/';
axios.defaults.baseURL = API_BASE_URL;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
