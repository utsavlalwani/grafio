import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<LoginComponent>) { }
  errorMessage: string = null;
  formisvalid = true;
  ngOnInit() {
  }

  loginUser(myForm: NgForm) {
    const user: any = {
      username: myForm.value.username,
      password: myForm.value.password
    };
    user.username = myForm.value.username;
    user.password = myForm.value.password;
    console.log(user.username + ' ' + user.password);
    this.authenticationService.loginUser(user).subscribe(data => {
      const jwt = data.jwtToken;
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('username', user.username);
      if (user.username.length > 0) {
        this.formisvalid = false;
        this.dialogRef.close();

        this.snackBar.open('You are now logged in!', 'close ', {
          duration: 4000
        });

        this.router.navigateByUrl('/trending');


      }

    }, error => {

      this.errorMessage = 'Incorrect username or password';
    });


  }

}
