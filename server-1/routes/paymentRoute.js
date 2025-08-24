const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require('../db');
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

// Verify payment and upadate user as pro
router.post("/verify", async (req, res) => {
  try {
    const { order_id, payment_id, signature , user_email} = req.body;

    // verify signature (important for security)
    const body = order_id + "|" + payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.Key_Secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    //updating user
   const updateUser = await db.query(
      "UPDATE users SET plan = $1 WHERE email = $2",
  ["pro", user_email]
    );

    if (updateUser.rowCount === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User upgraded to premium"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;