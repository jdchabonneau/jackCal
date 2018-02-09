import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IIMSUser } from '../../interfaces/IIMSUser';
@Injectable()
export class UsersProvider {

  currrentUser: IIMSUser;
  constructor(public http: Http) {
    //console.log('Hello UsersProvider Provider');
  }

  login(name:string, password: string){

  }

}
