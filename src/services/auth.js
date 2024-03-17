const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('./nodemailer');
const sequelize = require('../config/sequelize')

const { User } = db;

async function auth(data) {
    const { username, password } = data;

    const user = await sequelize.transaction(async (t) => {
        return await User.findOne({ where: { username, statusId: 2 }, transaction: t });
    });

    if (!user) {
        throw new Error("Username not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        throw new Error("Incorrect password");
    }

    const userId = user.id;
    const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
    return token;
}

async function activate(data) {
    const { username, otp } = data;

    const user = await sequelize.transaction(async (t) => {
        return await User.findOne({ where: { username }, transaction: t });
    });

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
        await sequelize.transaction(async (t) => {
            await User.update({ statusId: 2, otp: null }, { where: { username }, transaction: t });
        });
    }
}

async function resetPassword(data) {
    const { username, password, otp } = data;

    const user = await sequelize.transaction(async (t) => {
        return await User.findOne({ where: { username }, transaction: t });
    });

    if (!user) {
        throw new Error("Username not found");
    }

    if (!user.otp) {
        throw new Error("Incorrect OTP");
    }

    const otpMatch = await bcrypt.compare(otp, user.otp);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!otpMatch) {
        throw new Error("Incorrect OTP");
    } else {
        await sequelize.transaction(async (t) => {
            await User.update({ password: hashedPassword, otp: null }, { where: { username, statusId: 2 }, transaction: t });
        });
    }
}

async function generateOTP(username) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await sequelize.transaction(async (t) => {
        await User.update({ otp: hashedOtp }, { where: { username }, transaction: t });
    });

    const user = await sequelize.transaction(async (t) => {
        return await User.findOne({ where: { username }, transaction: t });
    });

    if (!user) {
        throw new Error("Username not found");
    }

    const subject = `Schofinity OTP Verification Code`;
    const html = `
            <p>Hello ${username},</p>
            <p>This is your OTP Verification Code:</p>
            <h1 style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</h1>
            <p>Please use this code to verify your account.</p>
            <p>Do not share this code with anyone including Schofinity representatives.</p>
            <p>Thank you,<br />Schofinity Team</p>
        `;

    sendEmail(user.email, subject, html);
}

module.exports = {
    auth,
    activate,
    resetPassword,
    generateOTP
}
