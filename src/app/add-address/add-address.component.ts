import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addAddress: FormGroup;
  userId: any;
  sameAsTemp: boolean = false 
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(private _snackBar: MatSnackBar ,private fb: FormBuilder, private userinfoService: UserinfoService,	private activatedRoute: ActivatedRoute,private Router:Router) {
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
    this.activatedRoute.params.subscribe(result =>{
     this.userId = result.id
    })
  }

  sameAs(){
    this.sameAsTemp = true
    this.setControl.paddress.setValue(this.setControl.address.value);
    this.setControl.pstate.setValue(this.setControl.state.value);
    this.setControl.pcity.setValue(this.setControl.city.value);
    this.setControl.parea.setValue(this.setControl.area.value);
    this.setControl.pstreet.setValue(this.setControl.street.value);
    this.setControl.ppincode.setValue(this.setControl.pincode.value);  
  }
get setControl(){
  return this.addAddress.controls
}


  onaddAddressNext(){
const data = {
  userId: this.userId,
  temporaryAddress :{
    address: this.addAddress.value.address,
    state: this.addAddress.value.state,
    city : this.addAddress.value.city,
    area : this.addAddress.value.area,
    street: this.addAddress.value.street,
    pincode: this.addAddress.value.pincode,
  },
  permanentAddress :{
    address: this.addAddress.value.paddress,
    state: this.addAddress.value.pstate,
    city : this.addAddress.value.pcity,
    area : this.addAddress.value.parea,
    street: this.addAddress.value.pstreet,
    pincode: this.addAddress.value.ppincode,
  }
}
this.userinfoService.addAddress(data).subscribe(result =>{
  this.Router.navigate(["/document", this.userId])
  this._snackBar.open('Add user address successful',"dismiss", {
    duration: 1000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
  this.addAddress.reset()
}
,(err)=>{
  this._snackBar.open('Something wrong',"dismiss", {
    duration: 1000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
  
}
)
}

}
