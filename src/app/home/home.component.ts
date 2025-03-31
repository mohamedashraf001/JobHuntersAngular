import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  private apiUrl = 'https://localhost:7115/api/Jobs';

  // Filter options
  filters = {
    jobType: {
      fullTime: false,
      partTime: false,
      internship: false,
      projectWork: false
    },
    experienceLevel: {
      entryLevel: false,
      junior: false,
      midLevel: false,
      senior: false,
      lead: false
    },
    jobPlace: {
      onSite: false,
      remote: false,
      hybrid: false
    }
  };

  searchQuery = {
    title: '',
    location: '',
    companyName: ''
  };


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadJobs();
    this.http.get<any>(this.apiUrl).subscribe(response => {
      if (response.success) {
        this.jobs = response.data;
        this.filteredJobs = [...this.jobs];
      }
    });
  }

  applyFilters(): void {
    this.filteredJobs = this.jobs.filter(job => {
      // Check job type filters
      const jobTypeMatch = 
        (!this.filters.jobType.fullTime || job.jobType === 'Fulltime') &&
        (!this.filters.jobType.partTime || job.jobType === 'Parttime') &&
        (!this.filters.jobType.internship || job.jobType === 'Internship') &&
        (!this.filters.jobType.projectWork || job.jobType === 'Projectwork');

      // Check experience level filters
      const experienceMatch = 
        (!this.filters.experienceLevel.entryLevel || job.experienceLevel === 'Entrylevel') &&
        (!this.filters.experienceLevel.junior || job.experienceLevel === 'Junior') &&
        (!this.filters.experienceLevel.midLevel || job.experienceLevel === 'Midlevel') &&
        (!this.filters.experienceLevel.senior || job.experienceLevel === 'Senior') &&
        (!this.filters.experienceLevel.lead || job.experienceLevel === 'Lead');

      // Check job place filters
      const jobPlaceMatch = 
        (!this.filters.jobPlace.onSite || job.jobPlace === 'On-site') &&
        (!this.filters.jobPlace.remote || job.jobPlace === 'Remote') &&
        (!this.filters.jobPlace.hybrid || job.jobPlace === 'Hybrid');

      return jobTypeMatch && experienceMatch && jobPlaceMatch;
    });
  }

  onFilterChange(): void {
    // Check if any filter is selected
    const anyFilterSelected = 
      Object.values(this.filters.jobType).some(val => val) ||
      Object.values(this.filters.experienceLevel).some(val => val) ||
      Object.values(this.filters.jobPlace).some(val => val);

    if (!anyFilterSelected) {
      // If no filters are selected, show all jobs
      this.filteredJobs = [...this.jobs];
    } else {
      // Apply filters
      this.applyFilters();
    }
  }
  loadJobs(): void {
    let url = this.apiUrl;
    const params = [];
    
    if (this.searchQuery.title) {
      params.push(`title=${encodeURIComponent(this.searchQuery.title)}`);
    }
    if (this.searchQuery.location) {
      params.push(`location=${encodeURIComponent(this.searchQuery.location)}`);
    }
    if (this.searchQuery.companyName) {
      params.push(`companyName=${encodeURIComponent(this.searchQuery.companyName)}`);
    }
    
    if (params.length > 0) {
      url += '/search?' + params.join('&');
    }

    this.http.get<any>(url).subscribe(response => {
      if (response.success) {
        this.jobs = response.data;
        this.filteredJobs = [...this.jobs];
      }
    });
  }

  onSearch(): void {
    this.loadJobs();
  }
  
}