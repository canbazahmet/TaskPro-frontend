import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Welcome />
  </StrictMode>,
);
