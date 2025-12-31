import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-24"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full"
        >
          Invoice Management Made Simple
        </motion.span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
          Simple & Professional <br className="hidden md:block" />
          Invoice Management System
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          Create professional invoices, manage billing information, and
          securely store invoice records with ease — all in one place.
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/invoice")}
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
        >
          Create Invoice
        </motion.button>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Fast Invoice Creation",
              desc: "Generate invoices in seconds with an easy-to-use interface.",
            },
            {
              title: "Secure & Reliable",
              desc: "JWT-based authentication ensures your data stays safe.",
            },
            {
              title: "Professional Design",
              desc: "Clean, GST-style invoice layout ready for real-world use.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
