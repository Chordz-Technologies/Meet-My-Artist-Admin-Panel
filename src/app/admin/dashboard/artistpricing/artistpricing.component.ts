import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-artistpricing',
  templateUrl: './artistpricing.component.html',
  styleUrls: ['./artistpricing.component.scss']
})
export class ArtistpricingComponent implements OnInit {
  artistSubscriptions: any[] = [];

  constructor(private service: ServiceService, private router:Router) { }


  ngOnInit(): void {
    this.ArtistSubscriptions();
  }

  ArtistSubscriptions() {
    this.service.getArtistSubscriptionDetails().subscribe({
      next: (res: any) => {
        console.log(res.artist_subscriptions);
        this.artistSubscriptions = res.artist_subscriptions;

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


