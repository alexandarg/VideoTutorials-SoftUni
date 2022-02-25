const { User } = require('../models/User');
const { TOKEN_SECRET } = require('../constants');
const jwt = require('../utils/jwt');

const register = (userData) => User.create(userData);

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username or password!');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    }

    const payload = {
        _id: user._id,
        username: user.username,
    };

    const token = jwt.sign(payload, TOKEN_SECRET);

    return token;
};

exports.authServices = {
    register,
    login,
};

