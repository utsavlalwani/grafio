import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {MatVideoComponent} from 'mat-video/app/video/video.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EditpostComponent} from '../editpost/editpost.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, AfterViewInit {

  post: any;
  postId: string;
  views: number;
  likes: number;
  flags: number;
  isLiked: boolean;
  isFlagged: boolean;
  isOwner: boolean;
  user: any;

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
  };

  @ViewChild('video', {static: false}) matVideo: MatVideoComponent;
  video: HTMLVideoElement;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');

    this.http.get(environment.uploadPostUrl + this.postId, this.httpOptions).subscribe(
      (data) => {
        this.post = data;
        if (this.post.postedBy === localStorage.getItem('username')) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
        if (!this.post.watchedBy) {
          this.views = 0;
        } else {
          this.views = this.post.watchedBy.length;
        }
        if (!this.post.likedBy) {
          this.likes = 0;
        } else {
          this.likes = this.post.likedBy.length;
          if (this.post.likedBy.indexOf(localStorage.getItem('username')) !== -1) {
            this.isLiked = true;
          }
        }

        if (!this.post.flaggedBy) {
          this.flags = 0;
        } else {
          this.flags = this.post.flaggedBy.length;
          if (this.post.flaggedBy.indexOf(localStorage.getItem('username')) !== -1) {
            this.isFlagged = true;
          }
        }
      }
    );
    this.http.get(environment.registerUrl + '/' + localStorage.getItem('username'), this.httpOptions).subscribe(
      (data) => {
        this.user = data;
      }
    );
  }

  ngAfterViewInit(): void {
    this.video = this.matVideo.getVideoTag();
    this.video.addEventListener('ended', () => this.watch());
  }

  like() {
    if (this.likes === 0) {
      let likes: string[] = [];
      likes.push(localStorage.getItem('username'));
      this.post.likedBy = likes;
    } else {
      const index = this.post.likedBy.indexOf(localStorage.getItem('username'));
      if (index !== -1) {
        this.post.likedBy.splice(index, 1);
        const ind = this.user.liked.indexOf(this.postId);
        if (ind !== -1) {
          this.user.liked.splice(ind, 1);
        }
        this.isLiked = false;
      } else {
        this.post.likedBy.push(localStorage.getItem('username'));
      }
    }

    this.http.put(environment.uploadPostUrl, this.post, this.httpOptions).subscribe(
      (data) => {
        this.http.put(environment.registerUrl+"/"+localStorage.getItem("username"), this.user, this.httpOptions).subscribe();
        this.ngOnInit();
      }
    );
  }

  flag() {
    if (this.flags === 0) {
      const flags: string[] = new Array();
      flags.push(localStorage.getItem('username'));
      this.post.flaggedBy = flags;
    } else {
      const index = this.post.flaggedBy.indexOf(localStorage.getItem('username'));
      if (index !== -1) {
        this.post.flaggedBy.splice(index, 1);
        const ind = this.user.flagged.indexOf(this.postId);
        if (ind !== -1) {
          this.user.flagged.splice(ind, 1);
        }
        this.isFlagged = false;
      } else {
        this.post.flaggedBy.push(localStorage.getItem('username'));
      }
    }

    this.http.put(environment.uploadPostUrl, this.post, this.httpOptions).subscribe(
      (data) => {
        this.http.put(environment.registerUrl, this.user, this.httpOptions).subscribe();
        this.ngOnInit();
      }
    );
  }

  watch() {
    if (this.views === 0) {
      const view: string[] = new Array();
      view.push(localStorage.getItem('username'));
      this.post.watchedBy = view;
    } else {
      const index = this.post.watchedBy.indexOf(localStorage.getItem('username'));
      if (index === -1) {
        this.post.watchedBy.push(localStorage.getItem('username'));
      }
    }

    this.http.put(environment.uploadPostUrl, this.post, this.httpOptions).subscribe(
      () => this.ngOnInit()
    );
  }

  openEdit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.post.id,
      title: this.post.title,
      category: this.post.category,
      location: this.post.location,
      videoUrl: this.post.videoUrl,
      timestamp: this.post.timestamp
    };
    dialogConfig.width = '350px';
    this.dialog.open(EditpostComponent, dialogConfig);
  }

  edit(): void {
    this.openEdit();
  }

  delete(): void {
    const posts = this.user.posts;
    let i = posts.length;
    while (i--) {
      console.log('travesring');
      if (posts[i].id == this.postId) {
        console.log('found!');
        posts.splice(i, 1);
      }
    }
    this.user.posts = posts;
    this.http.put(environment.registerUrl + '/' + localStorage.getItem('username'), this.user, this.httpOptions).subscribe();
    this.http.delete(environment.uploadPostUrl + this.postId, this.httpOptions).subscribe();
  }

}
