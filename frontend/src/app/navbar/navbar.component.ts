import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { UploadComponent } from '../upload/upload.component';
import { Router } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { RegisterService } from '../services/register.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router,
              private category: CategoryComponent,
              private registerService: RegisterService,
              private _bottomSheet: MatBottomSheet) { }

  categories: {
    name: string;
    icon: string;
  }[] = [
      {
        name: 'National',
        icon: 'flag'
      },
      {
        name: 'International',
        icon: 'public'
      },
      {
        name: 'Business',
        icon: 'business'
      },
      {
        name: 'Technology',
        icon: 'memory'
      },
      {
        name: 'Entertainment',
        icon: 'movie'
      },
      {
        name: 'Sports',
        icon: 'directions_bike'
      },
      {
        name: 'Science',
        icon: 'whatshot'
      },
      {
        name: 'Health',
        icon: 'fitness_center'
      },
    ];

  username: string;
  breakpoint: string;


  ngOnInit() {
    console.log('asdas' + localStorage.getItem('username'));
    this.breakpoint = (window.innerWidth <= 600) ? 'over' : 'side';

  }





  onResize(event) {
    this.breakpoint = (window.innerWidth <= 600) ? 'over' : 'side';
  }
  isMobile() {
    return (window.innerWidth <= 450);
  }


  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '270px',
    });
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  openUpload(): void {
    const uploadRef = this.dialog.open(UploadComponent, {
      width: '350px'
    });
  }

  signOut() {
    localStorage.clear();
    this.ngOnInit();
    this.router.navigateByUrl('/trending');
  }

  loggedIn(): boolean {
    this.username = localStorage.getItem('username');
    return (localStorage.getItem('jwt') != null);
  }

  trending(): void {
    this.router.navigateByUrl('/trending');
  }

  recommendation(): void {
    if (this.loggedIn()) {
      this.router.navigateByUrl('/recommended');
    } else {
      this.openLogin();
    }
  }

  liked(): void {
    if (this.loggedIn()) {
      this.router.navigateByUrl('/activities');
    } else {
      this.openLogin();
    }
  }

  posted(): void {
    if (this.loggedIn()) {
      this.router.navigateByUrl('/posted');
    } else {
      this.openLogin();
    }
  }

  upload(): void {
    if (this.loggedIn()) {
      this.openUpload();
    } else {
      this.openLogin();
    }
  }
  graph() {
    this.router.navigateByUrl('/graph');
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetNewsZoid);
  }

}

@Component({
  selector: 'bottom-sheet-news-zoid',
  templateUrl: 'bottom-sheet-news-zoid.html',
  styleUrls: ['./bottom-sheet-news-zoid.css']
})
export class BottomSheetNewsZoid {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetNewsZoid>,
              private router: Router) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }


  TnC(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
    this.router.navigateByUrl('/terms');
  }
  privacy(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
    this.router.navigateByUrl('/privacy');
  }
}



