const { Schema, model } = require('mongoose');

const fishBattleStatsSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    wins: {
        type: Number,
        default: 0,
    },
    losses: {
        type: Number,
        default: 0,
    },
    startedFB: {
        type: Number,
        default: 0,
    },
    inFB: {
        type: Number,
        default: 0,
    },

}); 

module.exports = model('FishBattleStats', fishBattleStatsSchema);
