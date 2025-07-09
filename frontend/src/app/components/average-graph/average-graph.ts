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
  styleUrl: './average-graph.css',
})
export class AverageGraph implements OnInit {
  buttonFlag: boolean = false;
  title = 'ng2-charts-demo';
  sensexData: any[] = [];
  plottingData: any = {};
  constructor(private router: Router) {}
  public barChartLabels: string[] = [];
  public barChartValues: any[] = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  private sensex = inject(Sensex);
  private averageCalculator = inject(AverageCalculator);
  private cdr = inject(ChangeDetectorRef);
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Segoe UI, Roboto, sans-serif',
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Monthly Average Closing Prices',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Segoe UI, Roboto, sans-serif',
        },
        color: '#444',
      },
      tooltip: {
        backgroundColor: '#f1f8ff',
        titleColor: '#1976d2',
        bodyColor: '#333',
        borderColor: '#42A5F5',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          color: '#333',
          font: {
            size: 16,
            family: 'Segoe UI, Roboto, sans-serif',
          },
        },
        ticks: {
          color: '#444',
          font: {
            size: 13,
            family: 'Segoe UI, Roboto, sans-serif',
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Avg Closing Price',
          color: '#333',
          font: {
            size: 16,
            family: 'Segoe UI, Roboto, sans-serif',
          },
        },
        ticks: {
          color: '#444',
          font: {
            size: 13,
            family: 'Segoe UI, Roboto, sans-serif',
          },
        },
        grid: {
          color: '#e0f0ff',
        },
        beginAtZero: false,
      },
    },
  };

  ngOnInit(): void {
    if (this.router.url === '/graph') {
      this.buttonFlag = true;
      this.cdr.detectChanges();
    }
    this.sensex.getAll().subscribe((allData) => {
      this.sensexData = allData;
      this.plottingData = this.averageCalculator.calculateMonthlyAverage(
        this.sensexData
      );
      console.log(this.plottingData);
      console.log(Object.values(this.plottingData));
      this.barChartLabels = Object.keys(this.plottingData).reverse();
      const monthLabels: string[] = this.barChartLabels.map((dateStr) => {
        const [year, month] = dateStr.split('-');
        const date = new Date(Number(year), Number(month) - 1);
        return date.toLocaleString('default', { month: 'short' });
      });
      console.log('Labels:', this.barChartLabels);
      console.log('Data:', Object.values(this.plottingData).reverse());
      this.barChartValues = Object.values(this.plottingData).reverse();
      this.barChartData = {
        labels: monthLabels,
        datasets: [
          {
            data: this.barChartValues,
            label: 'Avg Monthly Closing',
            backgroundColor: '#42A5F5',
            borderRadius: 5,
            barPercentage: 0.7,
            categoryPercentage: 0.6,
          },
        ],
      };

      this.cdr.detectChanges();
    });
  }

  clickBack() {
    this.router.navigate(['/sensex-list']);
    this.cdr.detectChanges();
  }
}
