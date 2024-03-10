import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Organizer_category_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';


@Component({
  selector: 'app-organizer-category-list',
  templateUrl: './organizer-category-list.component.html',
  styleUrls: ['./organizer-category-list.component.scss']
})
export class OrganizerCategoryListComponent {
  
  public dataLoaded: boolean = false; 


  displayedColumns: string[] = ['id', 'categoryname',  'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categories: any;
  showAddCategoryInput: boolean = false; // Variable to toggle add category input box
  newCategoryName: string = '';
  editingCategory: any = null;

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllorganizerList();
  }

  getAllorganizerList(){
    this.service.getAllOrganizerCategories().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.categories = res.all_bcategories;
        this.dataSource = new MatTableDataSource(this.categories);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(category: any) {
    // Set the category to be edited and show the input box
    this.editingCategory = category;
  }

  cancelEdit() {
    // Cancel editing and hide the input box
    this.editingCategory = null;
  }
  saveEdit() {
    // Call the update API to save the changes
    this.service.updateOrganizerCategories(this.editingCategory.bid, this.editingCategory).subscribe({
      next: () => {
        // Refresh the list after editing
        this.getAllorganizerList();
        // Reset the editing state
        this.editingCategory = null;
      },
      error: (err: any) => {
        // Handle update error
        console.error(err);
      }
    });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.service.deleteOrganizerCategoriesById(id).subscribe({
        next: () => {
          // Refresh the list after deletion
          this.getAllorganizerList();
        },
        error: (err: any) => {
          // Handle deletion error
          console.error(err);
        }
      });
    }
  }

  toggleAddCategoryInput() {
    // Toggle the visibility of the add category input box
    this.showAddCategoryInput = !this.showAddCategoryInput;
  }

  addNewCategory() {
    // Call the service method to add a new category
    if (this.newCategoryName.trim() !== '') {
      const newCategoryData = {
        businesscategory: this.newCategoryName
      };

      this.service.postOrganizerCategories(newCategoryData).subscribe({
        next: (res: any) => {
          // Refresh the list after adding a new category
          this.getAllorganizerList();
          // Hide the add category input box
          this.showAddCategoryInput = false;
          // Clear the input field
          this.newCategoryName = '';
        },
        error: (err: any) => {
          // Handle addition error
          console.error(err);
        }
      });
    } else {
      // Handle empty category name
      alert('Please enter a category name.');
    }
  }

  cancelAddCategory() {
    // Hide the add category input box
    this.showAddCategoryInput = false;
    // Clear the input field
    this.newCategoryName = '';
  }
}
