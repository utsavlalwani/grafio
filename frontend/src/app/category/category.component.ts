import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

class category {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryName: string;
  category: category;
  breakpoint:number;
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
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) { }
  posts: any;
  ngOnInit() {
    this.route.url.subscribe(url => {
      this.categoryName = this.route.snapshot.paramMap.get('categoryName');
      this.categories.forEach((c: category) => {
        if (c.name === this.categoryName) {
          this.category = c;
        }
        this.breakpoint = (window.innerWidth <= 600) ? 1:(window.innerWidth <= 959 && window.innerWidth > 600 ) 
        ? 2:(window.innerWidth <= 1279 && window.innerWidth > 959 ) ? 3:(window.innerWidth <= 1919 
        && window.innerWidth > 1279 ) ? 4:5;;


      });
      const httpOptions = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          })
      };
      this.http.get(environment.categoryUrl + this.category.name, httpOptions).subscribe(
        (data) => {
          this.posts = data['posts'];
        }, (error) => {
          this.router.navigateByUrl('/404');
        }
      );
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : (window.innerWidth <= 959 && window.innerWidth > 600 )
                       ? 2:(window.innerWidth <= 1279 && window.innerWidth > 959 ) ? 3:(window.innerWidth <= 1919
                       && window.innerWidth > 1279 ) ? 4:5;;


  }

}
