import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subscription_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent implements OnInit {
  subscriptionForm!:FormGroup;
  subscription_model:subscription_model=new subscription_model()
  subscriptionId!: number; // Variable to store the ID of the product to be edited

  showsubmit!:boolean;
  showupdate!:boolean;
  showdelete!:boolean;

  constructor(private fb:FormBuilder, private service:ServiceService, private router:Router, private route:ActivatedRoute,  private toastr: ToastrService){}

ngOnInit(): void {
  this.subscriptionForm=this.fb.group({
    s_id:[''],
    s_name:[''],
    s_amount:[''],
    s_duration:[''],
    s_plan:[''],
    s_benifits:[''],
    s_benifitsmuted:['']
  })
  // Get the ID of the product from the route parameters
  this.route.params.subscribe(val => {
    this.subscriptionId = val['id']; // Assuming the parameter name is 'id'
    // Fetch the product details using the ID and populate the form
    this.service.getSubscriptionById(this.subscriptionId).subscribe({
      next:(res)=>{
        this.onEdit(res.subscription_details);
        console.log('Product Details:', res.subscription_details);
      },error:(err)=>{
        console.log(err)
      }
    });
    // return this.subscriptionId;
  });
  this.subscriptionForm.reset()
    this.showsubmit=true;
    this.showupdate=false;
    this.showdelete=false;

}

onEdit(subscription:subscription_model){
  this.showsubmit=false;
  this.showupdate=true;
  this.showdelete=true;
  this.subscriptionForm.setValue({
    s_id:subscription.sid,
    s_name:subscription.sname,
    s_amount:subscription.sprice,
    s_duration:subscription.sduration,
    s_plan:subscription.planfor,
    s_benifits:subscription.sbenefits,
    s_benifitsmuted:subscription.sbenefitsmuted
  })

}

postsubsription(){
  this.subscription_model.sname=this.subscriptionForm.value.s_name;
  this.subscription_model.sprice=this.subscriptionForm.value.s_amount;
  this.subscription_model.sduration=this.subscriptionForm.value.s_duration;
  this.subscription_model.planfor=this.subscriptionForm.value.s_plan;
  this.subscription_model.sbenefits=this.subscriptionForm.value.s_benifits;
  this.subscription_model.sbenefitsmuted=this.subscriptionForm.value.s_benifitsmuted;

  this.service.createSubscription(this.subscription_model).subscribe(res=>{
    // alert('Subsription added Successfully')
    this.toastr.success('Subsription added Successfully!', 'Success');
    console.log(res)
    this.subscriptionForm.reset()
    this.router.navigate(['/home/subscription'])
    
  })
}
deletesubscription(){
  this.service.deleteSubscription(this.subscriptionId).subscribe(()=>
  {
    // console.log('Subscription deleted successfully');
    this.toastr.success('Subscription deleted successfully!', 'Success');
        // Redirect the user to a different page after successful deletion
        this.router.navigate(['/home/subscription']);
  })
}

updatesubscription(){
  
  this.subscription_model.sname=this.subscriptionForm.value.s_name;
  this.subscription_model.sprice=this.subscriptionForm.value.s_amount;
  this.subscription_model.sduration=this.subscriptionForm.value.s_duration;
  this.subscription_model.planfor=this.subscriptionForm.value.s_plan;
  this.subscription_model.sbenefits=this.subscriptionForm.value.s_benifits;
  this.subscription_model.sbenefitsmuted=this.subscriptionForm.value.s_benifitsmuted;

  this.service.updateSubscription(this.subscriptionId, this.subscription_model).subscribe(res=>{
    console.log(res)
      // alert('updated')
      this.toastr.success('Subscription Updated successfully!', 'Success');
      this.subscriptionForm.reset();
      this.router.navigate(['/home/subscription'])
  })
}
}
