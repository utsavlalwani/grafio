import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {PostedService} from '../services/posted.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  posts: any;
  breakpoint: number;
  panelOpenState = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        })
    };
    this.http.get(environment.uploadPostUrl + 'trending', httpOptions).subscribe(
      (data) => {
        this.posts = data;

      this.breakpoint = (window.innerWidth <= 600) ? 1:(window.innerWidth <= 959 && window.innerWidth > 600 )
        ? 2:(window.innerWidth <= 1279 && window.innerWidth > 959 ) ? 3:(window.innerWidth <= 1919
          && window.innerWidth > 1279 ) ? 4:5;;
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : (window.innerWidth <= 959 && window.innerWidth > 600 )
      ? 2:(window.innerWidth <= 1279 && window.innerWidth > 959 ) ? 3:(window.innerWidth <= 1919
        && window.innerWidth > 1279 ) ? 4:5;;
  }
}
