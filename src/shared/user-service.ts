import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { HttpParams } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    private static readonly USERS_PATH = '/users';
    private readonly usersUrlBuilder;
    
    constructor(private http: HttpClient) { 
    }

    getUserList() {
        return this.getMockUserData();
    }

    private getMockUserData(){
        return this.http.get("assets/data/users.json").toPromise().then(res => res);
    }
}