import { Component, OnInit, Input } from '@angular/core';
import {RegisterService} from '../services/register.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  @Input() post: any;
  views: number;
  plays: boolean;
  constructor(private users: RegisterService,
              private http: HttpClient,
              private router: Router) {
    this.plays = false;
  }


  ngOnInit() {
    if (!this.post.watchedBy) {
      this.views = 0;
    } else {
      this.views = this.post.watchedBy.length;
    }
  }

  postDetail() {
    this.router.navigateByUrl('/postDetail/' + this.post.id);
  }

}
