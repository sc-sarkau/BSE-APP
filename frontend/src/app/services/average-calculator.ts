import { Injectable } from '@angular/core';

export interface MonthlyAverage {
  [month: string]: number;
}

@Injectable({
  providedIn: 'root',
})
export class AverageCalculator {
  calculateMonthlyAverage(data: any): MonthlyAverage {
    const monthlyData: { [month: string]: { sum: number; count: number } } = {};

    for (const entry of data) {
      const date = new Date(entry.date);

      if (isNaN(date.getTime())) continue;

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { sum: 0, count: 0 };
      }
      monthlyData[monthKey].sum += entry.close;
      monthlyData[monthKey].count += 1;
    }
    console.log(monthlyData);
    const monthlyAverages: MonthlyAverage = {};
    for (const month in monthlyData) {
      const { sum, count } = monthlyData[month];
      monthlyAverages[month] = parseFloat((sum / count).toFixed(2));
    }

    return monthlyAverages;
  }
  constructor() {}
}
