const { Schema, model } = require('mongoose');

const userHazmatInfoSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    helmet: {
        type: Number,
        default: 0,
    },
    chestplate: {
        type: Number,
        default: 0,
    },
    legs: {
        type: Number,
        default: 0,
    },
    boots: {
        type: Number,
        default: 0,
    },
    oxygentank: {
        type: Number,
        default: 0,
    },
    oxygencellValue: {
        type: Number,
        default: 0,
    },
}); 

module.exports = model('UserHazmatInfo', userHazmatInfoSchema);
