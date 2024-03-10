function sendResponse(res, data) {
    const message = 'success';
    return res.status(200).json({ message, data });
}

function sendError(res, error) {
    let status = ''
    switch (error) {
        // validation
        case 'Validation error':
            status = 400;
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
        case 'Scholarship not found':
            status = 404;
            break;
        case 'Schedule not found':
            status = 404;
            break;
        // else
        default:
            status = 500;
            error = 'Internal Server Error';
            break;
    }
    return res.status(status).json({ error });
}

module.exports = {
    sendResponse,
    sendError
};
