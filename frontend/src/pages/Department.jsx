import { useState } from "react";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentList from "../components/DepartmentList";

const DepartmentsPage = () => {
  const [mode, setMode] = useState("list"); // 'list' | 'form'
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddClick = () => {
    setLoading(true);
    setTimeout(() => {
      setEditData(null);
      setMode("form");
      setLoading(false);
    }, 300); // simulate small delay for UX
  };

  const handleEditClick = (data) => {
    setLoading(true);
    setTimeout(() => {
      setEditData(data);
      setMode("form");
      setLoading(false);
    }, 300);
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
    <div className="py-6 animate-fade-in transition-opacity duration-300 ease-in-out">
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
      ) : loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="transition-all duration-500 ease-in-out">
          <DepartmentForm
            onClose={handleCancel}
            onSuccess={handleSuccess}
            editData={editData}
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;
