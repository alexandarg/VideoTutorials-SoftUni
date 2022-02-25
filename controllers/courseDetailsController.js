const router = require('express').Router({ mergeParams: true });

const { courseServices } = require('../services/courseServices');
const { isUser } = require('../middlewares/authMiddleware');

router.get('/details', async (req, res) => {
    const course = await courseServices.getPopulated(req.params.courseId);

    const courseData = course.toObject();

    const isOwner = course.creator == req.user?._id;

    const isEnrolled = course.students.some(x => x._id == req.user?._id);

    res.render('course/details', { ...courseData, isOwner, isEnrolled });
});

router.get('/enroll', isUser, async (req, res) => {
    await courseServices.enrollStudent(req.params.courseId, req.user?._id);

    console.log(`${req.user?.username} has successfully enrolled in a course`);

    res.redirect(`/courses/${req.params.courseId}/details`);
});

router.get('/delete', isUser, async (req, res) => {
    const course = await courseServices.remove(req.params.courseId);

    console.log(`The course \"${course.title}\" was deleted from the database by its owner ${req.user?.username}!`);

    res.redirect('/');
})


router.get('/edit', isUser, async (req, res) => {
    const course = await courseServices.getById(req.params.courseId);

    res.render('course/edit', { ...course });
});

router.post('/edit', isUser, async (req, res) => {
    let { title, description, imageUrl, isPublic } = req.body;
    isPublic == 'on' ? isPublic = true : isPublic = false;

    try {
        const course = await courseServices.update(req.params.courseId, {title, description, imageUrl, isPublic});

        console.log(`The course \"${course.title}\" has been successfully updated by its owner ${req.user?.username}`);

        res.redirect(`/courses/${course._id}/details`);
    } catch (error) {
        // TODO: Proper error handling!
        console.log(error);
        res.status(400).send(error.message);
    }
});

router.get

module.exports = router;