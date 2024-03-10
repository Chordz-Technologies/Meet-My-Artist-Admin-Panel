import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-userpricing',
  templateUrl: './userpricing.component.html',
  styleUrls: ['./userpricing.component.scss']
})
export class UserpricingComponent implements OnInit {

  userSubscriptions: any[] = [];

  constructor(private service: ServiceService, private router:Router) { }


  ngOnInit(): void {
    this.UserSubscriptions();
  }

  UserSubscriptions() {
    this.service.getUserSubscriptionDetails().subscribe({
      next: (res: any) => {
        console.log(res.user_subscriptions);
        this.userSubscriptions = res.user_subscriptions;

      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Error fetching data. Check the console for details.');
      },
    })
  }
  edit(id: number) {
    this.router.navigate(['/home/editsubscription/', id]);
  }

}

