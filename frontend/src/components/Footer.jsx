import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-700 py-4 mt-auto shadow-inner">
      <p className="mb-2">© {new Date().getFullYear()} OfficeFlow. All rights reserved.</p>
      <div className="flex justify-center gap-6 text-xl">
        <a
          href="https://github.com/SyedFaisal30"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <FaGithub title="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/syedfaisal30"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700"
        >
          <FaLinkedin title="LinkedIn" />
        </a>
        <a
          href="mailto:sfarz172320@gmail.com"
          className="hover:text-red-500"
        >
          <FaEnvelope title="Email" />
        </a>
        <a
          href="https://wa.me/919892996342"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-600"
        >
          <FaWhatsapp title="WhatsApp" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
