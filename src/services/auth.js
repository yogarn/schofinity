const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = db;

async function auth(data) {
    const { username, password } = data;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error("Username not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Incorrect password");
    }
    const token = jwt.sign({ user }, 'secret_key', { expiresIn: '1h' });
    return token;
}

module.exports = {
    auth
}
