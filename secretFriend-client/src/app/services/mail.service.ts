import Friend from '../models/friend.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class MailService {

  api_url = 'http://localhost:3000';
  emailUrl = `${this.api_url}/api/friends/sendEmail`;

  constructor(
    private http: HttpClient
  ) { }

  sendEmails(): Observable<any>{

    return this.http.put(`${this.emailUrl}`,{},{});
  }

}
