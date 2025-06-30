import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaXTwitter,
  FaGlobe,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-700 py-4 mt-auto shadow-inner">
      <p className="mb-2">© {new Date().getFullYear()} OfficeFlow. All rights reserved.</p>
      <div className="flex flex-wrap justify-center gap-6 text-xl text-blue-700">
        <a
          href="https://github.com/SyedFaisal30"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-900 transition"
        >
          <FaGithub title="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/syedfaisal30"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-900 transition"
        >
          <FaLinkedin title="LinkedIn" />
        </a>
        <a
          href="mailto:sfarz172320@gmail.com"
          className="hover:text-blue-900 transition"
        >
          <FaEnvelope title="Email" />
        </a>
        <a
          href="https://wa.me/919892996342"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-900 transition"
        >
          <FaWhatsapp title="WhatsApp" />
        </a>
        <a
          href="https://x.com/syedfaisal30"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-900 transition"
        >
          <FaXTwitter title="X (Twitter)" />
        </a>
        <a
          href="https://syedfaisal30.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-900 transition"
        >
          <FaGlobe title="Portfolio" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
