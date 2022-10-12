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

    let success = false
    try {
        if ((pref === 'phone' && phone) || (pref !== 'mail' && phone)) {
            success = signupPhone(req.body);
        } else {
            success = signupEmail(req.body);
        }
    } catch (e) {
        console.log('failed to signup', e);
        return res.status(400).send('failed to signup (error)');
    }

    if (success) {
        console.log(`{ email: ${req.body.email}, phone: ${req.body.phone}} account created successfully`)
        return res.status(200).send('account created');
    }

    return res.status(400).send('failed to signup')
}

const signinPhone = (req, res, next) => {
    const phone = req.body.phone;
    const password = req.body.password;

    const missingFields = {};

    if (!phone)
        missingFields.phone = 'need a email';
    if (!password)
        missingFields.password = 'password is missing';

    if (missingFields.length)
        return res.status(400).send(missingFields);
    const logged = authService.signinPhone(phone, password)
    return logged;

}

const signinEmail = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const missingFields = {};

    if (!email)
        missingFields.email = 'need a email';
    if (!password)
        missingFields.password = 'password is missing';

    if (missingFields.length)
        return res.status(400).send(missingFields);
    const logged = authService.signinEmail(email, password)
    return logged;

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
            logged = signinPhone(req);
        } else { // email
            console.log(email)
            logged = signinEmail(req);
        }
    } catch (e) {
        console.log('failed to signin', e);
        return res.status(400).send('failed to signin 1');
    }

    req.session.isLogged = logged;

    if (logged) {
        console.log(`{ email: ${req.body.email}, phone: ${req.body.phone}} account logged successfully`)
        return res.status(200).send('logged');
    }

    return res.status(400).send('failed to signin 2');
}

exports.signout = (req, res, next) => {
    req.session.isLogged = false;
    req.session.destroy(err => console.log(err));
};

exports.testpage = (req, res, next) => {
    return res.status(200).send('If you see it, that means you are connected with an account');
};
