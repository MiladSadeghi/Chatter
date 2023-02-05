import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
