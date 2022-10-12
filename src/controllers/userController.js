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

exports.getPersonalInfo = async (req, res, next) => {
    const id = req.session.userId;
    let userInfo = await userService.findUserId(id);
    let filteredUserInfo = JSON.parse(JSON.stringify(userInfo));
    console.log(filteredUserInfo);
    delete filteredUserInfo.password;
    console.log(filteredUserInfo);
    delete filteredUserInfo.createdAt;
    console.log(filteredUserInfo);
    delete filteredUserInfo.updatedAt;
    console.log(filteredUserInfo);
    return res.status(200).send(filteredUserInfo);
}
