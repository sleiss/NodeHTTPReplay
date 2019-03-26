requests = [];

const requestTypes = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

function createParsedRequest(type) {
    let parsedRequest = {};
    parsedRequest.id = requests.length;
    parsedRequest = setRequestType(parsedRequest, type);
    return parsedRequest;
}

function setRequestType(req, type) {
    switch(type) {
        case 'GET': req.type = requestTypes.GET; break;
        case 'POST': req.type = requestTypes.POST; break;
        case 'PUT': req.type = requestTypes.PUT; break;
        case 'DELETE': req.type = requestTypes.DELETE; break;
    }

    return req;
}

function setHeaders(req, parsedRequest) {
    parsedRequest.headers = req.headers;
    return parsedRequest;
}

function setBody(req, parsedRequest) {
    parsedRequest.body = req.body;
    return parsedRequest;
}

function setRequestedURL(req, parsedRequest) {
    parsedRequest.requestedUrl = req.originalUrl;
    return parsedRequest;
}

function setTime(parsedRequest) {
    parsedRequest.time = Date.now();
    return parsedRequest;
}

function setCommonValues(req, parsedRequest) {
    parsedRequest = setHeaders(req, parsedRequest);
    parsedRequest = setBody(req, parsedRequest);
    parsedRequest = setRequestedURL(req, parsedRequest);
    parsedRequest = setTime(parsedRequest);

    return parsedRequest;
}

function handleGET(req, res) {
    let parsedRequest = createParsedRequest('GET');
    parsedRequest = setCommonValues(req, parsedRequest);

    displayRequest(parsedRequest, res);
}

function handlePOST(req, res) {
    console.log(req);
    let parsedRequest = createParsedRequest('POST');
    parsedRequest = setCommonValues(req, parsedRequest);

    displayRequest(parsedRequest, res);
}

function handlePUT(req, res) {
    let parsedRequest = createParsedRequest('PUT');
    parsedRequest = setCommonValues(req, parsedRequest);

    displayRequest(parsedRequest, res);
}

function handleDELETE(req, res) {
    let parsedRequest = createParsedRequest('DELETE');
    parsedRequest = setCommonValues(req, parsedRequest);

    displayRequest(parsedRequest, res);
}

function displayRequest(parsedReq, res) {
    requests.unshift(parsedReq);
    console.log(requests.length);
    res.type('json');
    res.end(JSON.stringify(parsedReq));
}

function displayRecordedRequests(res) {
    res.render('view', {requests: requests});
}

function displayRecordedRequestsJSON(res) {
    res.type('json');
    res.end(JSON.stringify(requests));
}

exports.handleGET = handleGET;
exports.handlePOST = handlePOST;
exports.handlePUT = handlePUT;
exports.handleDELETE = handleDELETE;
exports.displayRequest = displayRequest;
exports.displayRecordedRequests = displayRecordedRequests;
exports.displayRecordedRequestsJSON = displayRecordedRequestsJSON;