const { Schema, model } = require('mongoose');

const fishFoundSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    common: {
        type: Number,
        default: 0,
    },
    uncommon: {
        type: Number,
        default: 0,
    },
    rare: {
        type: Number,
        default: 0,
    },
    epic: {
        type: Number,
        default: 0,
    },
    legendary: {
        type: Number,
        default: 0,
    },
    exotic: {
        type: Number,
        default: 0,
    },
    iceshards: {
        type: Number,
        default: 0,
    },
    windshards: {
        type: Number,
        default: 0,
    },
    fireshards: {
        type: Number,
        default: 0,
    },
    voidshards: {
        type: Number,
        default: 0,
    },
    koi: { //to be eligible to buy goodrod.
        type: Number,
        default: 0,
    },
    carasalmon: { //to be eligible to buy greatrod.
        type: Number,
        default: 0,
    },
    gengarfish: { //to be eligible to buy superrod.
        type: Number,
        default: 0,
    },
    weltfish: { //to be eligible to buy ultrarod.
        type: Number,
        default: 0,
    },
    lustzephyr: { //to be eligible to buy masterrod.
        type: Number,
        default: 0,
    },
    milotic: {
        type: Number,
        default: 0,
    }
}); 

module.exports = model('FishFound', fishFoundSchema);
