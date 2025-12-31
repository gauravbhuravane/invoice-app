import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Existing logic (unchanged)
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleInvoiceClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/invoice");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
            I
          </div>
          <span className="text-xl font-bold text-gray-800">
            InvoiceApp
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <button
            onClick={handleInvoiceClick}
            className={`text-sm font-medium transition ${
              isActive("/invoice")
                ? "text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            Invoice
          </button>

          <button
            onClick={() => navigate("/about")}
            className={`text-sm font-medium transition ${
              isActive("/about")
                ? "text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            About
          </button>

          {!isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition"
            >
              Login
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-600 transition"
            >
              Logout
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
