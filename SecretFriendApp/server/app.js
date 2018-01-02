const express = require('express')
const bodyParser = require('body-parser')
const friendService  = require('./services/friendServices')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.post('/api/addFriend', function (req, res) {
  let friendServiceObj = new friendService(req, res)
  friendServiceObj.addFriend();
})

app.post('/api/getFriend', function (req, res) {
  let friendServiceObj = new friendService(req, res)
  friendServiceObj.getFriend();
})

app.delete('/api/deleteFriend/:id',function (req, res) {

  let friendServiceObj = new friendService(req, res)
  friendServiceObj.deleteFriend(req.params.id);
})

app.listen(3000, function () {
  console.log('Secret Friend Web app service listening on port 3000!')
})
