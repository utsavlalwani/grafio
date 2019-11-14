import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  handler: any;


  constructor(private http: HttpClient,private router: Router) { }


  private invalidfeedback: string;

  chargeCreditCard() {
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        console.log(token);
        this.invalidfeedback = "";
        this.router.navigate(['/loading']).then();



        this.chargeCard(token);
      } else {
        console.log(response.error.message);
        this.invalidfeedback = response.error.message;

      }
    });
  }


  chargeCard(token: string) {
    const header = {
      "token": token,
      "amount": "20000"

    };
    const httpOptions = {
      headers: header
    };
    const headers = new Headers({'token': token, 'amount': "100"});
    this.http.post('http://localhost:8181/api/v1/payment', {}, httpOptions)
      .subscribe(resp => {

        console.log("RESP = ",resp);

      })
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
