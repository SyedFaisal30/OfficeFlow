import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DepartmentsPage from "./pages/Department";
import EmployeesPage from "./pages/Employee";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/refresh-token`,
          {},
          { withCredentials: true }
        );
        // Token is valid or refreshed successfully
        localStorage.setItem("isLoggedIn", "true");
      } catch (err) {
        console.error("❌ Token refresh failed:", err.message);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="employees" element={<EmployeesPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
