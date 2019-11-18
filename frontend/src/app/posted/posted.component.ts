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
   
      this.breakpoint = (window.innerWidth <= 777) ? 1:(window.innerWidth <= 1120 && window.innerWidth > 777 )
    ? 2:( window.innerWidth > 1120 ) ? 3:4;


    });

    }
  
    onResize(event) {
      this.breakpoint = (window.innerWidth <= 777) ? 1:(window.innerWidth <= 1120 && window.innerWidth > 777 )
      ? 2:( window.innerWidth > 1120 ) ? 3:4;


    }
  }

