import { Component, OnInit } from '@angular/core';
import  {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { UserRegistration } from '../user-registration.service';
import { Observable }    from 'rxjs';
import { PasswordValidation } from './password-validator';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  providers: [DatePipe]
})
export class UserRegistrationComponent implements OnInit {

  registerForm:FormGroup;
  submitted=false;
  hide = true;
  
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';

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
  selectedOptions: string[] = [];

  selectedOption;
  onNgModelChange($event){
    console.log($event);
    this.selectedOption=$event;

  }

  
  constructor(private formBuilder:FormBuilder,private userRegistration: UserRegistration,private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
  //   this.registerForm = this.formBuilder.group({
  //     title: ['', Validators.required],
  //     firstName: ['', Validators.required,Validators.pattern('[a-zA-Z]+')],
  //     lastName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', Validators.required],
  //     interests: [''],
  //     acceptTerms: [false, Validators.requiredTrue],
  //     date: ['', Validators.required]
  // }, {
  //     validator: MustMatch('password', 'confirmPassword')
  // });

  

  this.createForm();
    this.setChangeValidate()
  }


  

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, Validators.required],
      'userName': [null, Validators.required],
      'date': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tonasy@gmAASail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.formGroup.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n');
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formGroup.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.formGroup.reset();
  }

  userObject:any;
  register(name,userName,email,dateOfBirth,password,newsPreferences){

    dateOfBirth=this.datePipe.transform(dateOfBirth,"yyyy-MM-dd");
    this.userObject={
      "name":name,
      "username":userName,
      "email":email,
      "password": password,
      "dateOfBirth": dateOfBirth,
      "newsPreferences": newsPreferences
    } ;
    console.log(this.userObject);

    this.userRegistration.saveUser(this.userObject)
    .subscribe(
      ()=>{this.ngOnInit();
        this.router.navigateByUrl('/login');
      }
    );

    
  }

 

}
