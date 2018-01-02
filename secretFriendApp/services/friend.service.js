var Friend = require('../models/friend.model');

_this = this;

exports.getFriends = async function(query, page, limit){

    var options = {
        page,
        limit
    }

    try {
        var friends = await Friend.paginate(query, options);
        return friends;

    } catch (e) {

        throw Error('Error while Paginating Friends');
    }
}

exports.createFriend = async function(friend){

    var newFriend = new Friend({
        name: friend.name,
        email: friend.email,
        pickedFriend: null
    });

    try{

        var savedFriend = await newFriend.save();

        return savedFriend;

    }catch(e){

        throw Error("Error while Creating Friend.")
    }
}

exports.updateFriend = async function(friend){

    var id = friend.id;

    try{

        var oldFriend = await Friend.findById(id);

    }catch(e){
        throw Error("Error occured while Finding the Friend");
    }

    if(!oldFriend){
        return false;
    }

    console.log(oldFriend);

    oldFriend.name = friend.name;
    oldFriend.email = friend.email;
    oldFriend.pickedFriend = friend.pickedFriend;

    console.log(oldFriend);

    try{
        var savedFriend = await oldFriend.save();
        return savedFriend;

    }catch(e){
        throw Error("And Error occured while updating the Friend");
    }
}

exports.deleteFriend = async function(id){

    try{
        var deleted = await Friend.remove({_id: id})

        if(deleted.n === 0){
            throw Error("Friend Could not be deleted")
        }
        return deleted;
    }catch(e){

        throw Error("Error Occured while Deleting the Friend");
    }
}
