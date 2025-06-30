import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({ departments: 0, employees: 0 });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  const isRootDashboard = location.pathname === "/dashboard";

  // Convert pathname to breadcrumb parts
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter(Boolean); // e.g. ['dashboard', 'employees', 'edit']
    const links = [];

    for (let i = 0; i < pathnames.length; i++) {
      const path = "/" + pathnames.slice(0, i + 1).join("/");
      const name = pathnames[i]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      links.push({ path, name });
    }

    return links;
  };

  const breadcrumbs = generateBreadcrumbs();

  useEffect(() => {
    const fetchStatsAndLists = async () => {
      try {
        const [deptRes, empRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`, {
            withCredentials: true,
          }),
          axios.get(`${import.meta.env.VITE_SERVER_URL}/api/employee/getallemployees`, {
            withCredentials: true,
          }),
        ]);

        const deptData = deptRes.data?.data || [];
        const empData = empRes.data?.data?.employees || [];

        setStats({
          departments: deptData.length,
          employees: empData.length,
        });

        setDepartments(deptData.slice(0, 3));
        setEmployees(empData.slice(0, 3));
      } catch (err) {
        setError("Failed to fetch dashboard stats. Please login again.");
        console.error(err);
      }
    };

    fetchStatsAndLists();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-6 space-y-10">
      <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>

      {/* Breadcrumbs */}
      {!isRootDashboard && (
        <nav className="text-sm text-gray-600 mb-4">
          <ul className="flex flex-wrap items-center space-x-2">
            {breadcrumbs.map((crumb, idx) => (
              <li key={crumb.path} className="flex items-center">
                <Link to={crumb.path} className="text-blue-600 hover:underline capitalize">
                  {crumb.name}
                </Link>
                {idx < breadcrumbs.length - 1 && <span className="mx-2">›</span>}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {isRootDashboard && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700">Total Departments</h2>
              <p className="text-4xl font-bold text-blue-600">{stats.departments}</p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700">Total Employees</h2>
              <p className="text-4xl font-bold text-blue-600">{stats.employees}</p>
            </div>
          </div>

          {/* Departments + Employees Side by Side */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Departments */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-blue-700">Recent Departments</h2>
                <Link to="departments" className="text-blue-600 font-medium hover:underline">View All</Link>
              </div>

              {departments.length === 0 ? (
                <p className="text-gray-500 italic">No departments found.</p>
              ) : (
                <ul className="space-y-3">
                  {departments.map((dept) => (
                    <li
                      key={dept._id}
                      className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{dept.name}</h3>
                      <p className="text-sm text-gray-600">{dept.description}</p>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                to="departments"
                className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
              >
                Add / Manage Departments
              </Link>
            </div>

            {/* Recent Employees */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-green-700">Recent Employees</h2>
                <Link to="employees" className="text-green-600 font-medium hover:underline">View All</Link>
              </div>

              {employees.length === 0 ? (
                <p className="text-gray-500 italic">No employees found.</p>
              ) : (
                <ul className="space-y-3">
                  {employees.map((emp) => (
                    <li
                      key={emp._id}
                      className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{emp.name}</h3>
                      <p className="text-sm text-gray-600">
                        {emp.jobTitle} – {emp.department?.name || "No Dept"}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                to="employees"
                className="mt-3 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
              >
                Add / Manage Employees
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Nested Route Outlet */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
