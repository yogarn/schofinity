function sendResponse(res, data) {
    const message = 'success';
    return res.status(200).json({ message, data });
}

function sendError(res, error, data) {
    let status = ''
    switch (error) {
        // validation
        case 'Validation error':
            status = 400;
            break;
        case 'ExpressValidationError':
            status = 400;
            error = data;
            break;
        case 'Invalid password':
            status = 400;
            break;
        case 'Invalid contact':
            status = 400;
            break;
        case 'Invalid email':
            status = 400;
            break;
        // authentication
        case 'Incorrect password':
            status = 401;
            break;
        case 'Insufficient privilege':
            status = 401;
            break;
        case 'Incorrect OTP':
            status = 401;
            break;
        case 'No token provided':
            status = 401;
            break;
        case 'Invalid jwt token':
            status = 403;
            break;
        case 'Username not found':
            status = 404;
            break;
        case 'Mentor not found':
            status = 404;
            break;
        case 'Payment not found':
            status = 404;
            break;
        case 'Mentoring not found':
            status = 404;
            break;
        case 'User not found':
            status = 404;
            break;
        case 'Scholarship not found':
            status = 404;
            break;
        case 'Favorite not found':
            status = 404;
            break;
        case 'Schedule not found':
            status = 404;
            break;
        case 'Class not found':
            status = 404;
            break;
        case 'Failed to generate payment':
            status = 500;
            break;
        // else
        default:
            status = 500;
            error = 'Internal Server Error';
            break;
    }
    return res.status(status).json({ message: "error", data: error });
}

module.exports = {
    sendResponse,
    sendError
};
