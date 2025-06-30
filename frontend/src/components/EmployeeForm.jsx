import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaBuilding,
  FaUserTie,
  FaGlobe,
  FaFlag,
  FaCity,
  FaEdit
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = ({ onClose, onSuccess, editData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [supervisor, setSupervisor] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [departments, setDepartments] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const isEditMode = !!editData;

  useEffect(() => {
    if (isEditMode) {
      setName(editData.name || "");
      setEmail(editData.email || "");
      setJobTitle(editData.jobTitle || "");
      setDepartment(editData.department?._id || "");
      setSupervisor(editData.supervisor?._id || null);
      setCountry(editData.location?.country || "");
      setState(editData.location?.state || "");
      setCity(editData.location?.city || "");
    }
  }, [editData, isEditMode]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`, { withCredentials: true })
      .then((res) => setDepartments(res.data?.data || []));

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/employee/getallemployees`, { withCredentials: true })
      .then((res) => {
        let allEmployees = res.data?.data?.employees || [];
        if (isEditMode && editData && !allEmployees.some((e) => e._id === editData._id)) {
          allEmployees.push(editData);
        }
        setSupervisors(allEmployees);
      });
  }, [editData, isEditMode]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => setCountries(res.data.data.map((c) => c.name)));
  }, []);

  const handleCountryChange = async (value) => {
    setCountry(value);
    setState("");
    setCity("");
    try {
      const res = await axios.post("https://countriesnow.space/api/v0.1/countries/states", { country: value });
      setStates(res.data?.data?.states || []);
    } catch {
      setStates([]);
    }
  };

  const handleStateChange = async (value) => {
    setState(value);
    setCity("");
    try {
      const res = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country,
        state: value,
      });
      setCities(res.data?.data || []);
    } catch {
      setCities([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !jobTitle || !department) {
      toast.error("Please fill all required fields.", { autoClose: false });
      return;
    }

    const payload = {
      name,
      email,
      jobTitle,
      department,
      supervisor: supervisor || null,
      location: {
        country,
        state,
        city: city.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      },
    };

    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/employee/updateemployee/${editData._id}`,
          payload,
          { withCredentials: true }
        );
        toast.success("Employee updated successfully!", { autoClose: 2000 });
      } else {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/employee/createemployee`,
          payload,
          { withCredentials: true }
        );
        toast.success("Employee created successfully!");
      }

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 300);
    } catch (err) {
      if (err?.response?.status === 409) {
        toast.error("Email already exists. Use a different one.", { autoClose: false });
      } else {
        toast.error("Failed to save employee. Try again.", { autoClose: false });
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center flex items-center justify-center gap-2">
        {isEditMode ? <FaEdit /> : <FaUser />} {isEditMode ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaUser />
          <input
            type="text"
            placeholder="Full Name *"
            className="w-full outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email *"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaBriefcase />
          <input
            type="text"
            placeholder="Job Title *"
            className="w-full outline-none"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaBuilding />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full outline-none cursor-pointer"
            required
          >
            <option value="">Select Department *</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaUserTie />
          <select
            value={supervisor || ""}
            onChange={(e) => setSupervisor(e.target.value || null)}
            className="w-full outline-none cursor-pointer"
          >
            <option value="">No Supervisor</option>
            {supervisors.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaGlobe />
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full outline-none cursor-pointer"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaFlag />
          <select
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full outline-none cursor-pointer"
            disabled={!states.length}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md">
          <FaCity />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full outline-none cursor-pointer"
            disabled={!cities.length}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
