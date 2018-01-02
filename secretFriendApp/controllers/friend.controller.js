var FriendService = require('../services/friend.service');
var FriendMailService = require('../services/mail.service');

_this = this;

exports.getFriends = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var friends = await FriendService.getFriends({}, page, limit);

        return res.status(200).json({
          status: 200,
          data: friends,
          message: "Succesfully Friends Recieved"
        });

    }catch(e){

       return res.status(400).json({
         status: 400,
         message: e.message
       });
    }
}

exports.createFriend = async function(req, res, next){

    var friend = {
        name: req.body.name,
        email: req.body.email,
        pickedFriend: null
    }

    try{

        var createdFriend = await FriendService.createFriend(friend);

        return res.status(201).json({
          status: 201,
          data: createdFriend,
          message: "Succesfully Created Friend"
        });
    }catch(e){

        return res.status(400).json({
          status: 400,
          message: "Friend Creation was Unsuccesfull"
        })
    }
}

exports.updateFriend = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({
          status: 400,
          message: "Id must be present"
        });
    }

    var id = req.body._id;

    console.log(req.body)

    var friend = {
        id,
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        pickedFriend: req.body.pickedFriend ? req.body.pickedFriend : null
    }

    try{
        var updatedFriend = await FriendService.updateFriend(friend);
        return res.status(200).json({
          status: 200,
          data: updatedFriend,
          message: "Succesfully Updated Friend"
        });
    }catch(e){
        return res.status(400).json({
          status: 400,
          message: e.message
        });
    }
}

exports.removeFriend = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await FriendService.deleteFriend(id);
        return res.status(204).json({
          status:204,
          message: "Succesfully Friend Deleted"
        });
    }catch(e){

        return res.status(400).json({
          status: 400,
          message: e.message
        });
    }

}

exports.sendEmail = async function(req, res){

  try{
      var emailsSent = await FriendMailService.sendEmail();

      return res.status(204).json({
        status:204,
        message: "Succesfully Sending emails."
      });
  }catch(e){

      return res.status(400).json({
        status: 400,
        message: e.message
      });
  }

}
