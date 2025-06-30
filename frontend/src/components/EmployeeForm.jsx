import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeForm = ({ onClose, onSuccess, editData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [supervisor, setSupervisor] = useState("");
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
      setSupervisor(editData.supervisor?._id || "");
      setCountry(editData.location?.country || "");
      setState(editData.location?.state || "");
      setCity(editData.location?.city || "");
    }
  }, [editData, isEditMode]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SERVER_URL}/api/department/getalldepartments`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setDepartments(res.data?.data || []));

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/employee/getallemployees`, {
        withCredentials: true,
      })
      .then((res) => {
        let allEmployees = res.data?.data?.employees || [];

        if (isEditMode && editData) {
          const alreadyIncluded = allEmployees.some(
            (emp) => emp._id === editData._id
          );
          if (!alreadyIncluded) allEmployees.push(editData);
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
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country: value }
      );
      setStates(res.data?.data?.states || []);
    } catch {
      setStates([]);
    }
  };

  const handleStateChange = async (value) => {
    setState(value);
    setCity("");
    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country, state: value }
      );
      setCities(res.data?.data || []);
    } catch {
      setCities([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !jobTitle || !department) {
      return alert("Please fill required fields.");
    }
    const cleanCity = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const payload = {
      name,
      email,
      jobTitle,
      department,
      supervisor: supervisor || null,
      location: {
        country,
        state,
        city: cleanCity,
      },
    };

    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/employee/updateemployee/${
            editData._id
          }`,
          payload,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/employee/createemployee`,
          payload,
          { withCredentials: true }
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      if (err?.response?.status === 409) {
        alert("Email already exists. Please use a different one.");
      } else {
        alert("Failed to save employee.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        {isEditMode ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Full Name *"
          className="border p-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email *"
          className="border p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Job Title *"
          className="border p-2 rounded-md"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded-md"
          required
        >
          <option value="">Select Department *</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <select
          value={supervisor}
          onChange={(e) => setSupervisor(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">No Supervisor</option>
          {supervisors.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        <select
          value={country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={state}
          onChange={(e) => handleStateChange(e.target.value)}
          className="border p-2 rounded-md"
          disabled={!states.length}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded-md"
          disabled={!cities.length}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
