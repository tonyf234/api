const authService = require('../services/authService');

const signupPhone = (body) => {
    const lastname = body.lastname;
    const firstname = body.firstname;
    const phone = body.phone;
    const email = body.email;
    const extra = {}
    if (email)
        extra.email = email

    authService.signupPhone(lastname, firstname, phone, extra);
}

const signupEmail = (body) => {
    const lastname = body.lastname;
    const firstname = body.firstname;
    const phone = body.phone;
    const email = body.email;
    const extra = {}
    if (phone)
        extra.phone = phone;

    authService.signupPhone(lastname, firstname, email, extra);
}

exports.signup = (req, res, next) => {
    const pref = req.body.preference;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const phone = req.body.phone;
    const email = req.body.email;

    const missingFields = {};

    if (!lastname)
        missingFields.lastname = 'lastname is missing';
    if (!firstname)
        missingFields.firstname = 'firstname is missing';
    if (!phone && !email)
        missingFields.phone_email = 'need a email and/or a phone number';

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

    console.log(`{ email: ${req.email}, phone: ${req.phone}} account created successfully`)
    res.status(200).send('account created');
}

exports.signin = (req, res, next) => {
    authService.signin();
}
