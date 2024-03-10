import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './admin/home/home.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LoginComponent } from './admin/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { ArtistComponent } from './admin/dashboard/artist/artist.component';
import { OrganizerComponent } from './admin/dashboard/organizer/organizer.component';
import { SubscriptionComponent } from './admin/dashboard/subscription/subscription.component';
import { UserpricingComponent } from './admin/dashboard/userpricing/userpricing.component';
import { ArtistpricingComponent } from './admin/dashboard/artistpricing/artistpricing.component';
import { OrganizerpricingComponent } from './admin/dashboard/organizerpricing/organizerpricing.component';
import { EditUserComponent } from './admin/Editforms/edit-user/edit-user.component';
import { ChangePasswordComponent } from './admin/Editforms/change-password/change-password.component';
import { EditArtistComponent } from './admin/Editforms/edit-artist/edit-artist.component';
import { EditOrganizerComponent } from './admin/Editforms/edit-organizer/edit-organizer.component';
import { ProductsComponent } from './admin/dashboard/products/products.component';
import { EditproductComponent } from './admin/Editforms/editproduct/editproduct.component';
import { EditSubscriptionComponent } from './admin/Editforms/edit-subscription/edit-subscription.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CarousalComponent } from './admin/dashboard/carousal/carousal.component';
import { ArtistCategoryListComponent } from './admin/dashboard/artist-category-list/artist-category-list.component';
import { OrganizerCategoryListComponent } from './admin/dashboard/organizer-category-list/organizer-category-list.component';
import { DialogContentExampleDialog, EditArtistCategoryComponent } from './admin/Editforms/edit-artist-category/edit-artist-category.component';
import { EditOrganizerCategoryComponent } from './admin/Editforms/edit-organizer-category/edit-organizer-category.component';
import { AppConfigComponent } from './admin/dashboard/app-config/app-config.component';
import { SubscriptionStatusComponent } from './admin/dashboard/subscription-status/subscription-status.component';
import { ArtistSubscriptionStatusComponent } from './admin/dashboard/artist-subscription-status/artist-subscription-status.component';
import { OrganizerSubscriptionStatusComponent } from './admin/dashboard/organizer-subscription-status/organizer-subscription-status.component';
import { UsersComponent } from './admin/dashboard/Users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    ArtistComponent,
    OrganizerComponent,
    SubscriptionComponent,
    UserpricingComponent,
    ArtistpricingComponent,
    OrganizerpricingComponent,
    EditUserComponent,
    ChangePasswordComponent,
    EditArtistComponent,
    EditOrganizerComponent,
    ProductsComponent,
    EditproductComponent,
    EditSubscriptionComponent,
    CarousalComponent,
    ArtistCategoryListComponent,
    OrganizerCategoryListComponent,
    EditArtistCategoryComponent,
    EditOrganizerCategoryComponent,
    AppConfigComponent,
    SubscriptionStatusComponent,
    DialogContentExampleDialog,
    ArtistSubscriptionStatusComponent,
    OrganizerSubscriptionStatusComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    NgChartsModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    DatePipe,
    MatDialogModule

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
