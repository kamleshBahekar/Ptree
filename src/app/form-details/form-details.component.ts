import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserinfoService } from '../service/userinfo.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit {
  userId: any;
  details: any;

  constructor(private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(result =>{
      this.userId = result.id
      this.userinfoService.getDetail(this.userId).subscribe((result:any) => {
        this.details = result.data
      })
     })
  }

}
