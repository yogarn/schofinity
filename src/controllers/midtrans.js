const midtrans = require("../config/midtrans");
const { mentoringPayments } = require('../services/mentoring');
const { classPayment } = require('../services/onlineClass');
const { sendResponse, sendError } = require('../services/responseHandler');

async function resolvePayments(req, res, next) {
  midtrans.transaction.notification(req.body)
    .then(async (statusResponse) => {
      let orderId = statusResponse.order_id;
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;
      console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

      const parts = orderId.split(" ");
      const classType = parts[0];
      const id = parts[1];

      try {
        if (classType == "mentoring") {
          await mentoringPayments(id, transactionStatus, fraudStatus);
          sendResponse(res, orderId);
        } else if (classType == "class") {
          await classPayment(id, transactionStatus, fraudStatus);
        }
      } catch (e) {
        console.log(e);
        sendError(res, e.message);
      }
    });
}

module.exports = resolvePayments;
