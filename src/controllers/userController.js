const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
    return res.status(200).send(await userService.getAllUsers());
}
