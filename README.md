<p align="left" style="display: flex; align-items: center; gap: 20px;">
  <img src="frontend/src/assets/logo.png" alt="OfficeFlow Logo" width="120" />
  <span style="font-size: 2.2rem; font-weight: bold;">OfficeFlow – Office Management System</span>
</p>


OfficeFlow is a full-stack Office Management System built using **Node.js**, **Express**, and **MongoDB**, with a **React + Tailwind CSS** frontend. It enables CRUD operations for **Departments** and **Employees**, supports **pagination**, **search**, and **filtering**, integrates a **Country/State/City API**, and features **JWT-based Admin Login**.

## 🌟 Features

- 🔐 Admin-only access with JWT Auth
- 🏢 Department CRUD
- 👤 Employee CRUD with:
  - Department selection
  - Supervisor assignment (self-reference)
  - Country/State/City selection via dynamic external API
- 🔍 Employee listing with:
  - Pagination
  - Search (by name/email)
  - Filter (by department and job title)
- 🌍 Location dropdowns via CountriesNow API
- ⚛️ Modern responsive frontend using React + Tailwind CSS

---

## 🔑 Admin Login

Use the following credentials to log in:

Email: faisal@gmail.com
Password: faisal23


---

## 🛠️ Tech Stack

| Layer         | Tech                             |
|--------------|----------------------------------|
| Frontend      | React, Tailwind CSS              |
| Backend       | Node.js, Express.js              |
| Database      | MongoDB with Mongoose            |
| Auth          | JWT-based authentication         |
| API           | CountriesNow API (Location data) |
| View Rendering| React Components (no EJS)        |

---

## 🚀 Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/officeflow.git
   cd officeflow
Backend Setup:

cd backend

npm install
npm run dev


Frontend Setup:

cd frontend

npm install
npm start
Environment Variables:

Create .env in /backend:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
📬 API Endpoints
🔐 Auth
POST /api/admin/login → Admin login (returns JWT)

🏢 Department
GET /api/departments

POST /api/departments

PUT /api/departments/:id

DELETE /api/departments/:id

👤 Employee
GET /api/employees?page=1&limit=10&search=John&department=IT&jobTitle=Manager

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id

🌍 External API (CountriesNow)
Integrated with: https://countriesnow.space/api/v0.1/countries/

Used to dynamically fetch:

Countries

States based on Country

Cities based on State

📮 Postman Collection
Postman collection for all APIs is included in the /postman folder or Download Here (add link after uploading)

📸 Screenshots
(Add screenshots of Dashboard, Employee Form, Filters, etc.)


🧑‍💻 Author
Syed Faisal Abdul Rahman Zulfequar


📜 License
MIT License
