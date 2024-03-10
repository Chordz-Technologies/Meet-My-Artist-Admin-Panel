import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { artist_category_model, transaction_artist, user_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-artist-category',
  templateUrl: './edit-artist-category.component.html',
  styleUrls: ['./edit-artist-category.component.scss']
})
export class EditArtistCategoryComponent implements OnInit {

  artistCategoryForm!: FormGroup;
  categoryID!: number;
  artist_category_model: artist_category_model = new artist_category_model();

  showsubmit!:boolean;
  showupdate!:boolean;
  showdelete!:boolean;

  categoryDetails: any={};
  editingIndex: number = -1;
  
  displayedColumns: string[] = ['subcategory',  'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private fb: FormBuilder, private service: ServiceService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.artistCategoryForm = this.fb.group({
      categoryname: [''],
      subcategories: ['']
      
    })
    
    
    // Initialize dataSource with an empty array
  this.dataSource = new MatTableDataSource<any>([]);

    this.route.params.subscribe(val => {
      this.categoryID = val['id']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.service.getArtistCategoriesById(this.categoryID).subscribe({
        next: (res) => {
          this.onEdit(res.category_details);
          this.categoryDetails = res.category_details;
          this.dataSource = new MatTableDataSource(this.categoryDetails.scname.map((scname: string) => ({ scname })));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Category Details:', res.category_details);
        }, error: (err) => {
          console.log(err)
        }
      });

    })
   

    // this.artistCategoryForm.reset()
    this.showsubmit=true;
    this.showupdate=false;
    this.showdelete=false;
  }

  

  onEdit(category: artist_category_model) {
    this.showsubmit=false;
    this.showupdate=true;
    this.showdelete=true;
    this.artistCategoryForm.setValue({
      categoryname: category.cname,
      subcategories: category.scname,


    })
    this.artistCategoryForm.get('subcategories')?.setValue('');

  }

  // update category
  
  updateCategory() {
    // Populate the artist_category_model with form values
    this.artist_category_model.cname = this.artistCategoryForm.value.categoryname;
    
    // Convert the array of subcategories into a comma-separated string
    this.artist_category_model.scname = this.categoryDetails.scname.join(', ');
  
    // Call the service to update the category details
    this.service.updateArtistCategories(this.categoryID, this.artist_category_model).subscribe({
      next: (res) => {
        console.log(res);
        // alert('Update Category Successful');
        this.toastr.success('Update Category Successful!', 'Success');
        this.router.navigate(['/home/artist_categories']);
      },
      error: (err) => {
        console.error('Error updating category:', err);
        // Optionally, display an error message to the user
        // You can also handle specific error cases if needed
      }
    });
  }

  // post data function
  
  submitCategory() {
    // Populate the artist_category_model with form values
    this.artist_category_model.cname = this.artistCategoryForm.value.categoryname;
    
    // Convert the array of subcategories into a comma-separated string
    this.artist_category_model.scname = this.categoryDetails.scname.join(', ');
  
    // Call the service to post the category details
    this.service.postArtistCategories(this.artist_category_model).subscribe({
      next: (res) => {
        console.log(res);
        // alert('Add Category Successful');
        this.toastr.success('Add Category Successful!', 'Success');
        this.router.navigate(['/home/artist_categories']);
      },
      error: (err) => {
        console.error('Error adding category:', err);
        // Optionally, display an error message to the user
        // You can also handle specific error cases if needed
      }
    });
  }
  
  
  
  
  
  

  
  // delete Category
  deletecategory(){
    this.service.deleteArtistCategoriesById(this.categoryID).subscribe(res=>{
      console.log(res);
      // alert('Delete Category Successfull');
      this.toastr.success('Delete Category Successful!', 'Success');
      this.artistCategoryForm.reset();
      this.router.navigate(['/artist_categories'])
    })
  }
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this category?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed the deletion, call your deleteCategory method here
        this.deletecategory();
      }
    });
  }
  
 
  // edit sub category row
  editSubcategory(row: any) {
    this.editingIndex = this.dataSource.data.indexOf(row);
  }
  // save edited
  saveSubcategory() {
    // this.editingIndex = -1; // Reset editing index after saving
    if (this.editingIndex !== -1) {
      // Get the edited subcategory from the data source
      const editedSubcategory = this.dataSource.data[this.editingIndex].scname;
      
      // Update the corresponding subcategory in the categoryDetails.scname array
      this.categoryDetails.scname[this.editingIndex] = editedSubcategory;
  
      // Reset the editing index
      this.editingIndex = -1;
  
      // Optionally, you can call updateCategory here if you want to persist edits immediately
    }
  }

  // delete sub category
  deleteSubcategory(index: number) {

  

    if (index >= 0 && index < this.dataSource.data.length) {
      const deletedSubcategory = this.dataSource.data[index].scname;
  
      // Remove the subcategory from the data source array
      this.dataSource.data.splice(index, 1);
  
      // Update the categoryDetails.scname array with the changes
      this.categoryDetails.scname = this.dataSource.data.map((item: any) => item.scname);
  
      // Optionally, update the category details if needed
      this.updateCategory();
      this.toastr.success('Delete Sub-Category Successful!', 'Success');
  
      console.log('Deleted subcategory:', deletedSubcategory);
      console.log('Remaining data:', this.dataSource.data);
    } else {
      console.error('Invalid index for deleting subcategory');
    }
  
      // Manually trigger change detection
  this.cdr.detectChanges();
  }

  // add new sub category
  addNewSubcategory() {
    const newSubcategory = this.artistCategoryForm.value.subcategories.trim();
    if (newSubcategory) {
      // Check if this.categoryDetails.scname is undefined, if so, initialize it as an empty array
      if (!this.categoryDetails.scname) {
        this.categoryDetails.scname = [];
      }
      // Now it's safe to push the new subcategory
      this.categoryDetails.scname.push(newSubcategory);
      this.dataSource.data = [...this.categoryDetails.scname.map((scname: string) => ({ scname }))];
      this.artistCategoryForm.patchValue({ subcategories: '' });
      this.toastr.success('Add Sub-Category Successful!', 'Success');
    } else {
      console.error('New subcategory cannot be empty');
    }
  }
  
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class DialogContentExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}