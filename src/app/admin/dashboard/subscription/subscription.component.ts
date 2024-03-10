import { Component } from '@angular/core';
;
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  
})
export class SubscriptionComponent {

  subscription: any[]=[];
  public dataLoaded: boolean = false; 

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    // this. getAllsubscriptionList();
  }

  // getAllsubscriptionList(){
  //   this.service.getAllSubscriptionDetails().subscribe({
  //     next: (res: any) => {
  //       this.dataLoaded = true;
  //       this.subscription = res.all_subscription;
  //       console.log(res)
  //     },
  //     error: (err: any) => {
  //       alert(err);
  //     }
  //   });
  // }
}
