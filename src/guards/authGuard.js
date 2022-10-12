module.exports = (req, res, next) => {
    if (!req.session.isLogged)
        return res.status(400).send('need authentication');

    next();
};
