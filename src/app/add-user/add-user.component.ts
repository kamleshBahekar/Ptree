import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserinfoService } from '../service/userinfo.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	addUser: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private _snackBar: MatSnackBar ,private fb: FormBuilder, private userinfoService: UserinfoService, private Router:Router) {
    this.addUser = fb.group({
      'firstName' : [null, Validators.required],
      'middleName':[null, Validators.required],
      'lastName':[null, Validators.required],
      'email':[null, Validators.required],
      'mobile':[null, Validators.required],
      'age':[null, Validators.required],
      'dob':[null, Validators.required],
      });
    }
  ngOnInit(): void {
  }


  onNext(){
  const data = {  ...this.addUser.value }
  console.log("data",data)
    this.userinfoService.addUser(data).subscribe((result:any) =>{
      this.Router.navigate(["/user",result.data.userId])
      this._snackBar.open('Add user information successful',"dismiss", {
				duration: 1000,
				horizontalPosition: this.horizontalPosition,
				verticalPosition: this.verticalPosition,
			});
    })
    this.addUser.reset()
  }

}
