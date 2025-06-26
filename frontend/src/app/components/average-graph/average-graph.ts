import { Component, inject, input, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AverageCalculator } from '../../services/average-calculator';
import { Sensex } from '../../services/sensex';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-average-graph',
  imports: [BaseChartDirective, NgIf],
  templateUrl: './average-graph.html',
  styleUrl: './average-graph.css'
})
export class AverageGraph implements OnInit {
  buttonFlag : boolean = false;
  title = 'ng2-charts-demo';
  sensexData: any[] = [];
  plottingData: any = {};
  constructor(private router: Router) {}
  public barChartLabels: string[] = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  private sensex = inject(Sensex);
  private  averageCalculator = inject(AverageCalculator)
  private cdr = inject(ChangeDetectorRef);
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Month' }
      },
      y: {
        title: { display: true, text: 'Avg Closing Price' },
        beginAtZero: false
      }
    }
  };

  
  ngOnInit(): void {
    if(this.router.url === '/graph'){
      this.buttonFlag = true;
      this.cdr.detectChanges();
    }
    this.sensex.getAll().subscribe(allData => {
        this.sensexData = allData;
        this.plottingData = this.averageCalculator.calculateMonthlyAverage(this.sensexData);
        console.log(this.plottingData);
        console.log(Object.values(this.plottingData));
        this.barChartLabels = Object.keys(this.plottingData);
        console.log('Labels:', this.barChartLabels);
        console.log('Data:', Object.values(this.plottingData));

        this.barChartData = {
          labels: this.barChartLabels,
          datasets: [
            {
              data: Object.values(this.plottingData),
              label: 'Avg Monthly Closing',
              backgroundColor: '#42A5F5'
            }
          ]
        };
        this.cdr.detectChanges();
    });
  }
  
  clickBack(){
    this.router.navigate(['/sensex-list']);
    this.cdr.detectChanges();
  }
  
}
