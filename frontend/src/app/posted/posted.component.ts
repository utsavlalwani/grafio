import { Component, OnInit } from '@angular/core';
import {PostedService} from '../services/posted.service';

@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  posts: any;
  constructor(private posted: PostedService) { }

  ngOnInit() {
    this.posted.getPosts().subscribe(data => {
      this.posts = data['posts'];

      var occurs = 0;
  
      // for (var i=0; i<this.posts.length; i++) {
      //   if (this.posts.title.length()>0 ) occurs++;
      // }
    });
   
  }

}
