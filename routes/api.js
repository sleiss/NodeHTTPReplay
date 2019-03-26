var express = require('express');
var router = express.Router();

var httphandler = require('../httphandler');

/* display recorded requests. */
router.get('/', function(req, res, next) {
    httphandler.displayRecordedRequestsJSON(res);
});

module.exports = router;
