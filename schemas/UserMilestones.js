const { Schema, model } = require('mongoose');

const userMilestonesSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    milestoneOne: { //common fish
        type: String,
        default: "0-0", 
    },
    milestoneTwo: { //uncommon fish
        type: String,
        default: "0-0", 
    },
    milestoneThree: { //total fish
        type: String,
        default: "0-0", 
    },
    milestoneFour: { //rare fish
        type: String,
        default: "0-0", 
    },
    milestoneFive: { //epic fish
        type: String,
        default: "0-0", 
    },
    milestoneSix: { //legendary fish
        type: String,
        default: "0-0", 
    },
    milestoneSeven: { //exotic fish
        type: String,
        default: "0-0", 
    },

}); 

module.exports = model('UserMilestones', userMilestonesSchema);
