const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String, 
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;