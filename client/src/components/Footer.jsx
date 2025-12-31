import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-slate-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-slate-700 pb-6">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold text-white">
              InvoiceApp
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Simple Invoice Management System
            </p>
          </div>

          {/* Main Links */}
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            <button
              onClick={() => navigate("/about")}
              className="hover:text-white transition"
            >
              About InvoiceApp
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-white transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/invoice")}
              className="hover:text-white transition"
            >
              Create Invoice
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6 text-xs text-slate-400 mt-6">
          
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-white cursor-pointer transition">
              Terms & Conditions
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Cookie Policy
            </span>
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} InvoiceApp. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
