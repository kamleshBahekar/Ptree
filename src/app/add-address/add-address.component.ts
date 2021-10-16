import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addAddress: FormGroup;
  userId: any;
  submitted = false;
  sameAsTemp: boolean = false  
  @Output() nextClick = new EventEmitter<string>();
  @Output() backClick = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  editId: any;
  constructor(private spinner: NgxSpinnerService, private _snackBar: MatSnackBar ,private fb: FormBuilder, private userinfoService: UserinfoService,	private activatedRoute: ActivatedRoute,private Router:Router) {
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
      this.userinfoService.SharingData.subscribe((res:any)=>{
        console.log("res",res)
        this.editId = res
      })
    }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(result =>{
      this.editId = result.id
      sessionStorage.setItem('editId',this.editId); 

    })
    this.userId = sessionStorage.getItem('id')
    console.log("this.userId",this.userId)
    // this.editId = sessionStorage.getItem('editId')
     console.log("this.editId",this.editId)
    // sameAddress: this.sameAsTemp
     if(this.editId){
      this.userinfoService.getAddress(this.editId).subscribe((result:any)=>{
        console.log("resultgggg",result.data.sameAddress)
        //this.sameAsTemp = result.data.sameAddress
        this.addAddress.patchValue({
           address:result.data.permanentAddress.address,
           state:result.data.permanentAddress.state,
           city:result.data.permanentAddress.city,
           area:result.data.permanentAddress.area,
           street:result.data.permanentAddress.street,
           pincode:result.data.permanentAddress.pincode,
           paddress:result.data.temporaryAddress.address,
           pstate:result.data.temporaryAddress.state,
           pcity:result.data.temporaryAddress.city,
           parea:result.data.temporaryAddress.area,
           pstreet:result.data.temporaryAddress.street,
           ppincode:result.data.temporaryAddress.pincode,
        })
      })

      


     }
  }

  sameAs(e){
    console.log("e",e.checked)
    if(e.checked == true){
  this.setControl.paddress.setValue(this.setControl.address.value);
    this.setControl.pstate.setValue(this.setControl.state.value);
    this.setControl.pcity.setValue(this.setControl.city.value);
    this.setControl.parea.setValue(this.setControl.area.value);
    this.setControl.pstreet.setValue(this.setControl.street.value);
    this.setControl.ppincode.setValue(this.setControl.pincode.value);  
    }
    if(e.checked == false){
      this.setControl.paddress.setValue('');
        this.setControl.pstate.setValue('');
        this.setControl.pcity.setValue('');
        this.setControl.parea.setValue('');
        this.setControl.pstreet.setValue('');
        this.setControl.ppincode.setValue('');  
        }
    // this.sameAsTemp = true
  
  }
get setControl(){
  return this.addAddress.controls
}
get f() {
  return this.addAddress.controls;
}

  onaddAddressNext(){
    this.submitted = true;
    this.userId = sessionStorage.getItem('id')
    console.log("this.userId",this.userId)
    this.spinner.show();
    if(this.editId){
      const data = {
        userId: this.editId,
        sameAddress: this.sameAsTemp,
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
  
      this.userinfoService.updateAddress(this.editId,data).subscribe((result:any)=>{
        console.log("result",result)
        this.nextClick.emit();
        this._snackBar.open('Update user address successful',"dismiss", {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.spinner.hide();
        this.addAddress.reset()
      }
        ,(err)=>{
          // this._snackBar.open('Something wrong',"dismiss", {
          //   duration: 1000,
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          // });
          this.spinner.hide();
        }
        )
      }
   if(this.userId) {
      const data = {
        userId: this.userId,
        sameAddress: this.sameAsTemp,
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
        this.nextClick.emit();
        this._snackBar.open('Add user address successful',"dismiss", {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.spinner.hide();
        this.addAddress.reset()
      }
      ,(err)=>{
        // this._snackBar.open('Something wrong',"dismiss", {
        //   duration: 1000,
        //   horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,
        // });
        this.spinner.hide();
      }
      )
    }

  


}

onBack(){
  this.backClick.emit();
}

}
