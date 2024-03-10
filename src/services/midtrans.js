const snap = require("../config/midtrans");

async function generatePayments(orderId, grossAmount, name, email, contact) {
    let parameter = {
        "transaction_details": {
            "order_id": orderId,
            "gross_amount": grossAmount
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            "first_name": name,
            "email": email,
            "phone": contact
        }
    };

    return snap.createTransaction(parameter)
        .then((transaction) => {
            return transaction.token;
        });
}

module.exports = generatePayments;
