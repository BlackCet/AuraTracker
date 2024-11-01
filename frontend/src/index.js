import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CoursesContextProvider } from "./context/coursesContext";
import { AuthContextProvider } from "./context/authContext";
import { AssignmentsContextProvider } from "./context/AssignmentsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <CoursesContextProvider>
    <AssignmentsContextProvider>
      <App />
    </AssignmentsContextProvider>
    </CoursesContextProvider>
    </AuthContextProvider>    
  </React.StrictMode>
);
