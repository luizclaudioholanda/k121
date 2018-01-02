var express = require('express');

var router = express.Router();

var FriendController = require('../../controllers/friend.controller');

router.get('/', FriendController.getFriends);

router.post('/', FriendController.createFriend);

router.put('/', FriendController.updateFriend);

router.delete('/:id',FriendController.removeFriend);

//Mail service
router.put('/sendEmail',FriendController.sendEmail);

module.exports = router;
