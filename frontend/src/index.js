import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CoursesContextProvider } from "./context/coursesContext";
import { AuthContextProvider } from "./context/authContext";
import { AssignmentsContextProvider } from "./context/AssignmentsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { EventContextProvider } from "./context/EventContext";
import { TimetableContextProvider} from "./context/TimetableContext";
import { GoalsContextProvider } from "./context/GoalsContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <CoursesContextProvider>
    <AssignmentsContextProvider>
    <EventContextProvider>
    <TimetableContextProvider>
    <GoalsContextProvider>
    <GoogleOAuthProvider clientId="646626177801-4g39k4q77ip2oe1hdamdfqijkbgmmfor.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </GoalsContextProvider>
</TimetableContextProvider>
    </EventContextProvider>
    </AssignmentsContextProvider>
    </CoursesContextProvider>
    </AuthContextProvider>    
  </React.StrictMode>
);