import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  recs: any;
  breakpoint: number;
  posts: any;
  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        })
    };
    this.http.get('https://newszoid.stackroute.io:8443/recommendation-service/recommend/'
      + localStorage.getItem('username'), httpOptions).subscribe(
        (data) => {
          this.posts = data;
        }/*, (error) => {
        this.router.navigateByUrl('/404');
      }*/
      );
    this.breakpoint = (window.innerWidth <= 600) ? 1 : (window.innerWidth <= 959 && window.innerWidth > 600)
      ? 2 : (window.innerWidth <= 1279 && window.innerWidth > 959) ? 3 : (window.innerWidth <= 1919
        && window.innerWidth > 1279) ? 4 : 5;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : (window.innerWidth <= 959 && window.innerWidth > 600)
      ? 2 : (window.innerWidth <= 1279 && window.innerWidth > 959) ? 3 : (window.innerWidth <= 1919
        && window.innerWidth > 1279) ? 4 : 5;


  }

}
