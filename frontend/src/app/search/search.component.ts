import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private http:HttpClient,
              private route: ActivatedRoute,
              private router: Router) { }

  breakpoint:number;
    query1: string;
  ngOnInit() {
    const query = this.route.snapshot.paramMap.get('query');
    this.search(query);
    this.breakpoint = (window.innerWidth <= 777) ? 1:(window.innerWidth <= 1120 && window.innerWidth > 777 )
    ? 2:( window.innerWidth > 1120 ) ? 3:4;
    this.query1=query;
  }

  response: any;
  search(query) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        })
    };
   this.http.get('https://newszoid.stackroute.io:8443/search-service/api/v1/category/'+query,httpOptions).subscribe(
     (data) => {
      this.response = data['posts'];
     }, (error) => {
       this.http.get('https://newszoid.stackroute.io:8443/search-service/api/v1/location/'+query,httpOptions).subscribe(
        (data) => {
         this.response = data['posts'];
        }, (error) => {
          console.log(error);
          this.router.navigateByUrl('/404');
        })
     }
   );
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 777) ? 1:(window.innerWidth <= 1120 && window.innerWidth > 777 )
    ? 2:( window.innerWidth > 1120 ) ? 3:4;
  }



}
