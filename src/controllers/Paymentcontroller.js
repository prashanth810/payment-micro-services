import crypto from "crypto";
import PaymentModel from "../models/Paymentmodel.js";

// ─── CREATE PAYMENT (for both COD & ONLINE) ─────────────────────
export const createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount, razorpayOrderId } = req.body;
        const userId = req?.user?.id;

        const payment = await PaymentModel.create({
            userId,
            orderId,
            ammount: amount,
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "PENDING" : "SUCCESS",
            razorpay_order_id: razorpayOrderId || null,
        });

        res.status(201).json({
            success: true,
            message: "Payment created",
            payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ─── VERIFY RAZORPAY PAYMENT ───────────────────────────────────
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        // ✅ Update payment
        const payment = await PaymentModel.findOneAndUpdate(
            { orderId },
            {
                razorpay_payment_id,
                razorpay_signature,
                paymentStatus: "SUCCESS",
                isPaid: true,
                paymentDate: new Date()
            },
            { new: true }
        );

        // ✅ Update order also
        // await OrderModel.findByIdAndUpdate(orderId, {
        //     paymentStatus: "SUCCESS"
        // });

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ─── COD PAYMENT SUCCESS (after delivery) ───────────────────────
export const markCODPaid = async (req, res) => {
    try {
        const { orderId } = req.params;

        const payment = await PaymentModel.findOneAndUpdate(
            { orderId },
            {
                paymentStatus: "SUCCESS",
                isPaid: true,
                paymentDate: new Date()
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "COD marked as paid",
            payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};