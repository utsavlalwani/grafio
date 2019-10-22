import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Articles } from './articles';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url:string;
  //apiKey : string="1fc9b151fd754c708c489de5bf1fe259";

  
  constructor(public http:HttpClient) { }
  getVideos(): Observable<any>{
    let url = "GET https://api.dailymotion.com/videos?fields=preview_480p_url%2Cchannel%2Cduration%2Cdescription%2Cowner.fullname%2Cpublished%2Ctitle&limit=15&channel=news";
    return this.http.get<any>(url)
    .pipe(map((res) => {
      return res;
    }))
  }
    getApi(): Observable<any>{
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=1fc9b151fd754c708c489de5bf1fe259";
      return this.http.get<any>(url)
      .pipe(map((res) => {
        return res;
      }))
    }

      getApiforUS(): Observable<any>{
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=1fc9b151fd754c708c489de5bf1fe259";
        return this.http.get<any>(url)
        .pipe(map((res) => {
          return res;
        }))
     
      
      



  
  // getApi(): Observable<any>{
  //     let url = "/assets/trial.json";
  //     return this.http.get<any>(url);
}
}
