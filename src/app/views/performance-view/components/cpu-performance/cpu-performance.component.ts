import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-cpu-performance',
  templateUrl: './cpu-performance.component.html',
  styleUrls: ['./cpu-performance.component.scss']
})
export class CpuPerformanceComponent implements OnInit, AfterViewInit{
  @ViewChild('chart', { static: true }) chartRef: ElementRef;
  chart: Chart;

  cpuUsage: number = 0

  cpuResources: any = [{
    name: "CPU",
    series: [

    ]
  }];


  view: [number, number] = [700, 300];
  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = false;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Usage';
  timeline: boolean = false;
  colorScheme: any = {
    domain: ['#0081B4', '#FFFBF5', '#FFFBF5', '#FFFBF5', '#FFFBF5', '#FFFBF5'],
    label: ['#0081B4']
  };



  constructor(private performanceService: PerformanceService) { }
  ngAfterViewInit(){
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Patates', 'domates', 'cacık'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3, 20, 30, 40, 50],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.performanceService.getCpuUsage().subscribe({
      next: (value) => {
        this.cpuUsage = value
        if (this.cpuResources[0].series.length > 20) {
          this.cpuResources[0].series.shift()
        }
        this.cpuResources[0].series.push({ name: Date().toString(), value: value })
        this.cpuResources = [...this.cpuResources]
      }
    })
  }

}
