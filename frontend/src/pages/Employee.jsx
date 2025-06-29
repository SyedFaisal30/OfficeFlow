// src/pages/EmployeePage.jsx
import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const EmployeePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Employees</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
        >
          + Add Employee
        </button>
      </div>

      {showForm && (
        <EmployeeForm
          onClose={() => setShowForm(false)}
          editData={editData}
          onSuccess={() => setShowForm(false)}
        />
      )}

      <EmployeeList
        onEdit={(data) => {
          setEditData(data);
          setShowForm(true);
        }}
      />
    </div>
  );
};

export default EmployeePage;
