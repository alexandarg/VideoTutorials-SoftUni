const router = require('express').Router();

const { authServices } = require('../services/authServices');
const { TOKEN_COOKIE_NAME } = require('../constants');
const { isGuest, isUser } = require('../middlewares/authMiddleware');

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        await authServices.register({ username, password, repeatPassword });

        console.log(`${username} has been added to the databse!`);

        const token = await authServices.login(username, password);

        res.cookie(TOKEN_COOKIE_NAME, token).redirect('/');
    } catch (error) {
        if (error.errors) {
            const errors = Object.keys(error.errors).map(x => error.errors[x].message);
            res.locals.errors = errors;
        } else {
            res.locals.error = error.message;
        }
        
        res.render('auth/register');
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authServices.login(username, password);

        console.log(`${username} logged in successfully!`);

        res.cookie(TOKEN_COOKIE_NAME, token).redirect('/');
    } catch (error) {
        if (error.errors) {
            const errors = Object.keys(error.errors).map(x => error.errors[x].message);
            res.locals.errors = errors;
        } else {
            res.locals.error = error.message;
        }
        res.render('auth/login');
    }
});

router.get('/logout', isUser, (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME).redirect('/');
});

module.exports = router;