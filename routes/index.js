var express = require('express');
var router = express.Router();

var httphandler = require('../httphandler');

/* GET requests */
router.get('/', function(req, res, next) {
  httphandler.handleGET(req, res);
});

/* POST requests */
router.post('/', function(req, res, next) {
  httphandler.handlePOST(req, res);
});

/* PUT requests */
router.put('/', function(req, res, next) {
  httphandler.handlePUT(req, res);
});

/* DELETE requests */
router.delete('/', function(req, res, next) {
  httphandler.handleDELETE(req, res);
});

module.exports = router;
