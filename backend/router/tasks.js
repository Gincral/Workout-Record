const task = require("../model/task");

async function getTasks(req, res, next) {
    const params = req.query;
    try {
        let getTasks = await task.find({ user_id: params._id });
        res.json(getTasks);
    } catch (err) {
        res.json({ message: err });
    }
}

async function createTasks(req, res, next) {
    const params = req.query;
    const body = req.body;
    if (!params._id) {
        const newTask = new task({
            name: body.name,
            description: body.description,
            groups: body.groups,
            user_id: body.user_id,
        });
        try {
            const task = await newTask.save();
            res.json(task);
        } catch (err) {
            res.json({ message: err });
        }
    }else{
        try {
            const updatedTask = await task.updateOne(
                { _id: params._id },
                { name: body.name, description: body.description, groups: body.groups }
            );
            res.json(updatedTask);
        } catch (err) {
            res.json({ message: err });
        }
    }
}

async function deleteTasks(req, res, next) {
    const params = req.query;
    try {
        const selectTask = await task.deleteOne({
            _id: params._id
        });
        res.json(selectTask);
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {
    getTasks,
    createTasks,
    deleteTasks,
};