import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Course from "./pages/Course";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Assignments from "./pages/Assignments";
import Events from "./pages/Events";
import About from "./pages/About";
import Profiles from "./pages/Profiles";
import Team from "./pages/Team";
import Timer from "./pages/Timer";
function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} /> 
            <Route path="/course" element={user ? <Course /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={user ? <Dashboard />: <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/profile" element={user ? <Profiles/> : <Navigate to="/dashboard" />} />
            <Route path="/assignments" element={user ? <Assignments /> : <Navigate to="/login" />} />
            <Route path="/schedule" element={user ? <Events/> : <Navigate to="/schedule" />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/Virtual Study Rooms" element={user ? <Timer />: <Navigate to="/login" />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
