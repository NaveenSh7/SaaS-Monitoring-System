const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
require('dotenv').config();

// Replace these with your Razorpay Test Keys
const razorpay = new Razorpay({
  key_id: process.env.Key_Id,
  key_secret: process.env.Key_Secret,
});


router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error in order placing",err);
    res.status(500).json({ error: "Error in order placing" });
  }
});


module.exports = router;