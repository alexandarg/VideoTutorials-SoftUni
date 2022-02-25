const { Course } = require('../models/Course');

const getAll = () => Course.find({}).lean();
const getById = (courseId) => Course.findById(courseId).lean();
const getPopulated = (courseId) => Course.findById(courseId).populate('students');
const create = (courseData) => Course.create(courseData);
const enrollStudent = (courseId, studentId) => {
    return Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { students: studentId } },
        { runValidators: true },
    )
}
const remove = (id) => Course.findByIdAndDelete(id);
const update = (id, courseData) => Course.findByIdAndUpdate(id, courseData);

exports.courseServices = {
    getAll,
    getById,
    getPopulated,
    create,
    enrollStudent,
    remove,
    update,
};