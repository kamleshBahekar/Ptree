import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserinfoService } from '../service/userinfo.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() nextClick = new EventEmitter<string>();
	addUser: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";
  userId: any;
  id:any;

  constructor(private activatedRoute: ActivatedRoute ,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar ,private fb: FormBuilder, private userinfoService: UserinfoService, private Router:Router) {
    this.addUser = fb.group({
      'firstName' : [null, Validators.required],
      'middleName':[null, Validators.required],
      'lastName':[null, Validators.required],
      'email':[null, Validators.required],
      'mobile':[null, Validators.required],
      'gender':[null, Validators.required],
      'dob':[null, Validators.required],
      });
    }
  ngOnInit(): void {
    
    this.spinner.show();
    this.activatedRoute.params.subscribe(result =>{
      this.id = result.id
      sessionStorage.setItem('userId',this.id); 
      this.userinfoService.getUse(this.id).subscribe((result:any)=>{
        console.log(result)

        this.addUser.patchValue({
          email:result.data.email,
          firstName:result.data.firstName,
          middleName:result.data.middleName,
          lastName:result.data.lastName,
          mobile:result.data.mobile,
          gender:result.data.gender,
          dob:result.data.dob,
        })
      })

    })
  }
      
  


  onNext(){
    this.spinner.show();
    const data = {  ...this.addUser.value }
    console.log("data",data)
    if(this.id){
      this.userinfoService.updateUser(this.id,data).subscribe((result:any)=>{
        console.log("result",result)
        this.nextClick.emit();
        sessionStorage.setItem('id',result.data.userId); 
        this._snackBar.open('Update user information successful',"dismiss", {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.spinner.hide();
        this.addUser.reset()
      })
      }
    else{
      this.userinfoService.addUser(data).subscribe((result:any) =>{
        this.nextClick.emit();
        sessionStorage.setItem('id',result.data.userId); 
       // this.Router.navigate(["/user",result.data.userId])
        this._snackBar.open('Add user information successful',"dismiss", {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.spinner.hide();
        this.addUser.reset()
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

}
