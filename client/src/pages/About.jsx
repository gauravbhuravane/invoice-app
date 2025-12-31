import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-indigo-50 via-white to-slate-100 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
            About InvoiceApp
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            InvoiceApp is a simple and user-friendly invoice management system
            designed to help users create professional invoices quickly and
            efficiently.
          </p>
        </motion.div>

        {/* Content Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              What We Do
            </h2>
            <p className="text-slate-600 mb-4">
              InvoiceApp helps businesses and individuals generate clean,
              well-structured invoices without the complexity of manual billing
              processes.
            </p>
            <p className="text-slate-600">
              The platform focuses on simplicity, accuracy, and ease of use,
              allowing users to concentrate on their business instead of
              paperwork.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              Why Choose InvoiceApp?
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Easy and fast invoice creation</li>
              <li>Clean and professional invoice layout</li>
              <li>Secure access to invoice features</li>
              <li>Designed for smooth user experience</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-20 text-sm text-slate-500"
        >
          InvoiceApp is built to simplify billing and improve productivity.
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
