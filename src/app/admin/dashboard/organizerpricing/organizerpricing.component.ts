import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-organizerpricing',
  templateUrl: './organizerpricing.component.html',
  styleUrls: ['./organizerpricing.component.scss']
})
export class OrganizerpricingComponent implements OnInit{
  orgnizerSubscriptions: any[]=[];

  constructor(private service: ServiceService, private router:Router) { }


  ngOnInit(): void {
    this.ArtistSubscriptions();
  }

  ArtistSubscriptions() {
    this.service.getOrganizerSubscriptionDetails().subscribe({
      next: (res: any) => {
        console.log(res.organizer_subscriptions);
        this.orgnizerSubscriptions = res.organizer_subscriptions;

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
