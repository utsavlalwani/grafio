import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-search-mobile',
  templateUrl: './search-mobile.component.html',
  styleUrls: ['./search-mobile.component.css']
})
export class SearchMobileComponent implements OnInit {

  constructor(private router : Router,
    private http: HttpClient) { }

  ngOnInit() {
  }
  search(query) {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigateByUrl('/search/' + query);
    });
  }
}
