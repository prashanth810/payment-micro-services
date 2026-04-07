import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

const Envs = {
    PORT: env.PORT || 2003,
    MONGO_URL: env.MONGO_URL,

    // secret jwt token
    JWT_SECRET: env.JWT_SECRET,

    // payment method 
    RAZORPAY_KEY: env.RAZORPAY_KEY,
    RAZORPAY_SECRET_KEY: env.RAZORPAY_SECRET_KEY,
    RAZORPAY_WEBHOOK_SECRET: env.RAZORPAY_WEBHOOK_SECRET,
}
export default Envs;