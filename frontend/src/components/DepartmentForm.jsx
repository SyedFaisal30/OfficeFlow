import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaSave, FaTimes, FaBuilding, FaInfoCircle } from "react-icons/fa";

const DepartmentForm = ({ onClose, onSuccess, editData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const isEditMode = !!editData;

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setDescription(editData.description || "");
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/department/updatedepartment/${editData._id}`,
          { name, description },
          { withCredentials: true }
        );
        toast.success("Department updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/department/createdepartment`,
          { name, description },
          { withCredentials: true }
        );
        toast.success("Department created successfully!");
      }

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error("Error saving department. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-[95%] sm:w-[90%] md:max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-blue-700 flex items-center gap-2 justify-center">
        {isEditMode ? <FaEdit /> : <FaPlus />}
        {isEditMode ? "Edit Department" : "Add New Department"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaBuilding />
          <input
            type="text"
            placeholder="Department Name *"
            className="w-full outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaInfoCircle />
          <textarea
            placeholder="Description (optional)"
            className="w-full outline-none resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 flex items-center gap-2"
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 flex items-center gap-2"
          >
            <FaSave />
            {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
