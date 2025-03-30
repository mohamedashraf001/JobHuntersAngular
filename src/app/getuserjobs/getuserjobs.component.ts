import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-getuserjobs',
  templateUrl: './getuserjobs.component.html',
  styleUrls: ['./getuserjobs.component.css']
})
export class GetuserjobsComponent implements OnInit {
  jobs: any[] = [];  // Store job listings
  apiUrl: string = 'https://localhost:7115/api/Jobs';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.http.get<{ data: any[] }>(this.apiUrl).subscribe(
      response => {
        this.jobs = response.data;
      },
      error => {
        console.error('Error fetching jobs:', error);
      }
    );
  }
}
