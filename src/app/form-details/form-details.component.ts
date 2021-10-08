import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserinfoService } from '../service/userinfo.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit {
  userId: any;
  details: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private spinner: NgxSpinnerService,private _snackBar: MatSnackBar , private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.params.subscribe(result =>{
      this.userId = result.id
      this.userinfoService.getDetail(this.userId).subscribe((result:any) => {
        this.details = result.data
        this.spinner.hide();
      })
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

}