import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as echarts from "echarts";


@Component({
  selector: 'app-water-consumption',
  templateUrl: './water-consumption.component.html',
  styleUrls: ['./water-consumption.component.scss']
})
export class WaterConsumptionComponent implements OnInit, AfterViewInit {
  breadCrumbItems: Array<{}>;


  @ViewChild('pieChartWaterContainer') pieChartWaterContainer: ElementRef;
  @ViewChild('barChartWaterContainer') barChartWaterContainer: ElementRef;




  constructor() {
  }

  ngAfterViewInit(): void {
    this.PieChartWater();
    this.barChartWater();
  }

  ngOnInit(): void {

  }
  PieChartWater(){
    if (this.pieChartWaterContainer) {
      const chart = echarts.init(this.pieChartWaterContainer.nativeElement);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Amounts',
            colors : ['#FFF', '#111'],
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 63, name: 'Full', itemStyle: { color: '#034035' } },
              { value: 37, name: 'Empty', itemStyle: { color: '#fb8f4d' } },
            ]
          }
        ]
      };
      chart.setOption(option);
    }
  }

  barChartWater(){
    if (this.barChartWaterContainer) {
      const chart = echarts.init(this.barChartWaterContainer.nativeElement);
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['20/02', '21/02', '22/02', '23/02', '24/02', '25/02', '26/02', '27/02', '28/02', '29/02', '01/03', '02/03', '03/03', '04/03', '05/03', '06/03', '07/03', '08/03', '09/03']
        },
        axisLabel: {
          width: 100,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [20.3, 20.9, 23.26, 22.56, 25.36, 23.26, 26.35, 26.32, 27.56, 27.98, 28.65, 26.35, 25.53, 26.53, 24.53, 23.35, 24.54, 26.35, 28.35],
            type: 'line',
            areaStyle: {
              color : '#034035'
            },
            lineStyle: {
              color: '#034035',
            },
          }
        ]
      };
      chart.setOption(option);
    }
  }

}
