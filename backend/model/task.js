const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    groups: [{
        times: Number,
        weight: Number,
        unit: String,
        note: String,
    },],
    user_id: String,
    days: [ Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean ],
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;