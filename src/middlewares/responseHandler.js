function sendResponse(res, status, data) {
    let message = '';
    switch (status) {
        case 200:
            message = 'Success';
            break;
        case 400:
            message = 'Bad Request';
            break;
        case 401:
            message = 'Unauthorized';
            break;
        case 403:
            message = 'Forbidden';
            break;
        case 404:
            message = 'Not Found';
            break;
        case 500:
            message = 'Internal Server Error';
            break;
        default:
            message = 'Unknown Error';
            break;
    }
    return res.status(status).json({ message, data });
}

module.exports = sendResponse;
