const { Schema, model } = require('mongoose');

const mysteryEggSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    hasEgg: {
        type: Number, //1 = yes, 0 = no.
        required: true,
        default: 0,
    },
    path: {
        type: Number,
        required: true,
        default: 0,
    },
    tracker: {
        type: Number,
        required: true,
        default: 0,
    }
}); 

module.exports = model('MysteryEgg', mysteryEggSchema);
