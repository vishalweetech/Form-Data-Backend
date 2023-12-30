import mongoose from "mongoose";

const RobodataSchema = mongoose.Schema({

    Robodataid: {
        type: String,
    },

    name: {
        type: String
    },

    mobile: {
        type: String
    },

    email: {
        type: String
    },


    last_education: {
        type: String
    },

    degree_name: {
        type: String
    },

    field: {
        type: String
    },

    code: {
        type: String
    },

    is_valid: {
        type: String,
        default: true
    },

    createdAt: {
        type: Number,
        default: new Date()
    },

    updatedAt: {
        type: Number
    }

})

const RoboDataCollection = new mongoose.model("Robotics", RobodataSchema)

export default RoboDataCollection