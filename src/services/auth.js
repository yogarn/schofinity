const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userServices = require('./user');
const sendEmail = require('./nodemailer');

const { User } = db;

async function auth(data) {
    const { username, password } = data;
    const user = await User.findOne({ where: { username, statusId: 2 } });
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

async function activate(data) {
    const { username, otp } = data;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error("Username not found");
    }
    if (!user.otp) {
        throw new Error("Incorrect OTP");
    }
    const otpMatch = await bcrypt.compare(otp, user.otp);
    if (!otpMatch) {
        throw new Error("Incorrect OTP");
    } else {
        userServices.update(username, { statusId: 2 });
        clearOTP(username);
    }
}

async function resetPassword(data) {
    const { username, password, otp } = data;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error("Username not found");
    }
    const otpMatch = await bcrypt.compare(otp, user.otp);
    if (!otpMatch) {
        throw new Error("Incorrect OTP");
    } else {
        userServices.update(username, { password });
        clearOTP(username);
    }
}

async function generateOTP(username) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    userServices.update(username, { otp: hashedOtp });
    const user = await userServices.find(username);
    const subject = `Schofinity OTP Verification Code`;
    const text = `
    Hello ${username},

    This is your OTP Verification Code: ${otp}
    Please use this code to verify your account.
    Do not share this code with anyone including Schofinity representatives.

    Thank you,
    Schofinity Team
    `;
    sendEmail(user.email, subject, text);
}

async function clearOTP(username) {
    return await userServices.update(username, { otp: null });
}

module.exports = {
    auth,
    activate,
    resetPassword,
    generateOTP
}
