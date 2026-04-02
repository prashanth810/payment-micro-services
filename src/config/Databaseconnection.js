import mongoose from 'mongoose';
import Envs from '../utils/Envs.js';

const mongo_url = Envs.MONGO_URL;

const Databaseconnection = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.info("PAYMENT DATABASE connected success 💸 💸 💸 💸 💸");
    }
    catch (error) {
        console.error("Failed to connect db ❌ ❌ ❌ ❌ ❌");
    }
}

export default Databaseconnection;