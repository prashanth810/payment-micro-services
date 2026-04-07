import express from "express";
import { createPayment, verifyPayment, markCODPaid } from "../controllers/Paymentcontroller.js";
import Authmiddleware from "../middleware/Authmiddleware.js";



const Paymentroute = express.Router();

// Create payment (COD / ONLINE)
Paymentroute.post("/create", Authmiddleware, createPayment);

// Verify Razorpay payment
Paymentroute.post("/verify", Authmiddleware, verifyPayment);

// COD success (admin or delivery)
Paymentroute.patch("/cod/:orderId", Authmiddleware, markCODPaid);

Paymentroute.get("/", (req, res) => {
    return res.status(200).json({ message: "get from payment routes " })
})

export default Paymentroute;