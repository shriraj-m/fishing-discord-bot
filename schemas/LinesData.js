const { Schema, model } = require('mongoose');

const linesDataSchema = new Schema({
    lineName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    creationId: {
        type: Number,
        default: 0,
    },
    realId: {
        type: Number,
        required: true,
        default: 0,
    },
    descript: {
        type: String,
    },
    lineNumber: {
        type: Number,
        default: 0,
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

module.exports = model('LinesData', linesDataSchema);
