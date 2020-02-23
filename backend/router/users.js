const user = require("../model/user");

async function getUsers(req, res, next) {
    // try{

    // }
}

async function createUsers(req, res, next) {
    const body = req.body;
    const newUser = new user({
        login: body.login,
        password: body.password ? body.password : "",
        username: body.username ? body.username : "No Name"
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