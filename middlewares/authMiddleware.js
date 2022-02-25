const { TOKEN_COOKIE_NAME, TOKEN_SECRET } = require('../constants');

const jwt = require('../utils/jwt');

exports.auth = function (req, res, next) {
    const token = req.cookies[TOKEN_COOKIE_NAME];

    if (!token) {
        return next();
    }

    jwt.verify(token, TOKEN_SECRET)
        .then((decodedToken) => {
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        })
        .catch((err) => {
            res.status(401).send(err);
        })
}

exports.isUser = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        console.log('Not logged in users cannot visit this page!');
        res.status(401).render('404');
    }
}

exports.isGuest = function (req, res, next) {
    if (!req.user) {
        next();
    } else {
        console.log('Logged users cannot visit this page!');
        res.status(401).render('404');
    }
};