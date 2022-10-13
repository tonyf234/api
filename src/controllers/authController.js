const authService = require('../services/authService');

const signupPhone = (body) => {
    const lastname = body.lastname;
    const firstname = body.firstname;
    const phone = body.phone;
    const email = body.email;
    const password = body.password;
    const birthdate = body.birthdate;
    const extra = {}
    if (email)
        extra.email = email
    if (birthdate)
        extra.birthdate = birthdate;

    return authService.signupPhone(lastname, firstname, phone, password, extra);
}

const signupEmail = (body) => {
    const lastname = body.lastname;
    const firstname = body.firstname;
    const phone = body.phone;
    const email = body.email;
    const password = body.password;
    const birthdate = body.birthdate;
    const extra = {}
    if (phone)
        extra.phone = phone;
    if (birthdate)
        extra.birthdate = birthdate;

    return authService.signupEmail(lastname, firstname, email, password, extra);
}

exports.signup = async (req, res, next) => {
    const pref = req.body.preference;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const birthdate = req.body.birthdate;

    const missingFields = {};

    if (!lastname)
        missingFields.lastname = 'lastname is missing';
    if (!firstname)
        missingFields.firstname = 'firstname is missing';
    if (!phone && !email)
        missingFields.phone_email = 'need a email and/or a phone number';
    if (!password)
        missingFields.password = 'password is missing';

    if (Object.entries(missingFields).length)
        return res.status(400).send(missingFields);

    let success = false
    try {
        if ((pref === 'phone' && phone) || (pref !== 'mail' && phone)) {
            success = await signupPhone(req.body);
        } else {
            success = await signupEmail(req.body);
        }
    } catch (e) {
        console.log('failed to signup', e);
        const errorString = e.toString().split('Error: ')[1]
        const errorObj = JSON.parse(errorString);
        return res.status(400).send(errorObj);
    }

    if (success) {
        console.log(`{ email: ${req.body.email}, phone: ${req.body.phone}} account created successfully`)
        return res.status(200).send('account created');
    }

    return res.status(400).send('failed to signup')
}

const signinPhone = async (req, res, next) => {
    const phone = req.body.phone;
    const password = req.body.password;

    const missingFields = {};

    if (!phone)
        missingFields.phone = 'need a email';
    if (!password)
        missingFields.password = 'password is missing';

    if (Object.entries(missingFields).length)
        return res.status(400).send(missingFields);
    const userId = await authService.signinPhone(phone, password)
    return userId;

}

const signinEmail = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const missingFields = {};

    if (!email)
        missingFields.email = 'need a email';
    if (!password)
        missingFields.password = 'password is missing';

    if (missingFields.length)
        return res.status(400).send(missingFields);
    const userId = await authService.signinEmail(email, password)
    return userId;

}

exports.signin = async (req, res, next) => {
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

    const missingFields = {};

    if (!phone && !email)
        missingFields.phone_email = 'need a email and/or a phone number';
    if (!password)
        missingFields.password = 'password is missing';

    if (missingFields.length)
        return res.status(400).send(missingFields);

    let userId = 0;

    try {
        if (phone) { // phone
            userId = await signinPhone(req);
        } else { // email
            userId = await signinEmail(req);
        }
    } catch (e) {
        console.log('error appeared while signin', e);
        return res.status(400).send('error appeared while signin');
    }

    let switch_account = req.session.isLogged;

    req.session.isLogged = userId > 0 ? true : false;
    req.session.userId = userId;

    if (req.session.isLogged) {
        console.log(`{ email: ${req.body.email}, phone: ${req.body.phone}} account logged successfully`)
        if (switch_account)
            return res.status(200).send('Switched account');
        return res.status(200).send('logged');
    }

    return res.status(400).send('failed to signin');
}

exports.signout = (req, res, next) => {
    req.session.isLogged = false;
    req.session.destroy(err => console.log(err));
    res.status(200).send('signout');
};

exports.testpage = (req, res, next) => {
    return res.status(200).send('If you see it, that means you are connected with an account');
};
