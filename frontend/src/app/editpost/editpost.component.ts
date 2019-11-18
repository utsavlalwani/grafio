import {Component, Inject, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  id: number;
  title: string;
  category: string;
  location: string;
  videoUrl: string;
  timestamp: string;
  post: any;
  locations = environment.locations;
  categories = ['National', 'International',
    'Business', 'Technology', 'Entertainment',
    'Sports', 'Science', 'Health'];
  constructor(public dialog: MatDialog,
              private http: HttpClient,
              private router: Router,
              private dialogRef: MatDialogRef<EditpostComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.location = data.location;
    this.videoUrl = data.videoUrl;
    this.timestamp = data.timestamp;
  }
  ngOnInit() {
  }
  addPost(input: NgForm) {
    const username = localStorage.getItem('username');
    this.post = {
      id: this.id,
      title: input.value.title,
      category: input.value.category,
      location: input.value.location,
      videoUrl: this.videoUrl,
      timestamp: this.timestamp,
      postedBy: username,
      likedBy: [],
      flaggedBy: [],
      watchedBy: [],
      boughtBy: []
    };
    console.log(this.post);
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        })
    };
    this.http.put(environment.uploadPostUrl, this.post, httpOptions).subscribe(data => {
      this.router.navigateByUrl('/404').then((dat) => {
        this.router.navigateByUrl('/posted');
      });
    });
  }
}
