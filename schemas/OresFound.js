const { Schema, model } = require('mongoose');

const oresFoundSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    coal: {
        type: Number,
        default: 0,
    },
    iron: {
        type: Number,
        default: 0,
    },
    gold: {
        type: Number,
        default: 0,
    },
    diamond: {
        type: Number,
        default: 0,
    },
    emerald: {
        type: Number,
        default: 0,
    },
    mithril: {
        type: Number,
        default: 0,
    },
    titanium: {
        type: Number,
        default: 0,
    },
}); 

module.exports = model('OresFound', oresFoundSchema);
