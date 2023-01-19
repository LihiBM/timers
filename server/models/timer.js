const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Timer = new Schema(
    {
        runAtTime: { type: Number, required: true },
        url: { type: String, required: true },
        timeOfCompletion: {type: Number, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('timer', Timer);