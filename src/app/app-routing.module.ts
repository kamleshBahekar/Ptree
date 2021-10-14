import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { StepperComponent } from './stepper/stepper.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path: "", component: UserListComponent},
  {path: "stepper", component: StepperComponent},
  {path: "stepper/:id", component: StepperComponent},
  {path:"addUser",component: AddUserComponent},
  {path:"user/:id",component: AddAddressComponent},
  {path:"document/:id",component: AddDocumentComponent},
  {path:"details/:id",component: FormDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
