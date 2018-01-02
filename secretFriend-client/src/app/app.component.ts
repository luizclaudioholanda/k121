import { Response } from '@angular/http';
import { FriendService } from './services/friend.service';
import { MailService } from './services/mail.service';
import Friend from './models/friend.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(

      private friendService: FriendService,
      private mailService: MailService
  ) { }

  public newFriend: Friend = new Friend();

  friendsList: Friend[];
  editFriends: Friend[] = [];

  ngOnInit(): void {

    this.friendService.getFriends()
      .subscribe(friends => {
        this.friendsList = friends
        console.log(friends);
      })
  }

  create() {
    this.friendService.createFriend(this.newFriend)
      .subscribe((res) => {
        this.friendsList.push(res.data);
        this.newFriend = new Friend();
      })
  }

  editFriend(friend: Friend) {

    console.log(friend);

    if(this.friendsList.includes(friend)){

      if(!this.editFriends.includes(friend)){
        this.editFriends.push(friend)

      }else{

        this.editFriends.splice(this.editFriends.indexOf(friend), 1)
        this.friendService.editFriend(friend).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editFriend(friend);
          console.error('Update Unsuccesful');
        })
      }
    }
  }

  deleteFriend(friend: Friend) {

    if(window.confirm('Remove this record?')){
      this.friendService.deleteFriend(friend._id).subscribe(res => {
        this.friendsList.splice(this.friendsList.indexOf(friend), 1);
      })
    }
  }

  doneFriend(friend:Friend){

    this.friendService.editFriend(friend).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editFriend(friend)
      console.error('Update Unsuccesful');
    })
  }

  submitFriend(event, friend:Friend){
    if(event.keyCode ==13){
      this.editFriend(friend);
    }
  }

  sendEmail(){
    this.mailService.sendEmails().subscribe(res => {
      console.log('Sending emails');
    }, err => {
      console.log('Error sending emails.');
    })
  }

}
