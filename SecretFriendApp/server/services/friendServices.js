const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

class FriendService{

	constructor(req, res){
		this.req = req
		this.res = res
	}

	insert(friendItem, db, callback){
		console.log("##### "+friendItem.Email);
		db.collection('friend').insertOne({
		  		"Name" : friendItem.Name,
					"Email" : friendItem.Email
		}, function(){
			callback()
		})
	}

	deleteFriend(friendCode){

		let self = this;

		try{

			MongoClient.connect(url, function(err, client) {

				if(err){
					throw err;
				}

				let db = client.db('friendDb');

				let query = {"_id" : ObjectId(friendCode)}

				db.collection('friend').deleteOne(
				 query
				)
				.then(function(result) {
					client.close();
					return self.res.status(200).json({
						success: 'success'
					})
				})

			});
		}
		catch(error){
			return self.res.status(500).json({
				status: 'error',
				error: error
			})
		}

	}

	addFriend(){
		let self = this;
		console.log("######$$$ "+this.req.body);
		debugger;
		let Name = this.req.body.name;
		let Email = this.req.body.email;

		let friendItem = {"Name": Name, "Email": Email};

		try{

			MongoClient.connect(url, function(err, client) {

					if(err){
						throw err;
					}

					let db = client.db('friendDb');

					self.insert(friendItem, db, function(){
						client.close();
						return self.res.status(200).json({
							success: 'success'
						})
					})

			});
		}
		catch(error){
			return self.res.status(500).json({
				status: 'error',
				error: error
			})
		}
	}
	getFriend(){
		let self = this;
		try{
			MongoClient.connect(url, function(err, client) {

					if(err){
						throw err;
					}

					let friendList = []

					let db = client.db('friendDb');

			  	let cursor = db.collection('friend').find({}, function (findErr, result) {
				    if (findErr){
							 throw findErr;
						}

						result.each(function(err, doc){

							if(doc != null){

								friendList.push(doc);
							}
							else{
								return self.res.status(200).json({
									success: 'success',
									data: friendList
								})
							}
						});

						client.close();

				  });
			});
		}
		catch(error){
			return self.res.status(500).json({
				status: 'error',
				error: error
			})
		}
	}
}
module.exports = FriendService
