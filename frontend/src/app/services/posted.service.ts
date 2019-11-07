import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostedService {

  constructor(private http: HttpClient) { }

  getPosts() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Access-Control-Allow-Origin': '*'
        })
    };
    const username = localStorage.getItem('username');
    const url = 'https://newszoid.stackroute.io:8443/registration-service/api/v1/register/' + username;
    return this.http.get(url, httpOptions);
  }
}
