import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { Video } from '../dashboard/upload'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private uploadService:UploadService) { }
  name = "Satvik";
  userName = "Stark";
  cards = [  

    { cols: 1, rows: 1 },  

    { cols: 1, rows: 1 },  

    { cols: 1, rows: 2 }

     ];  
     taskTypeAreas: {
      name: string;
    }[] = [
      {
        name: 'National'
      },
      {
        name: 'International'
      },
      {
        name: 'Sports'
      },
      {
        name: 'Business'
      },
      {
        name: 'Movies'
      },
      {
        name: 'Technology'
      },
      {
        name: 'Economy'
      },
    ];
   
    
   
  
  ngOnInit() {
  }

  // video:any;
  // upload(videoTitle,videoAuthor)
  // {
  //   this.video={
  //     "videoTitle":videoTitle,
  //     "videoAuthor":videoAuthor
     
  //   } ;
  // }
  // this.uploadService.uploadVideos(video).subscribe(data=>{
  //   console.log(data);
  //   this.router.navigateByUrl('/dashboard');
  // },error=>{
    
  //   this.errorm = "Incorrect username or password";
  // });


}
