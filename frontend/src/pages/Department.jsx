import { useState } from "react";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentList from "../components/DepartmentList";

const DepartmentsPage = () => {
  const [mode, setMode] = useState("list"); // 'list' | 'form'
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleAddClick = () => {
    setEditData(null);
    setMode("form");
  };

  const handleEditClick = (data) => {
    setEditData(data);
    setMode("form");
  };

  const handleSuccess = () => {
    setEditData(null);
    setMode("list");
    setRefresh((prev) => !prev);
  };

  const handleCancel = () => {
    setEditData(null);
    setMode("list");
  };

  return (
    <div className="py-6">
      {mode === "list" ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h1 className="text-2xl font-bold text-blue-700">Departments</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
              onClick={handleAddClick}
            >
              + Add Department
            </button>
          </div>

          <DepartmentList onEdit={handleEditClick} refresh={refresh} />
        </>
      ) : (
        <DepartmentForm
          onClose={handleCancel}
          onSuccess={handleSuccess}
          editData={editData}
        />
      )}
    </div>
  );
};

export default DepartmentsPage;
