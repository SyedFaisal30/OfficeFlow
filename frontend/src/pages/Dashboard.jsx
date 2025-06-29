// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import DepartmentsPage from "./Department";
const Dashboard = () => {
  const [stats, setStats] = useState({ departments: 0, employees: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [deptRes, empRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_SERVER_URL}/api/employee/getallemployees`, { withCredentials: true })
        ]);

        setStats({
          departments: deptRes.data?.data?.length || 0,
          employees: empRes.data?.data?.employees?.length || 0,
        });
      } catch (err) {
        setError("Failed to fetch dashboard stats. Please login again.");
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-6 space-y-10">
      <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>

      {error && <p className="text-red-600">{error}</p>}

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

      {/* 👇 Embed the DepartmentsPage directly */}
      <div>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">Manage Departments</h2>
        <DepartmentsPage />
      </div>
    </div>
  );
};

export default Dashboard;
