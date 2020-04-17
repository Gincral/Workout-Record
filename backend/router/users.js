const user = require("../model/user");

async function getUsers(req, res, next) {
    console.log("/get user");
    const params = req.query;
    try {
        const foundUser = await user.find({ _id: params._id });
        res.json(foundUser);
    } catch (err) {
        res.json({ message: err });
    }
}

async function createUsers(req, res, next) {
    console.log("/create user");
    const body = req.body;
    const newUser = new user({
        login: body.login,
        username: body.username ? body.username : "No Name",
        password: body.password ? body.password : "",
    });
    try {
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {
    getUsers,
    createUsers,
};