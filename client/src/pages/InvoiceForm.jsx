import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATES = [
  { name: "Andaman and Nicobar Islands", code: "35" },
  { name: "Andhra Pradesh", code: "37" },
  { name: "Arunachal Pradesh", code: "12" },
  { name: "Assam", code: "18" },
  { name: "Bihar", code: "10" },
  { name: "Chandigarh", code: "04" },
  { name: "Chhattisgarh", code: "22" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", code: "26" },
  { name: "Delhi", code: "07" },
  { name: "Goa", code: "30" },
  { name: "Gujarat", code: "24" },
  { name: "Haryana", code: "06" },
  { name: "Himachal Pradesh", code: "02" },
  { name: "Jammu and Kashmir", code: "01" },
  { name: "Jharkhand", code: "20" },
  { name: "Karnataka", code: "29" },
  { name: "Kerala", code: "32" },
  { name: "Ladakh", code: "38" },
  { name: "Lakshadweep", code: "31" },
  { name: "Madhya Pradesh", code: "23" },
  { name: "Maharashtra", code: "27" },
  { name: "Manipur", code: "14" },
  { name: "Meghalaya", code: "17" },
  { name: "Mizoram", code: "15" },
  { name: "Nagaland", code: "13" },
  { name: "Odisha", code: "21" },
  { name: "Puducherry", code: "34" },
  { name: "Punjab", code: "03" },
  { name: "Rajasthan", code: "08" },
  { name: "Sikkim", code: "11" },
  { name: "Tamil Nadu", code: "33" },
  { name: "Telangana", code: "36" },
  { name: "Tripura", code: "16" },
  { name: "Uttar Pradesh", code: "09" },
  { name: "Uttarakhand", code: "05" },
  { name: "West Bengal", code: "19" },
];

const InvoiceForm = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "",
    address: "",
    gst: "",
    state: "",
    stateCode: "",
  });

  const [client, setClient] = useState({
    name: "",
    address: "",
    gst: "",
  });

  const [items, setItems] = useState([
    { description: "", hsn: "", qty: 1, rate: 0 },
  ]);

  const [showStateSuggestions, setShowStateSuggestions] = useState(false);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", hsn: "", qty: 1, rate: 0 }]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company,
          client,
          items,
          invoiceNo: "INV-" + Date.now(),
          date: new Date().toLocaleDateString(),
          totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invoice creation failed");
        return;
      }

      navigate("/invoice/view", { state: data.invoice });
    } catch {
      alert("Server error while creating invoice");
    }
  };

  const filteredStates = STATES.filter((s) =>
    s.name.toLowerCase().startsWith(company.state.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-12 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-10"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Create Invoice
          </h2>
          <p className="text-gray-500 mt-2">
            Fill in the details to generate a professional invoice
          </p>
        </div>

        {/* Company Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Company Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Company Name"
              className="input"
              onChange={(e) =>
                setCompany({ ...company, name: e.target.value })
              }
            />

            <input
              placeholder="GST Number"
              className="input"
              onChange={(e) =>
                setCompany({ ...company, gst: e.target.value })
              }
            />

            {/* State with Suggestions */}
            <div className="relative">
              <input
                placeholder="State"
                value={company.state}
                className="input"
                onChange={(e) => {
                  setCompany({
                    ...company,
                    state: e.target.value,
                    stateCode: "",
                  });
                  setShowStateSuggestions(true);
                }}
                onBlur={() =>
                  setTimeout(() => setShowStateSuggestions(false), 150)
                }
              />

              {showStateSuggestions && company.state && (
                <div className="absolute z-10 bg-white border rounded-md w-full mt-1 max-h-40 overflow-auto shadow">
                  {filteredStates.map((state) => (
                    <div
                      key={state.code}
                      onClick={() =>
                        setCompany({
                          ...company,
                          state: state.name,
                          stateCode: state.code,
                        })
                      }
                      className="px-3 py-2 cursor-pointer hover:bg-indigo-50 text-sm"
                    >
                      {state.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              placeholder="State Code"
              value={company.stateCode}
              readOnly
              className="input bg-gray-100 cursor-not-allowed"
            />

            <textarea
              placeholder="Company Address"
              className="input md:col-span-2"
              rows={3}
              onChange={(e) =>
                setCompany({ ...company, address: e.target.value })
              }
            />
          </div>
        </section>

        {/* Client Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Bill To
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Client Name"
              className="input"
              onChange={(e) =>
                setClient({ ...client, name: e.target.value })
              }
            />

            <input
              placeholder="Client GSTIN"
              className="input"
              onChange={(e) =>
                setClient({ ...client, gst: e.target.value })
              }
            />

            <textarea
              placeholder="Client Address"
              className="input md:col-span-2"
              rows={3}
              onChange={(e) =>
                setClient({ ...client, address: e.target.value })
              }
            />
          </div>
        </section>

        {/* Items Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Invoice Items
          </h3>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-gray-50 p-4 rounded-lg border"
              >
                <input
                  placeholder="Description"
                  className="input md:col-span-2"
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
                <input
                  placeholder="HSN"
                  className="input"
                  onChange={(e) =>
                    handleItemChange(index, "hsn", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Qty"
                  className="input"
                  onChange={(e) =>
                    handleItemChange(index, "qty", Number(e.target.value))
                  }
                />
                <input
                  type="number"
                  placeholder="Rate"
                  className="input"
                  onChange={(e) =>
                    handleItemChange(index, "rate", Number(e.target.value))
                  }
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 text-indigo-600 font-medium hover:underline"
          >
            + Add another item
          </button>
        </section>

        {/* Total */}
        <div className="flex justify-end">
          <div className="bg-indigo-50 px-6 py-3 rounded-lg text-lg font-semibold text-indigo-700">
            Total Amount: ₹{totalAmount}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
          >
            Generate Invoice
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default InvoiceForm;
