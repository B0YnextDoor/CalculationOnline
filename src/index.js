import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import User from "./store/User";

export const user = new User();
export const Context = React.createContext({ user });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider value={{ user }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
