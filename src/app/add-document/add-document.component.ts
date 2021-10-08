import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  userId: any;
  file: any = "assets/WhatsApp Image 2021-10-04 at 4.29.05 PM (1).jpeg";
  sign: any = "assets/WhatsApp Image 2021-10-04 at 4.29.05 PM.jpeg";
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(private _snackBar: MatSnackBar ,private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService,private Router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(result =>{
      this.userId = result.id
     })
  }

  handleChange(files: FileList) {
    this.userinfoService.uploadImage(files).subscribe((result:any) =>{
      console.log("result",result.files);
      this.file = result.files
    })  
  }
  handleChangeSign(files: FileList) {
    this.userinfoService.uploadImage(files).subscribe((result:any) =>{
      console.log("result",result.files);
      this.sign = result.files
    })  
  }

  onSubmit(){
   const data = {
    avatar: this.file[0],
    sign: this.sign[0],
    userId: this.userId
   }
console.log(data)
   this.userinfoService.addDocument(data).subscribe(result =>{
     this.Router.navigate(["/details", this.userId])
     this._snackBar.open('Add user information successful',"dismiss", {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
});
   },
   (err)=>{
    console.log(err)
    this._snackBar.open('Something Wrong',"dismiss", {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
});
   
  })
  }

}
