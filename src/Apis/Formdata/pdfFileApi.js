import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express Router
const sendFileRouter = express.Router();

// Define a route for handling POST requests to "/v2/api/sendfile"
sendFileRouter.get("/v2/api/sendfile", (req, res) => {
    try {
        // Define the filename and file path
        const filename = "broucher.pdf";
        const filePath = path.join(__dirname, "../../assets", filename);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Set the appropriate content type for PDF
            res.setHeader("Content-Type", "application/pdf");

            // Send the file in the response
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } else {
            // Send a 404 status with a JSON response if the file is not found
            res.status(404).json({ error: "File not found" });
        }
    } catch (error) {
        // Log and send a 500 Internal Server Error response for any other errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//api for donwload pdf file 
sendFileRouter.get("/v2/api/downloadfile", (req, res) => {
    try {
        // Define the filename and file path
        const filename = "broucher.pdf";
        const filePath = path.join(__dirname, "../../assets", filename);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Set the appropriate content type and attachment header for download
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

            // Send the file in the response
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } else {
            // Send a 404 status with a JSON response if the file is not found
            res.status(404).json({ error: "File not found" });
        }
    } catch (error) {
        // Log and send a 500 Internal Server Error response for any other errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router
export default sendFileRouter;
