module.exports = (req, res, next) => {
    if (!req.session.isLogged) {
        res.status(400).send('need authentication');
    }
    else {
        next();
    }
};
