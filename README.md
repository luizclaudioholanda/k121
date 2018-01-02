# k121

# Application for secret friend
This application is composed by two main project. SecretFriendApp and secretFriend-client.
For database, it uses a noSQL (MongoDB) and for testing emails a Ethereal Email service.

#SecretFriendApp
This project is the back-end part. It uses a mongoDB noSQL database to store documents used
in application.
After clone this application, you need to create a folder named <b>friendDb</b> and run the command
outside this directory.

<i>mongod --dbpath friendDb</i>

This command will start the database.

<b>Starting server</b>
Move to directory SecretFriendApp and run the following command:

<i>npm start</i>

This will start the server on port 3000, and will be avaiable on localhost:3000

#secretFriend-client
This project is the front-end part.
Run the following command to start client.

<i>npm start</i>

This will start the server on port 4200, and will be avaiable on localhost:4200

The client application, has a button called <b>SELECT FRIENDS</b>. After you have register few friends, just hit this
button to send emails to everyone. Each one with his friend.
