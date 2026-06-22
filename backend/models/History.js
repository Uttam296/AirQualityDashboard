const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    city: {

        type: String,

        required: true

    },

    aqi: {

        type: Number,

        required: true

    },

    date: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(

    "History",

    historySchema

);