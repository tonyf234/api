const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
    return res.status(200).send(await userService.getAllUsers());
}

exports.getConnected = async (req, res, next) => {

    let count = 0;
    try {
        count = await userService.getSessionCount();
    } catch (e) {
        console.log(e);
    }

    if (!count)
        return res.status(200).send('Nobody connected');
    return res.status(200).send(`${count} people are connected`);
};
