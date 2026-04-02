import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import Envs from "./utils/Envs.js";
import Databaseconnection from "./config/Databaseconnection.js";

const app = express();

const PORT = Envs.PORT || 2003;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors());
app.use(morgan('dev'));


// data base conncetion 
Databaseconnection().then((result) => {
    app.listen(PORT, () => {
        console.info("PAYMENT Server runnning sccesss 💸 💸 💸 💸 💸 💸");
    })
}).catch((err) => {
    console.err("Failed to running server ❌ ❌ ❌ ❌ ❌");
});
