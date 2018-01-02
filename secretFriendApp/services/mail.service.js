var hbs = require('handlebars');
var nodemailer = require('nodemailer');

var Friend = require('../models/friend.model');

_this = this;

exports.sendEmail = async function(){

    try{
        var friendsList = await Friend.find();

        console.log(friendsList);
        selectFriends(friendsList);
        sendEmails(friendsList,0);

        return "OK";

    }catch(e){
        console.log(e);
        throw Error("Error Occured while Sending emails.");
    }
}

function createEmailTransport(){

  var transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'wv4jbqhuvxvie5rf@ethereal.email',
      pass: 'q4ZFNyNkuVEf4Vjyk8'
    }
  });

  return transport;
}

function createEmailTemplate(actualUser){

  var template = '<h1>Hi, ' + actualUser.name +'!</h1>' +
  '<p>Your secret friend is</p>' +
  '<small><b>' + actualUser.pickedFriend + '</b></small>';

  return template;

}

function createEmailConfig(){

  var config = {
    from: 'Secret Friend <contact@secrectfriend.com>',
    subject: 'Your secret friend!'
  };

  return config;
}

function sendEmails(friendsList, idx){

  var actualUser = friendsList[idx];

  if(!actualUser){
    return console.log('All emails sent!');
  }

  var html = createEmailTemplate(actualUser);

  var config = createEmailConfig();

  createEmailTransport().sendMail({
    from: config.from,
    to: actualUser.email,
    subject: config.subject,
    html: html
  }, function(err){

    if(err){
      console.log(err);
      throw err;
    }

    console.log('Email sent to user %s!', actualUser.email);

    sendEmails(friendsList,++idx);

  });
}

function selectFriends(friendsList){

  let newFriendList = [];

  let count = 0;

  while (count < friendsList.length) {
  		var item = friendsList[Math.floor( Math.floor(Math.random()*friendsList.length))];
  		if (newFriendList.indexOf(item) == -1) {
  			newFriendList.push(item);
  			count++;
  		}
  	}

  for (var i = 0; i < newFriendList.length; i++) {

      let bestFriend;
      if (newFriendList.length-1 == i) {
        bestFriend = newFriendList[0].name;
      } else {
        bestFriend = newFriendList[i+1].name;
      }

      const newFriend = new Friend({

        _id    : newFriendList[i]._id,
        email  : newFriendList[i].email,
        name   : newFriendList[i].name,
        pickedFriend : bestFriend

      });

      Friend.findOneAndUpdate({_id: newFriend._id}, newFriend, function(err, resFriend) {
          console.log("BEST FRIEND "+resFriend);
        }, function(err) {
          console.log(err);
      });
   }
}
