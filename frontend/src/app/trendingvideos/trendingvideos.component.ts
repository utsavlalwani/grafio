import { Component, OnInit } from '@angular/core';
import { Articles } from '../articles'
import { NewsService } from '../news.service';

@Component({
  selector: 'app-trendingvideos',
  templateUrl: './trendingvideos.component.html',
  styleUrls: ['./trendingvideos.component.css']
})
export class TrendingvideosComponent implements OnInit {
  public articles={};
  public USArticles = {};
  constructor(private apiService : NewsService) { }


  ngOnInit() {
    this.apiService.getApi().subscribe(data => this.articles = data);
    this.apiService.getApiforUS().subscribe(data => this.USArticles = data);

    console.log(this.articles);
  }
  
}
