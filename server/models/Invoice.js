import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    hsn: {
      type: String,
    },
    qty: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      name: String,
      address: String,
      gst: String,
      state: String,
      stateCode: String,
    },

    client: {
      name: String,
      address: String,
      gst: String,
    },

    items: [itemSchema],

    invoiceNo: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
