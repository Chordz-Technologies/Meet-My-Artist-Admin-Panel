import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
  public statusList: string[] = ['Active', 'Trial', 'Expired'];
  public dataLoaded: boolean = false;


  displayedColumns: string[] = ['id', 'username', 'status', 'mobileno', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  artits: any;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllartistList();
  }

  getAllartistList() {
    this.service.getArtistDetails().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.artits = res.artists_list;
        this.dataSource = new MatTableDataSource(this.artits);
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
    this.router.navigate(['/home/editartist/', id]);
  }



}
