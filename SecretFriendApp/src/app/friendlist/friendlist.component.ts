import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service'
import { Friend } from '../friendadd/friend.model'

@Component({
  selector: 'friend-list',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendListComponent implements OnInit {

    private friendList:Friend[]

    constructor(private commonService:CommonService){

    }

    ngOnInit(){
        this.getAllFriend()

        this.commonService.add_subject.subscribe(response => {
            this.getAllFriend()
        })
    }

    getAllFriend(){
        this.commonService.getFriend().subscribe(res =>{
            this.friendList  = []
            res.json().data.map(e => {
                this.friendList.push(new Friend(e._id,e.name,e.email,false));
            })
        })
    }

    deleteFriend(friendCode){

      this.commonService.deleteFriend(friendCode).subscribe(res => {
          this.commonService.deleteFriend(friendCode)
      })

      let index = this.friendList.findIndex(Friend => Friend.Code === friendCode);
      this.friendList.splice(index, 1);

    }
}
