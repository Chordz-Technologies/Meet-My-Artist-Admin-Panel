import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  // public business!: Business[];
  public statusList: string[] = ['Active', 'Trial', 'Expired'];
  public dataLoaded: boolean = false; 


  displayedColumns: string[] = ['id', 'productname', 'brand', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products: any;

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.service.getProductsDetails().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.products = res.all_products;
        this.dataSource = new MatTableDataSource(this.products);
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
    this.router.navigate(['/home/editproducts', id]);
  }

  showUsers(businessId: string) {
    // this.service.setSelectedBusinessId(businessId);
    // this.router.navigate(['/home/multiusers', businessId]);
  }


}
