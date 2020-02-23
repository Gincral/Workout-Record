const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String, 
    description: String,
    groups: [String],
    user_id: String
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;