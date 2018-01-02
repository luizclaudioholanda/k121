var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var FriendSchema = new mongoose.Schema({
    name: String,
    email: String,
    pickedFriend: String
})

FriendSchema.plugin(mongoosePaginate)
const FriendSch = mongoose.model('Friend', FriendSchema)

module.exports = FriendSch;
