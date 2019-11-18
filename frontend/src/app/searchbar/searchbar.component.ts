import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  myControl = new FormControl();

  options: string[] = ['National', 'International', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'];
  filteredOptions: Observable<string[]>;

  constructor(private http: HttpClient,
              private router: Router) { }

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
