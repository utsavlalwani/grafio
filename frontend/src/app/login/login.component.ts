import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {User} from './user';
import { AuthenticationService } from '../authentication.service';
import {FormGroup, FormBuilder, Validators, FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
  }
  errorm : string;
  loginUser(myForm: NgForm){
    let user: User = {
      username: myForm.value.username,
      password: myForm.value.password
    };
    user.username = myForm.value.username;
    user.password = myForm.value.password;
    console.log('user: ', user);
    this.authenticationService.loginUser(user).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('/dashboard');
    },error=>{
      
      this.errorm = "Incorrect username or password";
    });
  }
}
