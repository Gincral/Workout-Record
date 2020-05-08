const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    date: String,
    tasks_done: [{
        name: String,
        descriptions: String,
        groups: [{
            times: Number,
            weight: Number,
            unit: String,
            note: String,
        },],
    },],
    tasks_undone: [{
        name: String,
        descriptions: String,
        groups: [{
            times: Number,
            weight: Number,
            unit: String,
            note: String,
        },],
    },],
    photos: [ 
             Buffer,
            ],
});

const Record = mongoose.model("Records", recordSchema);

module.exports = Record;