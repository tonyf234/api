const userService = require('./userService');

exports.signupEmail = (lastname, firstname, email, password, extra) => {
    userService.createUser(lastname, firstname, email, extra.phone, password);
}

exports.signupPhone = (lastname, firstname, phone, password, extra) => {
    userService.createUser(lastname, firstname, extra.email, phone, password);
}

exports.signinEmail = (email, password) => {
    //TODO
};

exports.signinPhone = (phone, password) => {
    //TODO
};
