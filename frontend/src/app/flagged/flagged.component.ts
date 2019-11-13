import { Component, OnInit } from '@angular/core';
import {PostedService} from '../services/posted.service';

@Component({
  selector: 'app-flagged',
  templateUrl: './flagged.component.html',
  styleUrls: ['./flagged.component.css']
})
export class FlaggedComponent implements OnInit {

  posts: any;
  breakpoint: number;

  constructor(private posted: PostedService) { }

  ngOnInit() {
    this.posted.getPosts().subscribe(data => {
      this.posts = data['flagged'];

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
