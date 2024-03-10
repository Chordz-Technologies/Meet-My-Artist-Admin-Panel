import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { transaction_user, user_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm!: FormGroup;
  userID!: number;
  transaction_user: transaction_user = new transaction_user();
  userSubscriptions: any[] = [];
  selectedSubscription: any = null; // Holds the currently selected subscription

  constructor(private fb: FormBuilder, private service: ServiceService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      usersname: [''],
      contactno: [''],
      usertype: [''],
      activationdate: [''],
      amount: [''],
      s_description: ['']
    })

    this.UserSubscriptions();

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

  onEdit(user: user_model) {
    this.userForm.setValue({
      usersname: user.uname,
      contactno: user.uwhatsappno,
      usertype: 'User',
      activationdate: user.usersubsdate,
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
    const selectedSubscription = this.userForm.value.amount;

    // Extract the price (sprice) from the selected subscription
    const selectedPrice = selectedSubscription ? selectedSubscription.sprice : 0;

    // Set the extracted price as the atamount
    this.transaction_user.utamount = selectedPrice;

    // description store
    const selectedSubscriptionName = selectedSubscription ? selectedSubscription.sname : '';
    const selectedSubscriptionDuration = selectedSubscription ? selectedSubscription.sduration + ' Days' : '';
    this.transaction_user.utdescription = selectedSubscriptionName + ' ' + selectedSubscriptionDuration;
    const currentDate = new Date();

    // Format date to YYYY-MM-DD
    const formattedDate = currentDate.getFullYear() + '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + currentDate.getDate()).slice(-2);

    this.transaction_user.utdate = formattedDate;
    this.transaction_user.uid = this.userID;

    const selectedSubscriptionId = selectedSubscription ? selectedSubscription.sid : '';
    this.transaction_user.sid= selectedSubscriptionId;

    this.service.userTransactionPost(this.transaction_user).subscribe(res => {
      console.log(res);
      // alert('Transaction Successfull');
      this.toastr.success('Transaction Successful!', 'Success');
      this.userForm.reset();
      this.router.navigate(['/home/Users'])
    })
  }

}
