import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit {
  userId: any;
  details: any;
  addUser: FormGroup;
  addAddress: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar , private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService) {
    this.addUser = fb.group({
      'firstName' : [null, Validators.required],
      'middleName':[null, Validators.required],
      'lastName':[null, Validators.required],
      'email':[null, Validators.required],
      'mobile':[null, Validators.required],
      'gender':[null, Validators.required],
      'dob':[null, Validators.required],
      });
      this.addAddress = fb.group({
        'address' : [null, Validators.required],
        'state':[null, Validators.required],
        'city':[null, Validators.required],
        'area':[null, Validators.required],
        'street':[null, Validators.required],
        'pincode':[null, Validators.required],
        'paddress' : [null, Validators.required],
        'pstate':[null, Validators.required],
        'pcity':[null, Validators.required],
        'parea':[null, Validators.required],
        'pstreet':[null, Validators.required],
        'ppincode':[null, Validators.required],
        });


    }
   

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.params.subscribe(result =>{
      this.userId = result.id
      this.getDetail()
     }
     ,(err)=>{
      this._snackBar.open('Something wrong',"dismiss", {
				duration: 1000,
				horizontalPosition: this.horizontalPosition,
				verticalPosition: this.verticalPosition,
			});
      this.spinner.hide();
    }
    )
  }

getDetail(){
  this.userinfoService.getDetail(this.userId).subscribe((result:any) => {
    this.details = result.data
    console.log(" result.data", result.data)
    this.addUser.patchValue({
      email:result.data[0].email,
      firstName:result.data[0].firstName,
      middleName:result.data[0].middleName,
      lastName:result.data[0].lastName,
      mobile:result.data[0].mobile,
      gender:result.data[0].gender,
      dob:result.data[0].dob,
    })
    this.addAddress.patchValue({
      paddress:result.data[0].permanentAddress.address,
      pstate:result.data[0].permanentAddress.state,
      pcity:result.data[0].permanentAddress.city,
      parea:result.data[0].permanentAddress.area,
      pstreet:result.data[0].permanentAddress.street,
      ppincode:result.data[0].permanentAddress.pincode,
      address:result.data[0].temporaryAddress.address,
      state:result.data[0].temporaryAddress.state,
      city:result.data[0].temporaryAddress.city,
      area:result.data[0].temporaryAddress.area,
      street:result.data[0].temporaryAddress.street,
      pincode:result.data[0].temporaryAddress.pincode,
   })


    this.spinner.hide();
  })
}




}