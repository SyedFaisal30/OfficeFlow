import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

const EmployeeList = ({ onEdit, refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`,
        { withCredentials: true }
      );
      setDepartments(res.data.data);
    } catch {
      toast.error("Failed to load departments.");
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ search, department, jobTitle });
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/employee/getallemployees?${params}`,
        { withCredentials: true }
      );
      setEmployees(res.data.data.employees || []);
    } catch {
      toast.error("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  }, [search, department, jobTitle]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/employee/deleteemployee/${confirmDeleteId}`,
        { withCredentials: true }
      );
      toast.success("Employee deleted successfully.");
      fetchEmployees();
    } catch {
      toast.error("Error deleting employee.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, refresh]);

  return (
    <div className="sm:p-4 p-2 bg-white shadow rounded-xl w-full mx-auto">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%] cursor-pointer"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Filter by Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        />
        <button
          onClick={fetchEmployees}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer w-full sm:w-auto"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading employees...</p>
        </div>
      ) : employees.length === 0 ? (
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        <div className="overflow-x-auto justify-center">
          <table className="min-w-full justify-center border mt-4 text-sm sm:text-base">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Department</th>
                <th className="p-2">Job Title</th>
                <th className="p-2">Supervisor</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{emp.name}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2">{emp.department?.name || "-"}</td>
                  <td className="p-2">{emp.jobTitle || "-"}</td>
                  <td className="p-2">{emp.supervisor?.name || "-"}</td>
                  <td className="p-2 flex items-center gap-3">
                    <button
                      onClick={() => onEdit(emp)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      title="Edit"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(emp._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      title="Delete"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
      >
        <div className="text-center p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this employee?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmDeleteId(null)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeList;
