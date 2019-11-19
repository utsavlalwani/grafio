import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-flag-post',
  templateUrl: './flag-post.component.html',
  styleUrls: ['./flag-post.component.css']
})
export class FlagPostComponent implements OnInit {

  constructor( public flagPost: MatDialogRef<FlagPostComponent>) {
    flagPost.disableClose = true;
    flagPost.backdropClick().subscribe(() => {
      // Close the dialog
      this.onNoClick();
    });
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.flagPost.close({cancelled: 'true'});
  }

}
