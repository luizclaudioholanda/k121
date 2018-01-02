import { Injectable } from '@angular/core';
import { Friend } from '../friendadd/friend.model';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class CommonService {
	public friendList: Friend[]
	public add_subject=new Subject<String>()

	constructor(private http : Http){
		this.friendList = []
	}

	addFriend(item){
		return this.http.post('/api/addFriend',{
			Name : item.Name,
			Email : item.Email
		})
	}

	getFriend(){
		return this.http.post('/api/getFriend',{})
	}

	deleteFriend(id){
		return this.http.delete('/api/deleteFriend/'+id,{})
	}
}
