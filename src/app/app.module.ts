import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SheardModule } from '../../src/app/sheard/sheard.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgxPrintModule } from 'ngx-print';
import { UserListComponent } from './user-list/user-list.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StepperComponent } from './stepper/stepper.component';
// MDB Angular Pro
import { StepperModule, WavesModule } from 'ng-uikit-pro-standard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'
// MDB Angular Pro
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddAddressComponent,
    AddDocumentComponent,
    FormDetailsComponent,
    UserListComponent,
    StepperComponent,
    LoginComponent,
    RegistrationComponent,

   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    SheardModule,
    NgxPrintModule,
    StepperModule,
    WavesModule
  
  ],
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
