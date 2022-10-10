const User = require('../entities/userEntity');

exports.getAllUsers = () => {
    return User.findAll();
}

exports.findUser = (id) => {

    if (typeof id !== 'number')
        throw new TypeError('the id must be a number');

    return User.findOne({ where: { id }})
}

exports.createUser = async (lastname, firstname, email, phone, password) => {
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

    // check if email or phone number already used

    const already_used = {};
    if (email) {
        const testEmail = await User.findAll({ where: { email }});
        console.log('testEmail', testEmail);
        if (testEmail.length)
            throw new Error('email already used');
    }

    if (phone) {
        const testPhone = await User.findAll({ where: { phone }});
        console.log('testPhone', testPhone);
        if (testPhone.length)
            throw new Error('email already used');
    }

    const user = await User.create({firstname: firstname, lastname: lastname, email: email, phone: phone, password: password});
    return user.save();
}


exports.deleteUser = (id) => {
    if (!id || typeof id !== 'number')
        throw new TypeError('the id must be a number');
    const user = findUser(id)
    if (!user)
    {
        throw new TypeError('User not found')
    }
    return user.destroy();
}
