const bcrypt = require('bcryptjs');

const userService = require('./userService');

exports.signupEmail = (lastname, firstname, email, password, extra) => {
    return userService.createUser(lastname, firstname, email, extra.phone, password);
}

exports.signupPhone = (lastname, firstname, phone, password, extra) => {
    return userService.createUser(lastname, firstname, extra.email, phone, password);
}

exports.signinEmail = async (email, password) => {
    //TODO
    const user = await userService.findUserEmail(email);
    if (!user)
        return false;

    const matchingPassword = bcrypt.compare(password, user.password);

    return matchingPassword;
};

exports.signinPhone = (phone, password) => {
    //TODO
    return true;
};
