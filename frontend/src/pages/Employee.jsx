import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const EmployeePage = () => {
  const [mode, setMode] = useState("list"); // 'list' or 'form'
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
    setMode("list");
    setEditData(null);
    setRefresh((prev) => !prev);
  };

  const handleCancel = () => {
    setMode("list");
    setEditData(null);
  };

  return (
    <div className="p-6">
      {mode === "list" ? (
        <>
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold text-blue-700">Employees</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleAddClick}
            >
              + Add Employee
            </button>
          </div>

          <EmployeeList onEdit={handleEditClick} refresh={refresh} />
        </>
      ) : (
        <EmployeeForm
          editData={editData}
          onSuccess={handleSuccess}
          onClose={handleCancel}
        />
      )}
    </div>
  );
};

export default EmployeePage;
