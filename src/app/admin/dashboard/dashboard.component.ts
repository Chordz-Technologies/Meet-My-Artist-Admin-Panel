import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  homeData: any;
  chartData: any;
  constructor(private service: ServiceService) { }

  // isLoading = true;

  public chart: Chart | undefined;
  ngOnInit(): void {
    this.allCountBusiness();
    // this.getChartData();
    // this.RenderChart();
  }

  allCountBusiness() {
    this.service.getUsersCount().subscribe({
      next: (data: any) => {
        console.log(data);
        this.homeData = data;
        // this.isLoading = false;
      },
      error: (err: any) => {
        alert(err);
      },
    });
  }

  // RenderChart() {
  //   const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  //   const myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
  //       datasets: [
  //         {
  //           label: '# of Last week Joinings',
  //           data: [10, 14, 5, 4, 6, 17, 7],
  //           backgroundColor: ['rgb(134,142,150)'],
  //           borderColor: ['rgba(238,238,238, 1)'],
  //           borderWidth: 1,
  //         },
  //         {
  //           label: '# of this week Joinings',
  //           data: [12, 19, 3, 5, 2, 3, 9],
  //           backgroundColor: ['rgb(7,157,243)'],
  //           borderColor: ['rgba(54, 162, 235, 1)'],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   })
  // }

  // getCurrentDay(): string {
  //   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   const currentDate = new Date();
  //   return days[currentDate.getDay()];
  // }

  // rearrangeDays(currentDay: string): string[] {
  //   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   const currentDayIndex = days.indexOf(currentDay);
  //   const rearrangedDays = [...days.slice(currentDayIndex), ...days.slice(0, currentDayIndex)];
  //   return rearrangedDays;
  // }

  // rearrangeData(data: any, currentDay: string): number[] {
  //   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  //   const currentDayIndex = days.indexOf(currentDay);
  //   const rearrangedData = [
  //     ...Object.values(data).slice(currentDayIndex),
  //     ...Object.values(data).slice(0, currentDayIndex),
  //   ];
  //   return rearrangedData as number[];
  // }

  // getChartData(): void {
  //   this.service.getChartInfo().subscribe((data) => {
  //     this.chartData = data;
  //     // console.log("pastWeekRecords", this.chartData.pastWeekRecords);
  //     // console.log("currentWeekRecords", this.chartData.currentWeekRecords);
  //     this.RenderChart();
  //   });
  // }

  // RenderChart(): void {
  //   const currentDay = this.getCurrentDay();
  //   // console.log("Rearranged Days:", this.rearrangeDays(currentDay));
  //   // console.log("Rearranged Past Week Records:", this.rearrangeData(this.chartData.pastWeekRecords, currentDay));
  //   // console.log("Rearranged Current Week Records:", this.rearrangeData(this.chartData.currentWeekRecords, currentDay));

  //   const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  //   // const ctx = canvas.getContext('2d');

  //   const myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: this.rearrangeDays(currentDay), // ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  //       datasets: [
  //         {
  //           label: 'Past Week Records',
  //           data: this.rearrangeData(this.chartData.pastWeekRecords, currentDay),
  //           backgroundColor: ['rgb(134,142,150)'],
  //           borderColor: ['rgba(238,238,238, 1)'],
  //           borderWidth: 1,
  //         },
  //         {
  //           label: 'Current Week Records',
  //           data: this.rearrangeData(this.chartData.currentWeekRecords, currentDay),
  //           backgroundColor: ['rgb(7,157,243)'],
  //           borderColor: ['rgba(54, 162, 235, 1)'],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
