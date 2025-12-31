import express from "express";
import Invoice from "../models/Invoice.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/invoices
 * @desc    Create a new invoice (Protected)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      company,
      client,
      items,
      invoiceNo,
      date,
      totalAmount,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Invoice items required" });
    }

    const invoice = new Invoice({
      userId: req.userId,
      company,
      client,
      items,
      invoiceNo,
      date,
      totalAmount,
    });

    await invoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    console.error("CREATE INVOICE ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/invoices
 * @desc    Get logged-in user's invoices (Protected)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    console.error("GET INVOICES ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
