import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-artist-category-list',
  templateUrl: './artist-category-list.component.html',
  styleUrls: ['./artist-category-list.component.scss']
})
export class ArtistCategoryListComponent {
  public statusList: string[] = ['Active', 'Trial', 'Expired'];
  public dataLoaded: boolean = false; 


  displayedColumns: string[] = ['id', 'categoryname',  'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categories: any;

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllartistList();
  }

  getAllartistList(){
    this.service.getAllArtistCategories().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.categories = res.all_categories;
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

  edit(id: number) {
    this.router.navigate(['/home/artist_category_edit/', id]);
  }

  showUsers(businessId: string) {
    // this.service.setSelectedBusinessId(businessId);
    // this.router.navigate(['/home/multiusers', businessId]);
  }
}
