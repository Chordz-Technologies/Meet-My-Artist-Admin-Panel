
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';
import { changePassword_model } from 'src/app/models';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  public adminIdToUpdate!: number;
  changePassword_model:changePassword_model=new changePassword_model;

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      adminid: [''],
      adminname: [''],
      adminpassword: [''],
      confirmPassword: [''],
    });

    this.activatedRoute.params.subscribe(val => {
      this.adminIdToUpdate = val['id'];
      this.service.getAdminDataById(this.adminIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res.admin_details);
            console.log(res.admin_details)
          },
          error: (err) => {
            console.log(err);
          }
        })
    })
  }

  fillFormToUpdate(changePassword: changePassword_model) {
    this.changePasswordForm.patchValue({
      adminid: changePassword.aid,
      adminname: changePassword.aname,
      adminpassword:changePassword.apassword,
      confirmPassword:changePassword.aconfirmpassword
    })
  }

  update() {
    this.changePassword_model.apassword=this.changePasswordForm.value.adminpassword;
      this.changePassword_model.aconfirmpassword=this.changePasswordForm.value.confirmPassword;

    if (this.changePasswordForm.valid) {
      const newPassword = this.changePassword_model.apassword;
      const confirmPassword = this.changePassword_model.aconfirmpassword;

      if (!newPassword || !confirmPassword) {
        this.toastr.error('Please enter both new password and confirm password')
        return;
      }

      if (newPassword !== confirmPassword) {
        this.toastr.error("New password and confirm password do not match.");
        return;
      }

      
      

      this.service.updatePassword( this.adminIdToUpdate, this.changePassword_model ).subscribe({
        next: (res) => {
          this.toastr.success('Update Successfully');
          this.changePasswordForm.reset();
          console.log(res)
        },
        error: (error) => {
          console.error('Error updating password', error);
        }
      });
    }
  }
}