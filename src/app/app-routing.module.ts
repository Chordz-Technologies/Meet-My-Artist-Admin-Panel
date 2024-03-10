import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/dashboard/Users/users.component';

import { ArtistComponent } from './admin/dashboard/artist/artist.component';
import { OrganizerComponent } from './admin/dashboard/organizer/organizer.component';
import { SubscriptionComponent } from './admin/dashboard/subscription/subscription.component';
import { EditUserComponent } from './admin/Editforms/edit-user/edit-user.component';

import { ChangePasswordComponent } from './admin/Editforms/change-password/change-password.component';
import { EditArtistComponent } from './admin/Editforms/edit-artist/edit-artist.component';
import { EditOrganizerComponent } from './admin/Editforms/edit-organizer/edit-organizer.component';
import { ProductsComponent } from './admin/dashboard/products/products.component';
import { EditproductComponent } from './admin/Editforms/editproduct/editproduct.component';
import { EditSubscriptionComponent } from './admin/Editforms/edit-subscription/edit-subscription.component';
import { CarousalComponent } from './admin/dashboard/carousal/carousal.component';
import { ArtistCategoryListComponent } from './admin/dashboard/artist-category-list/artist-category-list.component';
import { OrganizerCategoryListComponent } from './admin/dashboard/organizer-category-list/organizer-category-list.component';
import { AppConfigComponent } from './admin/dashboard/app-config/app-config.component';
import { EditArtistCategoryComponent } from './admin/Editforms/edit-artist-category/edit-artist-category.component';
import { AuthGuard } from './guard/auth.guard';
import { SubscriptionStatusComponent } from './admin/dashboard/subscription-status/subscription-status.component';
import { ArtistSubscriptionStatusComponent } from './admin/dashboard/artist-subscription-status/artist-subscription-status.component';
import { OrganizerSubscriptionStatusComponent } from './admin/dashboard/organizer-subscription-status/organizer-subscription-status.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'Users', component: UsersComponent },
      { path: 'artists', component: ArtistComponent },
      { path: 'organizers', component: OrganizerComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'editusers/:id', component: EditUserComponent },
      { path: 'editartist/:id', component: EditArtistComponent },
      { path: 'editorganizer/:id', component: EditOrganizerComponent },
      { path: 'editproducts/:id', component: EditproductComponent },
      { path: 'editsubscription/:id', component: EditSubscriptionComponent },
      { path: 'createsubscription', component: EditSubscriptionComponent },
      { path: 'createproducts', component: EditproductComponent },
      { path: 'change_password/:id', component: ChangePasswordComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'carosal-setting', component: CarousalComponent },
      { path: 'artist_categories', component: ArtistCategoryListComponent },
      { path: 'organizer_categories', component: OrganizerCategoryListComponent },
      { path: 'artist_category_edit/:id', component: EditArtistCategoryComponent },
      { path: 'artist_category_create', component: EditArtistCategoryComponent },
      { path: 'App_config', component: AppConfigComponent },
      { path: 'User-subscription-status', component: SubscriptionStatusComponent },
      { path: 'Artist-subscription-status', component: ArtistSubscriptionStatusComponent },
      { path: 'Organizer-subscription-status', component: OrganizerSubscriptionStatusComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
