import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserRegistration {

  constructor(private http:HttpClient) { }
   private _url = 'http://localhost:8080/registration-service/api/v1/register';


  saveUser(userObj): any
  {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type':'application/json'})
      };

    return this.http.post(this._url,userObj,httpOptions);
  }


 
}
