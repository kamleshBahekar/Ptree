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
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddAddressComponent,
    AddDocumentComponent,
    FormDetailsComponent
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
    SheardModule
  ],
  exports: [
    MatSnackBarModule,
    MatButtonModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
