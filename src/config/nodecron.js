const cron = require('node-cron');
const sendNotification = require('../services/notification');

cron.schedule('0 0 0 * * *', async function () {
    try {
        sendNotification();
    } catch (e) {
        console.log(e);
    }
});
