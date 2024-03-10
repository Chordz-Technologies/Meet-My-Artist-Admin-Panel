import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  transaction_organizer, user_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-organizer',
  templateUrl: './edit-organizer.component.html',
  styleUrls: ['./edit-organizer.component.scss']
})
export class EditOrganizerComponent implements OnInit {

  organizerForm!: FormGroup;
  userID!: number;
  transaction_organizer: transaction_organizer = new transaction_organizer();
  org_Subscriptions: any[] = [];
  selectedSubscription: any = null; // Holds the currently selected subscription

  constructor(private fb: FormBuilder, private service: ServiceService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.organizerForm = this.fb.group({
      usersname: [''],
      contactno: [''],
      usertype: [''],
      activationdate: [''],
      amount: [''],
      s_description: ['']
    })

    this.organizerSubscriptions();

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

  organizerSubscriptions() {
    this.service.getOrganizerSubscriptionDetails().subscribe({
      next: (res: any) => {
        console.log(res.organizer_subscriptions);
        this.org_Subscriptions = res.organizer_subscriptions;

      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Error fetching data. Check the console for details.');
      },
    })
  }

  onEdit(user: user_model) {
    this.organizerForm.setValue({
      usersname: user.uname,
      contactno: user.uwhatsappno,
      usertype: 'Organizer',
      activationdate: user.organizersubsdate,
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
    const selectedSubscription = this.organizerForm.value.amount;

    // Extract the price (sprice) from the selected subscription
    const selectedPrice = selectedSubscription ? selectedSubscription.sprice : 0;

    // Set the extracted price as the atamount
    this.transaction_organizer.otamount = selectedPrice;

    // description store
    const selectedSubscriptionName = selectedSubscription ? selectedSubscription.sname : '';
    const selectedSubscriptionDuration = selectedSubscription ? selectedSubscription.sduration + ' Days' : '';
    this.transaction_organizer.otdescription = selectedSubscriptionName + ' ' + selectedSubscriptionDuration;
    const currentDate = new Date();

    // Format date to YYYY-MM-DD
    const formattedDate = currentDate.getFullYear() + '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + currentDate.getDate()).slice(-2);

    this.transaction_organizer.otdate = formattedDate;
    this.transaction_organizer.uid = this.userID;

    const selectedSubscriptionId = selectedSubscription ? selectedSubscription.sid : '';
    this.transaction_organizer.sid= selectedSubscriptionId;

    this.service.organizerTransactionPost(this.transaction_organizer).subscribe(res => {
      console.log(res);
      // alert('Transaction Successfull');
      this.toastr.success('Transaction Successful!', 'Success');
      this.organizerForm.reset();
      this.router.navigate(['/home/organizers'])
    })
  }

}
