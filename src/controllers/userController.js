const userService = require('../services/userService');

exports.getAllUsers = (req, res, next) => {
    return res.status(200).send(userService.getAllUsers());
}
