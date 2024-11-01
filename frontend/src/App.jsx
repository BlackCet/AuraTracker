import React from 'react';
import { Route, Routes, Navigate} from "react-router-dom"; // Added missing Navigate import
import Home from './Home/Home';
import About from './About/About';
import Team from './Team/Team';
import Dashboard from './Dashboard/Dashboard';



function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/team" element={<Team/>} />
      </Routes>
    </>
  );
}

export default App;


