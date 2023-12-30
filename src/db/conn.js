import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// configuring the data for atlas db connection
const dbProtocol = process.env.DATABASE_PROTOCOL
const dbUsername = process.env.DATABASE_USERNAME
const dbPassword = process.env.DATABASE_PASSWORD
const dbPath = process.env.DATABASE_PATH
const dbName = process.env.DATABASE_NAME

// configure the url for db connection
const connectionUrl = `${dbProtocol}://${dbUsername}:${dbPassword}@${dbPath}/${dbName}`

// db connection function
mongoose.connect(connectionUrl).then(() => {
    console.log("mongodb database is connected")
}).catch((error) => {
    console.log("database is not connected")
    console.log(error);
})