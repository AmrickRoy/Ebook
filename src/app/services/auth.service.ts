import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getLoggedInUserID(){
    let auth = JSON.parse(localStorage.getItem('authData'));
    if(auth){
      if(auth.userId){
        return auth.userId;
      }else{
        return null;
      }
    }else{
      return null;
    }
  }
}
