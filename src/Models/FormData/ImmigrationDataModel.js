import mongoose from "mongoose";

const ImmidataSchema = mongoose.Schema({

    Immidataid: {
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

    country: {
        type: String
    },

    last_education: {
        type: String
    },

    profeciency: {
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

const ImmigraDataCollection = new mongoose.model("Immigration", ImmidataSchema)

export default ImmigraDataCollection