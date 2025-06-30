import { FaBuilding, FaUsersCog } from "react-icons/fa";

const Landing = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-3xl bg-white shadow-2xl rounded-3xl p-10 border border-blue-200">
        <div className="flex justify-center mb-6">
          <FaBuilding className="text-blue-600 text-6xl drop-shadow-md" />
        </div>
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to <span className="text-gray-800">OfficeFlow</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Seamlessly manage departments, employees, and office locations with a powerful admin system designed to simplify your workflow.
        </p>

        <div className="flex justify-center gap-5 flex-wrap">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl transition shadow-lg"
          >
            Get Started
          </a>
          <a
            href="#"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 text-lg rounded-xl transition shadow"
          >
            Learn More
          </a>
        </div>

        <div className="mt-10 text-sm text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <FaUsersCog className="text-blue-400" /> Admin Access Required for Features
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
