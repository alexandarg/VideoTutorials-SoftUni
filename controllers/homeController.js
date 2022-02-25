const router = require('express').Router();

const { courseServices } = require('../services/courseServices');

router.get('/', async (req, res) => {
    const courses = await courseServices.getAll();

    res.render('home', { courses });
});

module.exports = router;