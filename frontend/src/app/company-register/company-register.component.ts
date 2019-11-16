import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  handler: any;


  constructor(private http: HttpClient,private router: Router) { }


  private invalidfeedback: string;

  chargeCreditCard(name,pass,num,exp,cvv) {
    // let form = document.getElementsByTagName("form")[0];
    let arr = exp.split('/',2);
    (<any>window).Stripe.card.createToken({
      number: num,
      exp_month: arr[0],
      exp_year: arr[1],
      cvc: cvv
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        console.log(token);
        this.invalidfeedback = "";
        this.router.navigate(['/trending']).then();



        this.chargeCard(token, name, pass);
      } else {
        console.log(response.error.message);
        this.invalidfeedback = response.error.message;

      }
    });
  }


  chargeCard(token: string, name, pass) {
    const header = {
      "token": token,
      "amount": "20000",
      'Content-Type': 'application/json',

    };
    const httpOptions = {
      headers: header
    };
    const headers = new Headers({'token': token, 'amount': "100"});
    var parameter = JSON.stringify({username:name, password:pass});
    console.log(parameter);
    this.http.post('https://newszoid.stackroute.io:8443/registration-service/api/v1/charge', parameter, httpOptions)
      .subscribe(resp => {

        console.log("RESP = ",resp);

      });
  }




  ngOnInit() {

    this.loadStripe();

  }


  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_wjGbwX82splBNjohcWU6nBh4008Uzxzm9Z',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            console.log('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }

}
