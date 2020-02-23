const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    frequency: Number,
    weight: Number,
    unit: String,
    note: String
});

const Group = mongoose.model("Groups", groupSchema);

module.exports = Group;