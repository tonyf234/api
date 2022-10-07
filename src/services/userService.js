const User = require('../entities/userEntity');

exports.getAllUsers = () => {
    return User.findAll();
}

exports.findUser = (id) => {

    if (typeof id !== 'number')
        throw new TypeError('the id must be a number');

    return User.findOne({ where: { id }})
}

exports.createUser = ({lastname, firstname, email, password}) => {
    if (typeof firstname !== 'string')
        throw new TypeError('the firstname must be a string');
    if (typeof lastname !== 'string')
        throw new TypeError('the lastname must be a string');
    if (typeof email !== 'string')
        throw new TypeError('the email must be a string');
    if (typeof password !== 'string')
        throw new TypeError('the password must be a string');
    const user = User.create({firstname: firstname, lastname: lastname, email: email, password: password});
    return user.save();
    }


exports.deleteUser = (id) => {
    if (typeof id !== 'number')
        throw new TypeError('the id must be a number');
    const user = findUser(id)
    if (!user)
    {
        throw new TypeError('User not found')
    }
    return user.destroy();
}
