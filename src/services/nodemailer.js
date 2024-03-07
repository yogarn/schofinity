const transporter = require("../config/nodemailer");

async function sendEmail(userEmail, subject, html) {
    transporter.sendMail({
        from: 'Schofinity',
        to: userEmail,
        subject,
        html,
    }, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}

module.exports = sendEmail;
