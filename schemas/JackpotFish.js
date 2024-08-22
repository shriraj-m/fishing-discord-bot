const { Schema, model } = require('mongoose');

const jackpotFishSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        default: 1001.1,
        required: true,
    },
    nextCatch:{
        type: Number,
        default: 0,
        required: true,
    },
}); 

module.exports = model('JackpotFish', jackpotFishSchema);
