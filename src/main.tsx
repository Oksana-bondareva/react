import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/Store";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
