import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions;

  Highcharts = Highcharts;

  @Input() chartData = [];

  constructor() {}

  ngOnInit(): void {
    this.initChartOptions();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

    // provides UI element that can be used to export charts in different formats
    HC_exporting(Highcharts);
  }

  get lastSevenDaysDates$(): Date[] {
    const today = new Date();
    const dates = [];
    for (let i = 7; i > 0; i--) {
      console.log(today.getDate() - i);
      dates.push(today.getDate() - i);
    }
    return dates;
  }

  private initChartOptions(): void {
    this.chartOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Sales Last 7 Days',
      },
      subtitle: {
        text: '(showing dummy data)',
      },
      xAxis: {
        categories: this.lastSevenDaysDates$,
        tickmarkPlacement: 'on',
        title: {
          enabled: false,
        },
      },
      yAxis: {
        title: {
          text: 'Billions',
        },
        labels: {
          formatter: function () {
            return this.value / 1000;
          },
        },
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: this.chartData,
    };
  }
}
