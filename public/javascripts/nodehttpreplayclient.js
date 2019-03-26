function displayRequests(requests) {
    let requestList = document.getElementById('requestList');

    while (requestList.firstChild) {
        requestList.removeChild(requestList.firstChild);
    }

    for (let i = 0; i < requests.length; i++) {
        let request = requests[i];
        let listElement = document.createElement('li');
        let buttonElement = document.createElement('button');

        listElement.innerText = JSON.stringify(request);

        buttonElement.setAttribute('type', 'button');
        buttonElement.setAttribute('id', 'request-' + request.id);
        buttonElement.setAttribute('onclick', 'sendRequest(' + request.id + ')');
        buttonElement.setAttribute('class', 'requestButton');
        buttonElement.setAttribute('requestId', request.id);
        buttonElement.innerText = 'Repeat Request';

        listElement.prepend(document.createElement('br'));
        listElement.prepend(buttonElement);
        requestList.appendChild(listElement);
    }
}

function sendRequest(requestId) {
    if (typeof sendRequestAddon === 'function') {
        sendRequestAddon(requestId);

    } else {
        let request = requests[requestId];

        let host = document.getElementById('host').value;
        console.log(request);
        console.log(host);

        let req = new XMLHttpRequest();
        let url = host + request.requestedUrl;

        req.open(request.type, url);

        for (let headerName in request.headers) {
            let headerValue = request.headers[headerName];
            console.log(headerName + ' ' + headerValue);
            req.setRequestHeader(headerName, headerValue);
        }

        req.send(request.body);
    }
}

function reloadData() {
    console.log('Reloading Data');
    let req = new XMLHttpRequest();
    let url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/api';
    console.log(url);

    req.addEventListener("load", function() {
        requests = JSON.parse(req.response);
        document.getElementById('requests').setAttribute('data-requests', JSON.stringify(requests));
        displayRequests(requests);
    });
    req.open('GET', url);
    req.send(null);
}

displayRequests(requests);