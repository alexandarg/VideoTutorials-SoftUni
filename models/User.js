const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'Username should be unique!'],
        validate: [/^[A-Za-z0-9]+$/, 'Username should consists only of english letters and numbers!'],
        minlength: [5, 'Username should be at least 5 characters long!'],
        maxlength: [12, 'Username can be only 12 characters long!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: [/^[A-Za-z0-9]+$/, 'Password should consists only of english letters and numbers!'],
        minlength: [8, 'Password should be at least 8 characters long!'],
    },
});

userSchema.virtual('repeatPassword')
    .set(function (rePass) {
        if (rePass !== this.password) {
            throw new Error('Password don\'t match!');
        }
    });

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            next();
        })
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

exports.User = mongoose.model('User', userSchema);