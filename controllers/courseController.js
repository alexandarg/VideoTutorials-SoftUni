const router = require('express').Router();

const { courseServices } = require('../services/courseServices');
const courseDetailsController = require('../controllers/courseDetailsController');
const { isUser } = require('../middlewares/authMiddleware');

router.get('/create', isUser, (req, res) => {
    res.render('course/create');
});

router.post('/create', isUser, async (req, res) => {
    let { title, description, imageUrl, isPublic } = req.body;
    isPublic == 'on' ? isPublic = true : isPublic = false;

    try {
        await courseServices.create({
            title,
            description,
            imageUrl,
            isPublic,
            creator: req.user?._id
        });

        console.log(`New course \"${title}\" has been added to the database!`);

        res.redirect('/');
    } catch (error) {
        // TODO: Proper error handling
        console.log(error);
        res.status(400).send(error.message);
    }
});

router.use('/:courseId', courseDetailsController);

module.exports = router;