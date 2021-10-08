import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private router: Router,private spinner: NgxSpinnerService){
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }
    navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide()
        }, 2000);
        console.log('NavigationStart')
      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
        console.log('NavigationEnd')
  
      }
  
      // Set loading state .hide() in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.spinner.hide();
        console.log('NavigationCancel')
      }
      if (event instanceof NavigationError) {
        this.spinner.hide();
        console.log('NavigationError')
  
      }
    }
  }