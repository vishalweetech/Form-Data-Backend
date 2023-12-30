import express from "express"
import uuid4 from "uuid4";
import nodemailer from "nodemailer"
import ImmigraDataCollection from "../../Models/FormData/ImmigrationDataModel.js";


// Configure the router
const ImmiDataRouter = express.Router()

// Regular expression for basic email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// api for add formdata data in database collection router
ImmiDataRouter.post("/v2/api/immigration", async (req, res) => {
    try {
        // Extract fields from req.body
        const name = req.body.name
        const mobile = req.body.mobile
        const email = req.body.email
        const country = req.body.country
        const last_education = req.body.last_education
        const profeciency = req.body.profeciency


        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(401).send({
                status: "failed",
                error: "Invalid email format",
            });
        }

        // Verify email and phone number existence
        const emailExists = await existsInAnyCollection(
            [ImmigraDataCollection],
            "email",
            email
        );

        const phoneExists = await existsInAnyCollection(
            [ImmigraDataCollection],
            "mobile",
            mobile
        );

        if (emailExists) {
            return res.status(400).send({ error: 'Email is already added' });
        }

        if (phoneExists) {
            return res.status(400).send({ error: 'Phone number is already added' });
        }

        const sixWordCode = Math.random().toString(36).substring(2, 8);


        const newData = new ImmigraDataCollection({
            Immidataid: uuid4(),
            name,
            mobile,
            email,
            last_education,
            profeciency,
            country,
            code: sixWordCode,
            createdAt: Date.now(),
        });


        // Save the new document to the corresponding collection
        const savedData = await newData.save();

         // Configure nodemailer with your email service provider's details
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'jalondhravishal@gmail.com',
                pass: 'kcnutlrdlznjyyib'
            },
            secure: false
        });

        const mailOptions = {
            from: "jalondhravishal@gmail.com",
            to: email,
            subject: "Claiming Code",
            text: `Code for claiming offer at weetech institute pvt ltd for IT training course and Save this code : ${sixWordCode}`,
        };

        // Send verification email
        await transporter.sendMail(mailOptions);

        // Respond with the saved document
        res.status(201).json({ message: "success", data: savedData, code: sixWordCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Helper function to check if a value exists in any collection
async function existsInAnyCollection(collections, field, value) {
    for (const collection of collections) {
        const existingRecord = await collection.findOne({ [field]: value });
        if (existingRecord) {
            return true;
        }
    }
    return false;
}

export default ImmiDataRouter