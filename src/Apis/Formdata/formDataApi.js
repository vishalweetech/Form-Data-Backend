import express from "express"
import uuid4 from "uuid4";
import nodemailer from "nodemailer"
import ItDataCollection from "../../Models/FormData/ItDataModel.js"
import RoboDataCollection from "../../Models/FormData/RoboDataModel.js"


// Configure the router
const formDataRouter = express.Router()

// Regular expression for basic email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// api for add formdata data in database collection router
formDataRouter.post("/v2/api/formdata", async (req, res) => {
    try {
        // Extract fields from req.body
        const name = req.body.name
        const mobile = req.body.mobile
        const email = req.body.email
        const last_education = req.body.last_education
        const degree_name = req.body.degree_name
        const field = req.body.field

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(401).send({
                status: "failed",
                error: "Invalid email format",
            });
        }

        let newData;

        //check if user enter field is "IT"
        if (field === "IT") {

            const sixWordCode = Math.random().toString(36).substring(2, 8);

            // Verify email and phone number existence
            const emailExists = await existsInAnyCollection(
                [ItDataCollection],
                "email",
                email
            );

            const phoneExists = await existsInAnyCollection(
                [ItDataCollection],
                "mobile",
                mobile
            );

            if (emailExists) {
                return res.status(400).send({ error: 'Email is already added' });
            }

            if (phoneExists) {
                return res.status(400).send({ error: 'Phone number is already added' });
            }

            // If the field is "IT", save data in the ItDataCollection
            newData = new ItDataCollection({
                Itdataid: uuid4(),
                name,
                mobile,
                email,
                last_education,
                degree_name,
                field,
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

            //check if user enter field is "Robotics"
        } else if (field === "Robotics") {


            const sixWordCode = Math.random().toString(36).substring(2, 8);

            // Verify email and phone number existence
            const emailExists = await existsInAnyCollection(
                [RoboDataCollection],
                "email",
                email
            );

            const phoneExists = await existsInAnyCollection(
                [RoboDataCollection],
                "mobile",
                mobile
            );

            if (emailExists) {
                return res.status(400).send({ error: 'Email is already added' });
            }

            if (phoneExists) {
                return res.status(400).send({ error: 'Phone number is already added' });
            }

            // If the field is "robotics", save data in the RoboDataCollection
            newData = new RoboDataCollection({
                Robodataid: uuid4(),
                name,
                mobile,
                email,
                last_education,
                degree_name,
                field,
                code: sixWordCode,
                createdAt: Date.now(),
            });


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

            // Save the new document to the corresponding collection
            const savedData = await newData.save();

            // Respond with the saved document
            res.status(201).json({ message: "success", data: savedData, code: sixWordCode });

        } else {
            // Handle other values of field as needed
            res.status(400).json({ error: "Invalid value for 'field'" });
            return;
        }


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

export default formDataRouter