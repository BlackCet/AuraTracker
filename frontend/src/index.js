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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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