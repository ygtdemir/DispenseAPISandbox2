const mongoose = require('mongoose')

const dispenseSchema = mongoose.Schema(
    {
        DATE: {
            type: String,
            required: [true, "Please provide dispense date"]
        },
        INDOSE: {
            type: Number,
            required: true,
        },
        ACTDOSE: {
            type: Number,
            required: true,
        },
        PATID: {
            type: String,
            required: [true, "Please provide patient id"]
        },
        CLNID: {
            type: String,
            required: [true, "Please provide clinician id"]
        },
        GPSLAT: {
            type: Number,
            required: true,
        },
        GPSLNG: {
            type: Number,
            required: true,
        },
        DEVID: {
            type: String,
            required: [true, "Please provide device id"]
        },
        CRTID: {
            type: String,
            required: true,
        },
        DEVST: {
            type: Number,
            required: false,
        },
        BATLVL: {
            type: Number,
            required: true,
        },
        CRTST: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

const Dispense = mongoose.model('Dispense', dispenseSchema);

module.exports = Dispense;