import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StepperComponent } from './stepper/stepper.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
    {path: "login", component:LoginComponent, canActivate: [NonAuthGuard],},
  {path: "registration", component:RegistrationComponent, canActivate: [NonAuthGuard],},
  {    
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuard],},
  {path: "stepper", component: StepperComponent, canActivate: [AuthGuard],},
  {path: "stepper/:id", component: StepperComponent, canActivate: [AuthGuard],},
  {path:"addUser",component: AddUserComponent, canActivate: [AuthGuard],},
  {path:"user",component: AddAddressComponent, canActivate: [AuthGuard],},
  {path:"document",component: AddDocumentComponent, canActivate: [AuthGuard],},
  {path:"details/:id",component: FormDetailsComponent, canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
