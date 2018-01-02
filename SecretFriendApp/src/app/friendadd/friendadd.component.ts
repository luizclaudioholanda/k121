import { Component, OnInit } from '@angular/core';
import { Friend } from './friend.model'
import { CommonService } from '../common/common.service'

@Component({
	selector: 'friend-add',
	templateUrl: './friendadd.component.html',
	styleUrls: ['./friendadd.component.css']

})
export class FriendAddComponent implements OnInit {

	private friend: Friend;

	constructor(private commonService:CommonService) {

	}

	addFriend(){

			this.commonService.addFriend(this).subscribe(res => {
					this.commonService.add_subject.next()
			})

			this.friend = null;
	}

	ngOnInit() {

	}
}
