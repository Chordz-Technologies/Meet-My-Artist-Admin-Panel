import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { transaction_artist, user_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {

  artistForm!: FormGroup;
  userID!: number;
  transaction_artist: transaction_artist = new transaction_artist();
  artistSubscriptions: any[] = [];
  selectedSubscription: any = null; // Holds the currently selected subscription

  constructor(private fb: FormBuilder, private service: ServiceService, private route: ActivatedRoute, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.artistForm = this.fb.group({
      usersname: [''],
      contactno: [''],
      usertype: [''],
      activationdate: [''],
      amount: [''],
      s_description: ['']
    })

    this.ArtistSubscriptions();

    this.route.params.subscribe(val => {
      this.userID = val['id']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.service.getUsersById(this.userID).subscribe({
        next: (res) => {
          this.onEdit(res.user_details);
          console.log('Product Details:', res.user_details);
        }, error: (err) => {
          console.log(err)
        }
      });

    })
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

  onEdit(user: user_model) {
    this.artistForm.setValue({
      usersname: user.uname,
      contactno: user.uwhatsappno,
      usertype: 'Artist',
      activationdate: user.artistsubsdate,
      amount: '',
      s_description: ''

    })

  }
  // Function to handle the selection of a subscription
  onSubscriptionSelect(subscription: any) {
    this.selectedSubscription = subscription;
  }

  // post data function
  submitTransaction() {
    const selectedSubscription = this.artistForm.value.amount;

    // Extract the price (sprice) from the selected subscription
    const selectedPrice = selectedSubscription ? selectedSubscription.sprice : 0;

    // Set the extracted price as the atamount
    this.transaction_artist.atamount = selectedPrice;

    // description store
    const selectedSubscriptionName = selectedSubscription ? selectedSubscription.sname : '';
    const selectedSubscriptionDuration = selectedSubscription ? selectedSubscription.sduration + ' Days' : '';
    this.transaction_artist.atdescription = selectedSubscriptionName + ' ' + selectedSubscriptionDuration;
    const currentDate = new Date();

    // Format date to YYYY-MM-DD
    const formattedDate = currentDate.getFullYear() + '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + currentDate.getDate()).slice(-2);

    this.transaction_artist.atdate = formattedDate;
    this.transaction_artist.uid = this.userID;

    const selectedSubscriptionId = selectedSubscription ? selectedSubscription.sid : '';
    this.transaction_artist.sid= selectedSubscriptionId;

    this.service.artistTransactionPost(this.transaction_artist).subscribe(res => {
      console.log(res);
      // alert('Transaction Successfull');
      this.toastr.success('Transaction Successful!', 'Success');
      this.artistForm.reset();
      this.router.navigate(['/home/artists'])
    });
    
  }

}
