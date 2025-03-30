import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent {
  applicationForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.applicationForm = this.fb.group({
      comment: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      coverLetter: [''],
      status: [0],
      useful: [0],
      jobId: [1],
      userId: [1]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    
    Object.keys(this.applicationForm.value).forEach(key => {
      formData.append(key, this.applicationForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('ResumeFile', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('https://localhost:7115/api/JobApplications', formData)
      .subscribe({
        next: (response) => {
          alert('done!!');
          this.applicationForm.reset();
          this.applicationForm.patchValue({
            status: 0,
            useful: 0,
            jobId: 1,
            userId: 1
          });
          this.selectedFile = null;
        },
        error: (err) => {
          // هذا السطر يطبع سبب الخطأ الرئيسي فقط
          console.error('سبب الخطأ:', err.message);
          
          // إذا كان الخادم يرسل تفاصيل إضافية
          if (err.error) {
            console.error('more details', err.error);
          }
          
          alert(' error');
        }
      });
  }
}