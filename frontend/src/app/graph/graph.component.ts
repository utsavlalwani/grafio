import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) private chartRef;
  category1 = [];
  views = [];
  likes = [];
  flag = [];
  chart: any;
  title = [];
  data = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    let _url = 'https://newszoid.stackroute.io:8443/content-service/api/v1/post/trending';
    this.http.get(_url).subscribe((data: any) => {
      if (data) {
        data.forEach(post => {
          this.category1.push(post.category);
          this.title.push(post.title);
          this.views.push(post['watchedBy'].length);
          if (post['likedBy'] == null) {
            this.likes.push(0);
          }
          else
            this.likes.push(post['likedBy'].length);
          if (post['flaggedBy'] == null)
            this.flag.push(0);
          else
            this.flag.push(post['flaggedBy'].length);
        });
      }
    });
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.title,
        datasets: [
          {
            label: 'views',
            data: this.views,
            backgroundColor: '#aad2ed',
          },
          {
            label: 'likes',
            data: this.likes,
            backgroundColor: '#EF6C00',
          },
          {
            label: 'flag',
            data: this.flag,
            backgroundColor: '#00796B'
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Trending News Analysis',
          fontSize: 30
        },
        legend: {
          display: true,
          position: 'top',
          // labels: {
          //   boxWidth: 10
          // }

        },
        scales: {
          xAxes: [{
            display: true,
            stacked: true,
            ticks: {
              fontSize: 12,
              fontStyle: 'bold'
            },
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 10,
              stepSize: 1,
            }

          }],
        }
      }
    });

  }
}
