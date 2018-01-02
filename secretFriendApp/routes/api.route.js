var express = require('express');

var router = express.Router();
var friends = require('./api/friend.route');

router.use('/friends', friends);

module.exports = router;
