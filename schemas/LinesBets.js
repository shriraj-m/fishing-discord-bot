const { Schema, model } = require('mongoose');

const linesBetsSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    lineName: {
        type: String,
        required: true,
    },
    betPlaced: {
        type: Boolean,
        required: true,
        default: false,
    },
    over: {
        type: Number,
        default: 0,
    },
    under: {
        type: Number,
        default: 0,
    },
}); 

module.exports = model('LinesBets', linesBetsSchema);
