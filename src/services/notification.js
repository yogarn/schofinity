const { getUpcomingScholarships } = require('../services/favorite');
const sendEmail = require('./nodemailer');

async function sendNotification() {
    const scholarships = await getUpcomingScholarships();
    const delayBetweenEmails = 5 * 1000;

    scholarships.forEach((element, index) => {
        const scholarship = element.Scholarship;
        const user = element.User;

        const subject = `${scholarship.name} Registration Notification`;
        let html = `
            <p>Hello ${user.name},</p>
            <p>We would like to inform you that the registration for the ${scholarship.name} will begin soon.</p>
            <p>Please take note of the following date to start the registration:</p>
            <h2 style="font-size: 20px; font-weight: bold;">${scholarship.startDate}</h2>
        `;

        if (scholarship.image) {
            html += `
                <img src="https://qesyijmpdyoqrlezgwqg.supabase.co/storage/v1/object/public/scholarships/${scholarship.image}" alt="Scholarship Image" style="max-width: 100%; height: auto;"> <!-- Display the image -->
            `;
        }

        html += `
            <p>Below are the requirements for the scholarship:</p>
            ${scholarship.requirement}
            <p>Don't miss out on this opportunity to apply.</p>
            <p>Thank you,<br />The Schofinity Team</p>
        `;

        setTimeout(() => {
            sendEmail(user.email, subject, html);
        }, index * delayBetweenEmails);
    });
}

module.exports = sendNotification;