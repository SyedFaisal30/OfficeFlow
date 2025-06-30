import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBuilding,
  FaUserTie,
  FaUsers,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const updateLoginState = () => {
      const isAuth = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isAuth);
    };

    updateLoginState();
    const onStorageChange = () => updateLoginState();
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("isLoggedIn");
      localStorage.setItem("logout-event", Date.now());
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <header className="bg-blue-600 w-full text-white shadow-md px-4 py-3 flex justify-between items-center">
      <h1
        className="text-xl sm:text-2xl font-bold flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaBuilding />
        OfficeFlow
      </h1>

      <nav className="space-x-4 flex items-center text-sm">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="hover:underline flex items-center gap-1"
            >
              <FaUserTie />
              <span className="hidden sm:block">Dashboard</span>
            </Link>
            <Link
              to="/dashboard/departments"
              className="hover:underline flex items-center gap-1"
            >
              <FaBuilding />
              <span className="hidden sm:block">Departments</span>
            </Link>
            <Link
              to="/dashboard/employees"
              className="hover:underline flex items-center gap-1"
            >
              <FaUsers />
              <span className="hidden sm:block">Employees</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 flex items-center gap-1 cursor-pointer"
            >
              <FaSignOutAlt />
              <span className="hidden sm:block">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-2 py-1 rounded hover:bg-green-600 flex items-center gap-1 cursor-pointer"
          >
            <FaSignInAlt />
            <span className="hidden sm:block">Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
