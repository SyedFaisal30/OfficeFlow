import { FaBuilding, FaUsersCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-10 border border-blue-200">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaBuilding className="text-blue-600 text-6xl drop-shadow-md" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to <span className="text-gray-800">OfficeFlow</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed">
          Seamlessly manage departments, employees, and office locations with a powerful admin system built to streamline your workflow.
        </p>

        <div className="flex justify-center">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl transition-all duration-200 shadow-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Footer Text */}
        <div className="mt-10 text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <FaUsersCog className="text-blue-400" />
            Admin Access Required to Manage Data
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
