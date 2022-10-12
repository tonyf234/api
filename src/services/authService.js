const bcrypt = require('bcryptjs');

const userService = require('./userService');

exports.signupEmail = (lastname, firstname, email, password, extra) => {
    // TODO : send a validation code to the user email
    return userService.createUser(lastname, firstname, email, extra.phone, password, extra);
}

exports.signupPhone = (lastname, firstname, phone, password, extra) => {
    // TODO : send a validation code to the user phone
    return userService.createUser(lastname, firstname, extra.email, phone, password, extra);
}

exports.signinEmail = async (email, password) => {
    const user = await userService.findUserEmail(email);
    if (!user)
        return false;

    const matchingPassword = await bcrypt.compare(password, user.password);

    if (matchingPassword) {
        return user.id;
    }

    return 0;
};

exports.signinPhone = async (phone, password) => {
    const user = await userService.findUserPhone(phone);
    if (!user)
        return false;

    const matchingPassword = await bcrypt.compare(password, user.password);

    if (matchingPassword) {
        return user.id;
    }
    return 0;
};
