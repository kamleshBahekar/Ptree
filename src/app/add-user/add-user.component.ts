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
  submitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";
  userId: any;
  editId:any;

  constructor(private activatedRoute: ActivatedRoute ,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar ,private fb: FormBuilder, private userinfoService: UserinfoService, private Router:Router) {
    this.addUser = fb.group({
      'firstName' : [null, Validators.required],
      'middleName':[null, Validators.required],
      'lastName':[null, Validators.required],
      'email': ["", [Validators.required, Validators.email]],
      'mobile': ["", [Validators.required, Validators.minLength(6)]],
      'gender':[null, Validators.required],
      'dob':[null, Validators.required],
      });
      this.userinfoService.SharingData.subscribe((res:any)=>{
        console.log("res",res)
      })
    }

    get f() {
      return this.addUser.controls;
    }
  ngOnInit(): void {
    
    this.spinner.show();
    this.activatedRoute.params.subscribe(result =>{
      this.editId = result.id
      this.userinfoService.SharingData.next(result.id);
      sessionStorage.setItem('editId',this.editId); 
      this.userinfoService.getUse(this.editId).subscribe((result:any)=>{
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
    this.submitted = true;
    this.spinner.show();
    const data = {  ...this.addUser.value }
    console.log("data",data)
    if(this.editId){
      this.userinfoService.updateUser(this.editId,data).subscribe((result:any)=>{
        console.log("result",result)
        this.nextClick.emit();
        sessionStorage.setItem('id',result.data.userId); 
        this._snackBar.open(result.data.message,"dismiss", {
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
        console.log("result",result)
        sessionStorage.setItem('id',result.data.userId); 
       // this.Router.navigate(["/user",result.data.userId])
        this._snackBar.open(result.data.message,"dismiss", {
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
