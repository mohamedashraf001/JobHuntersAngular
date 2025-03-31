import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface JobApplication {
  id: number;
  applicationDate: string;
  resumeFile: string;
  comment: string;
  status: string | number;
  job: {
    id: number;
    title: string;
  };
}

@Component({
  selector: 'app-getuserapps',
  templateUrl: './getuserapps.component.html',
  styleUrls: ['./getuserapps.component.css']
})
export class GetuserappsComponent implements OnInit  {
  applications: JobApplication[] = [];
  filteredApplications: JobApplication[] = [];
  currentFilter: string = 'all';
  apiUrl = 'https://localhost:7115/api/JobApplications';
  isLoading: boolean = false;
  statusMessage: { text: string, type: 'success' | 'error' } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.isLoading = true;
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.applications = response.data.map((app: JobApplication) => ({
            ...app,
            status: typeof app.status === 'number' ? this.mapStatusValue(app.status) : app.status
          }));
          this.filterApplications(this.currentFilter);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching applications:', err);
        this.showMessage('Failed to fetch applications', 'error');
      }
    });
  }

  private mapStatusValue(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Approved';
      case 2: return 'Rejected';
      default: return 'Unknown';
    }
  }

  filterApplications(status: string): void {
    this.currentFilter = status;
    this.filteredApplications = status === 'all'
      ? [...this.applications]
      : this.applications.filter(app => app.status.toString().toLowerCase() === status.toLowerCase());
  }

  downloadResume(filePath: string): void {
    const fileName = filePath.split('\\').pop() || filePath.split('/').pop();
    if (fileName) {
      window.open(`${this.apiUrl}/download/${fileName}`, '_blank');
    }
  }

  private showMessage(text: string, type: 'success' | 'error'): void {
    this.statusMessage = { text, type };
    setTimeout(() => {
      this.statusMessage = null;
    }, 5000);
  }
}
