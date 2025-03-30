// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-job-details',
//   templateUrl: './job-details.component.html',
//   styleUrls: ['./job-details.component.css']
// })
// export class JobDetailsComponent {

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job: any = null; 
  private apiUrl = 'https://localhost:7115/api/Jobs/9'; // 🔹 نطلب وظيفة محددة

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      if (response.success) {
        console.log(response.data); // ✅ تأكد أن البيانات صحيحة
        this.job = response.data;  // 🔹 استخراج `data` فقط
      }
    });
  }
}
