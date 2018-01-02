import Friend from '../models/friend.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class FriendService {

  api_url = 'http://localhost:3000';
  friendUrl = `${this.api_url}/api/friends`;

  constructor(
    private http: HttpClient
  ) { }

  createFriend(friend: Friend): Observable<any>{

    return this.http.post(`${this.friendUrl}`, friend);
  }

  getFriends(): Observable<Friend[]>{

    return this.http.get(this.friendUrl)
    .map(res  => {
      return res["data"].docs as Friend[];
    })
  }

  editFriend(friend:Friend){

    let editUrl = `${this.friendUrl}`

    return this.http.put(editUrl, friend);
  }

  deleteFriend(id:string):any{

    let deleteUrl = `${this.friendUrl}/${id}`

    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error);
    
    return Promise.reject(error.message || error);
  }
}
