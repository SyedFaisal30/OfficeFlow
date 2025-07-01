import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const EmployeePage = () => {
  const [mode, setMode] = useState("list"); // 'list' or 'form'
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddClick = () => {
    setLoading(true);
    setTimeout(() => {
      setEditData(null);
      setMode("form");
      setLoading(false);
    }, 300);
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
    setMode("list");
    setEditData(null);
    setRefresh((prev) => !prev);
  };

  const handleCancel = () => {
    setMode("list");
    setEditData(null);
  };

  return (
    <div className="w-full py-6 animate-fade-in transition-opacity duration-300 ease-in-out">
      {mode === "list" ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold text-blue-700">Employees</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto cursor-pointer"
              onClick={handleAddClick}
            >
              + Add Employee
            </button>
          </div>

          <EmployeeList onEdit={handleEditClick} refresh={refresh} />
        </>
      ) : loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="transition-all duration-500 ease-in-out">
          <EmployeeForm
            editData={editData}
            onSuccess={handleSuccess}
            onClose={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
