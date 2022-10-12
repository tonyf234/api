const bcrypt = require('bcryptjs');

const User = require('../entities/userEntity');

exports.getAllUsers = () => {
    return User.findAll();
}

exports.findUserId = (id) => {

    if (typeof id !== 'number')
        throw new TypeError('the id must be a number');

    return User.findOne({ where: { id }})
}

exports.findUserEmail = (email) => {

    if (typeof email !== 'string')
        throw new TypeError('the email must be a string');

    return User.findOne({ where: { email }})
}

exports.findUserPhone = (phone) => {
    if (typeof phone !== 'string')
        throw new TypeError('the phone number must be a string');

    return User.findOne({ where: { phone }});
}

exports.createUser = async (lastname, firstname, email, phone, password, extra) => {

    if (typeof extra === 'undefined')
        extra = {};

    if (!firstname || typeof firstname !== 'string')
        throw new TypeError('the firstname must be a string');
    if (!lastname || typeof lastname !== 'string')
        throw new TypeError('the lastname must be a string');
    if (email && typeof email !== 'string')
        throw new TypeError('the email must be a string');
    if (phone && typeof phone !== 'string')
        throw new TypeError('the phone number must be a string');
    if (!password || typeof password !== 'string')
        throw new TypeError('the password must be a string');
    if (!email && !phone)
        throw new Error('must have a email and/or a phone number');
    if (extra.birthdate && typeof extra.birthdate !== 'string')
        throw new Error('the birthdate must be a string');

    if (email) {
        const testEmail = await User.findAll({ where: { email }});
        if (testEmail.length)
            throw new Error('email already used');
    }

    if (phone) {
        const testPhone = await User.findAll({ where: { phone }});
        if (testPhone.length)
            throw new Error('phone number already used');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({firstname: firstname, lastname: lastname, email: email, phone: phone, password: hashedPassword, birthdate: extra.birthdate });
        await user.save();

        return true;

    } catch (e) {
        console.log(e);
    }

    return false;
}


exports.deleteUser = (id) => {
    if (!id || typeof id !== 'number')
        throw new TypeError('the id must be a number');

    const user = this.findUserId(id)
    if (!user)
    {
        throw new TypeError('User not found')
    }

    return user.destroy();
}
