import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBuilding, FaUserTie, FaUsers, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Basic check: is accessToken cookie present?
    const isAuth = document.cookie.includes("accessToken=");
    setIsLoggedIn(isAuth);
  }, [location]);

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1
        className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaBuilding className="text-white" />
        OfficeFlow
      </h1>

      <nav className="space-x-4 flex items-center">
        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="hover:underline flex items-center gap-1">
              <FaUserTie /> Dashboard
            </Link>
            <Link to="/departments" className="hover:underline flex items-center gap-1">
              <FaBuilding /> Departments
            </Link>
            <Link to="/employees" className="hover:underline flex items-center gap-1">
              <FaUsers /> Employees
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <Link
            to="/login"
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
          >
            <FaSignInAlt />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
