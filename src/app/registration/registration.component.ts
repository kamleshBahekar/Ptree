import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	Registration: FormGroup;
  submitted = false;
  hide: boolean= true;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(private router: Router,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar, private fb: FormBuilder, private userinfoService: UserinfoService) {
    this.Registration = fb.group({
      'name' : [null, Validators.required],
      'email': ["", [Validators.required, Validators.email]],
      'mobile' : [null, Validators.required],
      'password':[null, Validators.required],
      'role' : [null, Validators.required],
      });
   }

  ngOnInit(): void {
  }
  get f() {
    return this.Registration.controls;
  }

  registrationForm(){
    this.submitted=true
    this.spinner.show();
    const data = {  ...this.Registration.value }
    this.userinfoService.register(data).subscribe((result:any)=>{
      console.log("result",result)
      if (result.status == "SUCCESS"){
        this._snackBar.open('Login successful',"dismiss", {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['']);
        this.spinner.hide();
          
      }
    },(err)=>{
      this._snackBar.open('Something wrong',"dismiss", {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.spinner.hide();
    }
    )
    
  }

}
