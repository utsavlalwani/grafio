import { AfterContentInit,Component, OnInit,ViewChild } from '@angular/core';
import {PostedService} from '../services/posted.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';
@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {


  posts: any;
  breakpoint: number;

  constructor(private posted: PostedService) { }
  
  ngOnInit() {

    this.posted.getPosts().subscribe(data => {
      this.posts = data['posts'];
   
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

