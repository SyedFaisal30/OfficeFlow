import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import DepartmentForm from "./DepartmentForm";
import Modal from "./Modal";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [confirmId, setConfirmId] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`,
        { withCredentials: true }
      );
      setDepartments(res.data?.data || []);
    } catch {
      setError("Failed to fetch departments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/department/deletedepartment/${id}`,
        { withCredentials: true }
      );
      toast.success("Department deleted successfully!");
      fetchDepartments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete department.");
    } finally {
      setConfirmId(null);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl relative">
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
                <td className="p-2 space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => {
                      setEditData(dept);
                      setShowForm(true);
                    }}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => setConfirmId(dept._id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <DepartmentForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchDepartments}
          editData={editData}
        />
      </Modal>

      <Modal isOpen={!!confirmId} onClose={() => setConfirmId(null)}>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this department?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
              onClick={() => handleDelete(confirmId)}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
              onClick={() => setConfirmId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DepartmentList;
