const express = require("express");
const bodyParser = require("body-parser");
const task = require("./router/tasks");
const user = require("./router/users");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    // console.log(`Request to ${req.url}:`);
    // console.log(req);
    // console.log("Response:");
    // console.log(res);
    next();
});

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, (err) => {
    if (err) throw err;
    console.log("DB Connected Successfully");
});

app.listen(process.env.PORT || process.env.port || 5000, () => {
    console.log(`App listening on port ${process.env.PORT || 5000}.`);
});

app.post("/user", user.createUsers);
app.get("/user", user.getUsers);

app.post("/task", task.createTasks);
// app.put("/task", task.updateasks);
app.get("/task", task.getTasks);
app.delete("/task", task.deleteTasks);