import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplyJobComponent } from './apply-job/apply-job.component';
import { AddJobComponent } from './add-job/add-job.component';
import { GetjodappsComponent } from './getjodapps/getjodapps.component';
import { GetuserjobsComponent } from './getuserjobs/getuserjobs.component';
import { LoginComponent } from './login/login.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"jobDetails",component:JobDetailsComponent},
  {path:"applyjob",component:ApplyJobComponent},
  {path:"addjob",component:AddJobComponent},
  {path:"getjobapps",component:GetjodappsComponent},
  {path:"getuserjobs",component:GetuserjobsComponent},
  {path:"login",component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }