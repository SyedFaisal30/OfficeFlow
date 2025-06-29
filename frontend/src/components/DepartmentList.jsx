// src/components/DepartmentList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import DepartmentForm from "./DepartmentForm";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`,
        { withCredentials: true }
      );
      setDepartments(res.data?.data || []);
    } catch (err) {
      setError("Failed to fetch departments.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Delete department
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/department/deletedepartment/${id}`,
        { withCredentials: true }
      );
      fetchDepartments(); // Refresh list
    } catch (err) {
      alert("Error deleting department.", err);
    }
  };

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (dept) => {
    setEditData(dept);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-700">Departments</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          onClick={handleAdd}
        >
          + Add Department
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : departments.length === 0 ? (
        <p className="text-gray-600">No departments found.</p>
      ) : (
        <table className="w-full table-auto border rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{dept.name}</td>
                <td className="p-2">{dept.description || "-"}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(dept)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(dept._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Create/Edit */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <DepartmentForm
              onClose={() => setShowForm(false)}
              onSuccess={fetchDepartments}
              editData={editData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
