import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions;

  @Input() cardData: CardData;

  constructor() {}

  ngOnInit(): void {
    this.initChart();
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
    HC_exporting(this.Highcharts);
  }

  private initChart() {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: null,
        backgroundWidth: 0,
        margin: [2, 2, 2, 2],
        height: 60,
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },

      tooltip: {
        split: true,
        outside: true,
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        title: {
          tesxt: null,
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      yAxis: {
        labels: {
          enabled: false,
        },
        title: {
          tesxt: null,
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      series: [{ data: this.cardData.chartData }],
    };
  }
}

export interface CardData {
  label: string;
  total: string;
  percentage: string;
  chartData: number[];
}
