const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title field is required'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
        minlength: [20, 'Description must be at least 20 characters long!']
    },
    imageUrl : {
        type: String,
        required: [true, 'Home image field is required!'],
        validate: [/^https?:\/\//i, 'Entered image url is invalid! The url should start with http or https'],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    students: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})

exports.Course = mongoose.model('Course', courseSchema);