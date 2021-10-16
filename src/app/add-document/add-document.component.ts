import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  userId: any;
  @Output() nextClick = new EventEmitter<string>();
  @Output() backClick = new EventEmitter<string>();
  file: any;
  sign: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";
  idUser: any;
  constructor(private spinner: NgxSpinnerService, private _snackBar: MatSnackBar ,private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService,private Router:Router) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(result =>{
    //   this.userId = result.id
    //  })
   
     this.userId = sessionStorage.getItem('id');
     this.idUser = sessionStorage.getItem('userId');
     console.log("this.userId",this.userId);
     console.log("this.idUser", this.idUser);
     if(this.idUser){
      this.getDocument();
    }
  }


  getDocument(){
    this.userinfoService.getDocument(this.idUser).subscribe((result:any)=>{
      console.log("result",result);
      this.file = result.data.avatar
      this.sign = result.data.sign
    })
  }



  handleChange(files: FileList) {
    this.spinner.show();
    this.userinfoService.uploadImage(files).subscribe((result:any) =>{
      this.file = result.files[0]
      this.spinner.hide();
    })  

  }
  handleChangeSign(files: FileList) {
    this.spinner.show();
    this.userinfoService.uploadImage(files).subscribe((result:any) =>{
      this.sign = result.files[0]
      this.spinner.hide();
    })  
  }

  onSubmit(){
    this.userId = sessionStorage.getItem('id');
    console.log("this.userId",this.userId);
    this.nextClick.emit();
    this.spinner.show();
   
    if(this.idUser){
      const data = {
        avatar: this.file,
        sign: this.sign,
        userId: this.idUser
       }
       console.log("data",data)
      this.userinfoService.updateDocument(this.idUser,data).subscribe((result:any)=>{
        console.log("result",result)
        this.Router.navigate(["/details", this.idUser])
        this._snackBar.open('Update user document upload successful',"dismiss", {
         duration: 1000,
         horizontalPosition: this.horizontalPosition,
         verticalPosition: this.verticalPosition,
        });
      })
      
    }
    if(this.userId){

      this.userId = sessionStorage.getItem('id');
      console.log("this.userId",this.userId);
      this.nextClick.emit();
      const data = {
        avatar: this.file,
        sign: this.sign,
        userId: this.userId
       }
       console.log("data",data)
   this.userinfoService.addDocument(data).subscribe(result =>{
    this.Router.navigate(["/details", this.userId])
    this._snackBar.open('Add user document upload successful',"dismiss", {
     duration: 1000,
     horizontalPosition: this.horizontalPosition,
     verticalPosition: this.verticalPosition,
    });
  this.spinner.hide();
   },
   (err)=>{
    console.log(err)
    
  //   this._snackBar.open('Something Wrong',"dismiss", {
  //     duration: 1000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  // });
  this.spinner.hide();
  })
  }
}
  onBack(){
    this.backClick.emit();
  }
}
