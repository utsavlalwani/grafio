import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './dashboard/upload';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http:HttpClient) { }
  uploadVideos(video : Video):any  {
    let url = "http://localhost:8080/api/v1/content";
    return this.http.post(url,video, httpOptions)
  }
}
