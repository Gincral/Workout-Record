const task = require("../model/task");
const group = require("../model/group");

function getTasks(req, res, next) {
    console.log("haha");
}

function createTasks(req, res, next) {
    // const body = req.body;
    // const newFav = new Favourite({
    //     upn: body.upn ? body.upn : "",
    //     name: body.name ? body.name : "",
    //     query: body.query ? body.query : ""
    // });
    // try {
    //     const savedFavourite = await newFav.save();
    //     res.json(savedFavourite);
    // } catch (err) {
    //     res.json({ message: err });
    // }
}

function updateTasks(req, res, next) {
}

function deleteTasks(req, res, next) {
}

module.exports = {
    getTasks,
    createTasks,
    updateTasks,
    deleteTasks,
};