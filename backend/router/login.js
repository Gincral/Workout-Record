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

module.exports = {
    userLogin,
};