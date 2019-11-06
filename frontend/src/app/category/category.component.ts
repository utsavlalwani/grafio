import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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
      icon: 'emoji_objects'
    },
    {
      name: 'Health',
      icon: 'fitness_center'
    },
  ];
  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }
  posts: any;
  ngOnInit() {
    this.route.url.subscribe(url => {
      this.categoryName = this.route.snapshot.paramMap.get('categoryName');
      this.categories.forEach((c: category) => {
        if (c.name === this.categoryName) {
          this.category = c;
        }
      });
      this.http.get('http://13.235.222.93:8080/search-service/api/v1/category/' + this.category.name).subscribe(
        (data) => {
          this.posts = data['posts'];
        }
      );
    });
  }

}
