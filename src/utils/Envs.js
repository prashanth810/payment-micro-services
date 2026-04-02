import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

const Envs = {
    PORT: env.PORT || 2003,
    MONGO_URL: env.MONGO_URL,
}
export default Envs;