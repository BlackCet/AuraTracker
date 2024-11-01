import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Course from "./pages/Course";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/course" element={user ? <Course /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
