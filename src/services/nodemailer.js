const transporter = require("../config/nodemailer");

async function sendEmail(userEmail, subject, text) {
    transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: userEmail,
        subject: subject,
        text: text,
    }, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}

module.exports = sendEmail;
