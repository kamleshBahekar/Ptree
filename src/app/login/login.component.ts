import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	login: FormGroup;
  submitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";
  hide: boolean= true;
  constructor(private spinner: NgxSpinnerService,private _snackBar: MatSnackBar ,private fb: FormBuilder, private userinfoService: UserinfoService, private router: Router,) {
    this.login = fb.group({
      'email': ["", [Validators.required, Validators.email]],
      'password':["", Validators.required]
      });
   }

  ngOnInit(): void {
  }
  get f() {
    return this.login.controls;
  }

  loginForm(){
    this.submitted=true
    this.spinner.show();
    const data = {  ...this.login.value }
     this.userinfoService.login(data).subscribe((result:any)=>{
       console.log("result",result)
       if (result.status == "SUCCESS"){
        this._snackBar.open(result.message.data,"dismiss", {
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
