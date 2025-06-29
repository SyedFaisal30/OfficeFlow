import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`, {
      withCredentials: true,
    });
    setDepartments(res.data.data);
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ search, department, jobTitle });
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/employee/getallemployees?${params}`,
        { withCredentials: true }
      );
      setEmployees(res.data.data.employees || []);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/employee/deleteemployee/${id}`, {
        withCredentials: true,
      });
      fetchEmployees(); // Refresh after deletion
    } catch (err) {
      alert("Error deleting employee.", err);
    }
  };

  useEffect(() => {
    fetchDepartments();

    // inline fetchEmployees logic to avoid dependency warning
    const fetchInitialEmployees = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ search, department, jobTitle });
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/employee/getallemployees?${params}`,
          { withCredentials: true }
        );
        setEmployees(res.data.data.employees || []);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialEmployees();
  }, [search, department, jobTitle]);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Filter by Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        />
        <button
          onClick={fetchEmployees}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Department</th>
              <th className="p-2">Job Title</th>
              <th className="p-2">Supervisor</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.department?.name || "-"}</td>
                <td className="p-2">{emp.jobTitle || "-"}</td>
                <td className="p-2">{emp.supervisor?.name || "-"}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => onEdit(emp)} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(emp._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
