const authService = require('../services/authService');

const signupPhone = (body) => {
    const lastname = body.lastname;
    const firstname = body.firstname;
    const phone = body.phone;
    const email = body.email;
    const password = body.password;
    const extra = {}
    if (email)
        extra.email = email

    authService.signupPhone(lastname, firstname, phone, password, extra);
}

const signupEmail = (body) => {
    const lastname = body.lastname;
    const firstname = body.firstname;
    const phone = body.phone;
    const email = body.email;
    const password = body.password;
    const extra = {}
    if (phone)
        extra.phone = phone;

    authService.signupEmail(lastname, firstname, email, password, extra);
}

exports.signup = (req, res, next) => {
    console.log('controller : signup');
    const pref = req.body.preference;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

    const missingFields = {};

    if (!lastname)
        missingFields.lastname = 'lastname is missing';
    if (!firstname)
        missingFields.firstname = 'firstname is missing';
    if (!phone && !email)
        missingFields.phone_email = 'need a email and/or a phone number';
    if (!password)
        missingFields.password = 'password is missing';

    if (missingFields.length)
        return res.status(400).send(missingFields);

    try {
        if ((pref === 'phone' && phone) || (pref !== 'mail' && phone)) {
            signupPhone(req.body);
        } else {
            signupEmail(req.body);
        }
    } catch (e) {
        console.log('failed to signup', e);
        return res.status(400).send('failed to signup');
    }

    console.log(`{ email: ${req.body.email}, phone: ${req.body.phone}} account created successfully`)
    return res.status(200).send('account created');
}

const signinPhone = (body) => {

}

const signinEmail = (body) => {

}

exports.signin = (req, res, next) => {
    console.log('controller : signin');
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

    let logged = false;

    try {
        if (phone) { // phone
            logged = signinPhone(body);
        } else { // email
            logged = signinEmail(body);
        }
    } catch (e) {
        console.log('failed to signin', e);
        return res.status(400).send('failed to signin');
    }

    req.session.isLogged = logged;

    if (logged) {
        console.log(`{ email: ${req.body.email}, phone: ${req.body.phone}} account logged successfully`)
        return res.status(200).send('logged');
    }

    return res.status(400).send('failed to signin');
}

exports.signout = (req, res, next) => {
    req.session.isLogged = false;
    req.session.destroy(err => console.log(err));
};
