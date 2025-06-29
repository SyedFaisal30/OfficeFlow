import { useState } from "react";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentList from "../components/DepartmentList";

const DepartmentsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Handle create button
  const handleAddClick = () => {
    setEditData(null); // No edit data for new department
    setShowForm(true);
  };

  // Handle edit button from list
  const handleEditClick = (department) => {
    setEditData(department);
    setShowForm(true);
  };

  // Called after save (create/update)
  const handleSuccess = () => {
    setShowForm(false);
    setEditData(null);
    setRefresh((prev) => !prev); // Trigger list reload
  };

  return (
    <div className="space-y-6">
      {!showForm && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={handleAddClick}
        >
          + Add Department
        </button>
      )}

      {showForm ? (
        <DepartmentForm
          editData={editData}
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      ) : (
        <DepartmentList
          onEdit={handleEditClick}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default DepartmentsPage;
