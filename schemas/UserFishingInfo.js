const { Schema, model } = require('mongoose');

const fishingRodsSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    fishingRod: {
        //0 = old rod; 1x
        //1 = good rod; 1.1x
        //2 = great rod; 1.25x
        //3 = super rod; 1.35x
        //4 = ultra rod; 1.5x
        //5 = master rod; 1.75x
        //6 = champion's rod; 2x
        //7 = king's rod; 3x
        //8 = legend rod; 5x


        //9 = music's rod; 20x
        type: Number,
        default: 0, 
    },
    castNet: {
        type: Number,
        default: -1,
    }
}); 

module.exports = model('FishingRods', fishingRodsSchema);
