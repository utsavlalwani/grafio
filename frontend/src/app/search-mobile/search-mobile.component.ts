import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-search-mobile',
  templateUrl: './search-mobile.component.html',
  styleUrls: ['./search-mobile.component.css']
})
export class SearchMobileComponent implements OnInit {

  myControl = new FormControl();

  options: string[] = ['National', 'International', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(startWith(''), map(value => this._filter(value)));
  }
  search(query) {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigateByUrl('/search/' + query);


    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
