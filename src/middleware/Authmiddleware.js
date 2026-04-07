import jwt from "jsonwebtoken";
import Envs from "../utils/Envs.js";


const Authmiddleware = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided !!!" });
        }

        const decode = await jwt.verify(token, Envs.JWT_SECRET);

        if (!decode) {
            return res.status(404).json({ success: false, message: "No user found !!!" });
        }

        const user = decode;

        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default Authmiddleware;