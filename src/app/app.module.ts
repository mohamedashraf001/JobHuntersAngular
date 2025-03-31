import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { AddJobComponent } from './add-job/add-job.component';
import { GetjodappsComponent } from './getjodapps/getjodapps.component';
import { GetuserjobsComponent } from './getuserjobs/getuserjobs.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { JobDetailsComponent } from './job-details/job-details.component';
import { HomeComponent } from './home/home.component';
import { GetuserappsComponent } from './getuserapps/getuserapps.component';


@NgModule({
  declarations: [
    AppComponent,

    JobDetailsComponent,
  HomeComponent,
     ApplyJobComponent,
     AddJobComponent,
     GetjodappsComponent,
     GetuserjobsComponent,
     LoginComponent,
     HomeComponent,
     GetuserappsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }