import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CoursesContextProvider } from "./context/coursesContext";
import { AuthContext, AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <CoursesContextProvider>
      <App />
    </CoursesContextProvider>
    </AuthContextProvider>    
  </React.StrictMode>
);
