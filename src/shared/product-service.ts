import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

  getListDetails(){
    return this.http.get('assets/data/products.json').toPromise().then(res => res);
  }

}
