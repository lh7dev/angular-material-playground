import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions;

  Highcharts = Highcharts;

  @Input() chartData = [];

  constructor() { }

  ngOnInit(): void {
    this.initChartOptions();

    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300)

    // provides UI to export charts in different formats
    HC_exporting(Highcharts);
  }

  private initChartOptions(): void {
    this.chartOptions = {
      chart: {
          type: 'area'
      },
      title: {
          text: 'Dummy Data'
      },
      subtitle: {
          text: 'Demo'
      },
      xAxis: {
          categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
      },
      yAxis: {
          title: {
              text: 'Billions'
          },
          labels: {
              formatter: function() {
                  return this.value / 1000;
              }
          }
      },
      tooltip: {
          split: true,
          valueSuffix: ' millions'
      },
      credits:{
        enabled: false
      },
      exporting:{
        enabled:true
      },
      series: this.chartData
    }
  }

}


