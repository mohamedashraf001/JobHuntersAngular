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
  selector: 'app-getjodapps',
  templateUrl: './getjodapps.component.html',
  styleUrls: ['./getjodapps.component.css']
})
export class GetjodappsComponent implements OnInit {
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

  updateApplicationStatus(id: number, status: number): void {
    this.isLoading = true;
    this.http.put(`${this.apiUrl}/${id}/status`, status, { headers: { 'Content-Type': 'application/json' } }).subscribe({
      next: () => {
        this.isLoading = false;
        this.showMessage(`Application ${status === 1 ? 'approved' : 'rejected'} successfully`, 'success');
        this.fetchApplications(); // تحديث البيانات بعد التعديل
      },
      error: () => {
        this.isLoading = false;
        this.showMessage('Failed to update application status', 'error');
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
    const fileName = filePath.split('\\').pop();
    if (fileName) {
      window.open(`${this.apiUrl}/download/${fileName}`, '_blank');
    }
  }

  deleteApplication(id: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.isLoading = true;
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.isLoading = false;
          this.showMessage('Application deleted successfully', 'success');
          this.fetchApplications();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error deleting application:', err);
          this.showMessage('Failed to delete application', 'error');
        }
      });
    }
  }

  private showMessage(text: string, type: 'success' | 'error'): void {
    this.statusMessage = { text, type };
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }
}
