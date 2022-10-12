const path = require('path');

const notFound = require('./../utils/notFound');

const env_path = path.resolve(__dirname, './../../.env');
require('dotenv').config({ path: env_path });

module.exports = (req, res, next) => {
    if (!req.session.isAdmin)
        if (process.env.NODE_ENV === 'development')
            return res.status(400).send('admin access only');
        return notFound(req, res, next);
    next();
};
