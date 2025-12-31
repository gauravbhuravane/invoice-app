import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const InvoiceView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">No invoice data found</p>
          <button
            onClick={() => navigate("/invoice")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Create Invoice
          </button>
        </div>
      </div>
    );
  }

  const {
    company,
    client,
    items,
    invoiceNo,
    date,
    totalAmount,
  } = location.state;

  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-100 py-10 px-4"
    >
      {/* Action Buttons */}
      <div className="max-w-5xl mx-auto flex justify-end mb-4 print:hidden">
        <button
          onClick={handleDownload}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-700 transition"
        >
          Download Invoice
        </button>
      </div>

      {/* Invoice */}
      <div
        id="invoice"
        className="max-w-5xl mx-auto bg-white border shadow-lg p-8"
      >
        {/* Header */}
        <div className="flex justify-between border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-indigo-700">
              {company.name}
            </h1>
            <p className="text-sm">{company.address}</p>
            <p className="text-sm">GSTIN: {company.gst}</p>
            <p className="text-sm">
              State: {company.state} | Code: {company.stateCode}
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-bold bg-indigo-600 text-white px-4 py-1 inline-block rounded">
              TAX INVOICE
            </h2>
            <p className="text-sm mt-2">Invoice No: {invoiceNo}</p>
            <p className="text-sm">Date: {date}</p>
          </div>
        </div>

        {/* Client */}
        <div className="border mb-6">
          <div className="bg-indigo-50 px-4 py-2 font-semibold">
            Bill To
          </div>
          <div className="px-4 py-3 text-sm">
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <p><strong>GSTIN:</strong> {client.gst}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-indigo-100 text-sm">
              <th className="border p-2">#</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2">HSN</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="text-sm">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 text-center">{item.hsn}</td>
                <td className="border p-2 text-center">{item.qty}</td>
                <td className="border p-2 text-right">₹{item.rate}</td>
                <td className="border p-2 text-right">
                  ₹{item.qty * item.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end">
          <div className="w-64 border">
            <div className="flex justify-between px-4 py-2 bg-indigo-600 text-white font-semibold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-8">
          This is a computer-generated invoice. No signature required.
        </div>
      </div>

      {/* Print styles */}
      <style>
        {`
          @media print {
            body {
              background: white;
            }
            .print\\:hidden {
              display: none;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default InvoiceView;
