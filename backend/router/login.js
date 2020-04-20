const user = require("../model/user");

async function userLogin(req, res, next) {
    console.log("/login");
    const params = req.query;
    try {
        let foundUser;
        foundUser = await user.find({ login: params.login, password: params.password });
        res.json(foundUser[0]._id);
    } catch (err) {
        res.json("error");
    }
}

async function username(req, res, next) {
    console.log("/username");
    const params = req.query;
    try {
        let foundUser;
        foundUser = await user.find ({ _id: params._id });
        res.json(foundUser[0].username);
    } catch (err) {
        res.json("error");
    }
}

async function healthCheck(req, res, next) {
    console.log("/Check");
    try {
        res.json("Healthy AF :3");
    } catch (err) {
        res.json("error");
    }
}

module.exports = {
    userLogin,
    healthCheck,
    username,
};