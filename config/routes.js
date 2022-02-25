const router = require('express').Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');

router.use(homeController);
router.use('/auth', authController);
router.use('/courses', courseController);
router.use('*', (req, res) => {
    res.status(400).render('404');
});

module.exports = router;