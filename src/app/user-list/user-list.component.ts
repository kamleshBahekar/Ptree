import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserinfoService } from '../service/userinfo.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
page  =1
limit :any = 5
tableData:any
displayedColumns = [];
dataSource ;
displayedRows: [string, unknown][];
Class: any;
data: any;
Id: any;
Admin: boolean;
Designation: any;
Loading = true
horizontalPosition: MatSnackBarHorizontalPosition = "right";
verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(private _snackBar: MatSnackBar,private router:Router, private spinner: NgxSpinnerService,private userinfoService: UserinfoService) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit(): void {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("editId");
    this.spinner.show();
    this.userinfoService.getList(this.page,this.limit).subscribe((resData:any)=>{
      this.Class = resData.data
      console.log("resData.data",resData.data)
       this.Class =[]
     for (let index = 0; index < resData?.data?.length; index++) {
       const element = resData.data[index];
       const arr = {
         "Sr.No":'',
         "First Name": element.firstName,
         "Last Name": element.lastName,
         "mobile Number" : element.mobile,
         "Email" : element.email,
         "Action" : element._id,
       };
       this.Class.push(arr)
     }
    this.displayedColumns = Object.keys(this.Class[0]);
   this.displayedRows = Object.entries(this.Class[0]);
  this.dataSource = new MatTableDataSource(this.Class);
  // this.dataSource.paginator = this.paginator;
  this.paginator.firstPage()

  this.spinner.hide();
    })
   
  }



  onEdit(id){
    console.log('onEdit',id);
    this.router.navigate(["/stepper",id])
  }


  onDelete(id){
    this.spinner.show();
   this.userinfoService.deleteUser(id).subscribe((result:any)=>{
     console.log("result",result)
     this.ngOnInit()
     this._snackBar.open('User delete successful',"dismiss", {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.spinner.hide();
   })
  }
  logout(){
    sessionStorage.removeItem("accessToken");
    this._snackBar.open('Logout successful',"dismiss", {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.spinner.hide();
    this.router.navigate(['login']);
  
  }
  onPage(event:PageEvent){
    console.log("event",event)
    console.log("event",event.pageSize)
    this.limit = event.pageSize
    this.ngOnInit()
  }
}
