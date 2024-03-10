import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  // public business!: Business[];
  public statusList: string[] = ['Active', 'Trial', 'Expired'];
  public dataLoaded: boolean = false;


  displayedColumns: string[] = ['id', 'username', 'status', 'mobileno', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  farmers: any;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAlluserList();
  }

  getAlluserList() {
    this.service.getUsersDetails().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.farmers = res.users_list;
        this.dataSource = new MatTableDataSource(this.farmers);
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
    this.router.navigate(['/home/editusers', id]);
  }





}
