import express from "express";
import dotenv from 'dotenv';
import cors from "cors"
import formDataRouter from "./Apis/Formdata/formDataApi.js";
import ImmiDataRouter from "./Apis/Formdata/immigrationDataApi.js";
import sendFileRouter from "./Apis/Formdata/pdfFileApi.js";

// Configuration of .env file
dotenv.config();

// Configuration server express
const app = express();

app.use(cors({
    origin: '*' ,
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

app.use(express.json());

// API middleware for adding formDataRouter
app.use(formDataRouter);

//Api middleware for add FormDataRouter
app.use(ImmiDataRouter)

//api middleware for send Pdf file Router
app.use(sendFileRouter)

// Server port listener
app.listen(process.env.SERVER_PORT, "0.0.0.0", () => {
    console.log("Server is running");
});
