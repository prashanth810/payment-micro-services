import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },

    ammount: {
        type: Number,
        required: true,
    },

    currency: {
        type: String,
        default: "INR",
    },

    paymentMethod: {
        type: String,
        enum: ["ONLINE", "COD"],
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING",
    },

    razorpay_order_id: {
        type: String,
    },

    razorpay_payment_id: {
        type: String,
    },

    razorpay_signature: {
        type: String,
    },

    paymentDate: {
        type: Date,
    },

    isPaid: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true, minimize: false });

const PaymentModel = mongoose.model("Payment", PaymentSchema);

export default PaymentModel;