import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent implements OnInit {
  breakpoint: number;
  break: number;
  rates: {
    name: string;
    content: string;
  }[] = [{
    name: '50$',
  content: '1 Month'},
    {name: '100$',
  content: '6 Months'},
    {name: '150$',
    content: '1 Year'
  }];
  constructor() { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : (window.innerWidth <= 777 && window.innerWidth > 400) ? 2 : 3;
 }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : (window.innerWidth <= 777 && window.innerWidth > 400) ? 2 : 3;
  }
  // onresize(event) {
  //   this.break = (window.innerWidth <= 400) ? 1 : (window.innerWidth <= 777 && window.innerWidth > 400) ? 2 : 1;
  // }

}
