import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    // localhost:4200 => login page
    path:'',component:LoginComponent
  },
  {
     // localhost:4200/register => Registration page
    path:'register',component: RegistrationComponent
  },
  {
    // localhost:4200/Transaction => TransactionComponent page
   path:'transaction',component:TransactionComponent
  },
  {
    // localhost:4200/Dashboard => DashboardComponent page
   path:'dashboard',component:DashboardComponent
  },
  {
    // localhost:4200/PageNotFound => PageNotFound page
   path:'**',component:PageNotFoundComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
