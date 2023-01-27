import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { Chart, registerables } from 'chart.js';
import { Observable } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-cpu-performance',
  templateUrl: './cpu-performance.component.html',
  styleUrls: ['./cpu-performance.component.scss']
})
export class CpuPerformanceComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: true }) chartRef: ElementRef;
  chart: Chart;
  cpuUsage: number = 0
  cpuInfo$: Observable<any>
  cpuUptime: any = null

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
  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          fill: 'origin',
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
        },

        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
          x: {
            display: false
          },
        }
      }
    });
  }

  ngOnInit(): void {
    this.getCpuInformation();
    this.getCpuUsage();
    this.getCpuUptime();
  }

  getCpuInformation() {
    this.cpuInfo$ =  this.performanceService.getCpuInformation();
  }

  getCpuUptime(){
    this.performanceService.getCpuUptime().subscribe({
      next: (value) => {
        this.cpuUptime = value.uptime
      }
    })
  }

  getCpuUsage() {
    this.performanceService.getCpuUsage().subscribe({
      next: (value) => {
        this.cpuUsage = value
        if (this.chart != null) {

          if (this.chart.data.datasets[0].data.length > 50) {
            this.chart.data.labels.shift()
            this.chart.data.datasets[0].data.shift()
          }
          this.chart.data.labels.push(Date.now().toString())
          this.chart.data.datasets[0].data.push(value)
          this.chart.update()
        }
      }
    })
  }
}
