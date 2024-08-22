const { Schema, model } = require('mongoose');

const userArtifactSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    pokerChip: {
        type: String,
        default: "0-0",
    },
    musicNote: {
        type: String,
        default: "0-0",
    },
    sapphireGem: {
        type: String,
        default: "0-0",
    },
    shinyHook: {
        type: String,
        default: "0-0",
    },
    wyrm: {
        type: String,
        default: "0-0",
    },
    wyvern: {
        type: String,
        default: "0-0",
    },
    dragon: {
        type: String,
        default: "0-0",
    },
    s1p1: {
        type: String,
        default: "0-0",
    },
    s1p2: {
        type: String,
        default: "0-0",
    },
    s1p3: {
        type: String,
        default: "0-0",
    },
    s1p4: {
        type: String,
        default: "0-0",
    },
    s1p5: {
        type: String,
        default: "0-0",
    },
    // : {
    //     type: String,
    //     default: "0-0",
    // },
}); 

module.exports = model('UserArtifacts', userArtifactSchema);
