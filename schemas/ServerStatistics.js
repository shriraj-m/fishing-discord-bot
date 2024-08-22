const { Schema, model } = require('mongoose');

const serverStatsSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    overallMoneyGain: {
        type: Number,
        default: 0,
    },
    overallMoneyLoss: {
        type: Number,
        default: 0,
    },
    overallWins: {
        type: Number,
        default: 0,
    },
    overallLoss: {
        type: Number,
        default: 0,
    },
    headsLanded: {
        type: Number,
        default: 0,
    },
    tailsLanded: {
        type: Number,
        default: 0,
    },
}); 

module.exports = model('ServerStatistics', serverStatsSchema);
