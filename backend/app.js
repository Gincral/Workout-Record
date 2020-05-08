const task = require("./router/tasks");
const user = require("./router/users");
const login = require("./router/login");
const record = require("./router/records")

const multer = require("multer")
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => { next(); });

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/router/records_photos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage});

if (process.env.LOCAL === 'true') {
    mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, (err) => {
        if (err) throw err;
        console.log("Local DB Connected Successfully");
    });
} else {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}-zzir5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
        if (err) throw err;
        console.log("Cloud DB Connected Successfully");
    });
}

app.listen(process.env.PORT || process.env.port || 5000, () => {
    console.log(`App listening on port ${process.env.PORT || 5000}.`);
});

app.get("/health-check", login.healthCheck);
app.get("/login", login.userLogin);
app.get("/username", login.username);

app.get("/user", user.getUsers);
app.post("/user", user.createUsers);
app.get("/all-users", user.getAllUsers);

app.get("/task", task.getTasks);
app.post("/task", task.createTasks);
app.delete("/task", task.deleteTasks);

app.get("/record", record.getRecords);
app.post("/record", upload.array('photos', 3), record.createRecords);
app.delete("/record", record.deleteRecords);