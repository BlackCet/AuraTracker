import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; 
import {AssignmentsContextProvider } from './context/AssignmentsContext'; 

const root = createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AssignmentsContextProvider>
        <App />
      </AssignmentsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
