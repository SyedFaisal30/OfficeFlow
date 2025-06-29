// src/components/DepartmentForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const DepartmentForm = ({ onClose, onSuccess, editData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const isEditMode = !!editData;

  useEffect(() => {
  const isEditMode = !!editData;
  if (isEditMode) {
    setName(editData.name);
    setDescription(editData.description || "");
  }
}, [editData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");

    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/department/updatedepartment/${editData._id}`,
          { name, description },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/department/createdepartment`,
          { name, description },
          { withCredentials: true }
        );
      }

      onSuccess(); // callback to refresh the list
      onClose();   // close modal or form
    } catch (err) {
      console.error(err);
      alert("Error saving department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        {isEditMode ? "Edit Department" : "Create Department"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
