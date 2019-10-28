import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from './login/user';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http:HttpClient) { }

  loginUser(user:User):any{
    let url = "http://localhost:8080/login-service/api/v1/authenticate";
    return this.http.post(url,user,httpOptions);
    // let url = "http://localhost:9090/api/v1/authenticate";
    // return this.http.post(url, user, httpOptions);

  }
}
