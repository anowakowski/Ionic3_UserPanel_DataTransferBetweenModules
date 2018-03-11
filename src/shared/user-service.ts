import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { HttpParams } from "@angular/common/http";
import { UrlBuilder } from './external/url-builder.util';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    private static readonly USERS_PATH = '/users';
    private readonly usersUrlBuilder : UrlBuilder;
    
    constructor(private http: HttpClient, private urlBuilder: UrlBuilder) { 
        this.usersUrlBuilder = urlBuilder.forPath(UserService.USERS_PATH);
    }

    getUserList() {
        //return this.http.get(this.usersUrlBuilder.buildForPath("/list"));
        return this.getMockUserData();
    }

    private getMockUserData(){
        return this.http.get("assets/data/users.json").toPromise().then(res => res);
    }
}