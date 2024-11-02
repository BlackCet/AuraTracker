import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CoursesContextProvider } from "./context/coursesContext";
import { AuthContextProvider } from "./context/authContext";
import { AssignmentsContextProvider } from "./context/AssignmentsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <CoursesContextProvider>
    <AssignmentsContextProvider>
    <GoogleOAuthProvider clientId="646626177801-4g39k4q77ip2oe1hdamdfqijkbgmmfor.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </AssignmentsContextProvider>
    </CoursesContextProvider>
    </AuthContextProvider>    
  </React.StrictMode>
);
