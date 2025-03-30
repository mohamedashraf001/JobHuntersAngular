import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {
  job = {
    title: '',
    description: '',
    companyName: '',
    requirements: '',
    salary: 0,
    location: '',
    contactEmail: '',
    contactPhone: '',
    externalApplicationLink: '',
    addedByUserId: 1,
    jobCategoryId: 0,
    status: 'Open',
    jobType: '',
    experienceLevel: '',
    jobPlace: ''
  };
  jobPlaces = ['Onsite', 'Remote', 'Hybrid'];
  jobStatuses = ['Open', 'Closed', 'Pending'];
  jobTypes = ['Fulltime', 'Parttime', 'Internship', 'Projectwork'];
  experienceLevels = ['Entrylevel', 'Junior', 'Midlevel', 'Senior', 'Lead'];
  apiUrl = 'https://localhost:7115/api/Jobs'; // تعديل الرابط حسب الحاجة

  constructor(private http: HttpClient) {}

  submitJob() {
    this.http.post(this.apiUrl, this.job).subscribe(
      response => {
        console.log('Job posted successfully', response);
        alert('Job posted successfully!');
      },
      error => {
        console.error('Error posting job', error);
        alert('Failed to post job. Please try again.');
      }
    );
  }
}
