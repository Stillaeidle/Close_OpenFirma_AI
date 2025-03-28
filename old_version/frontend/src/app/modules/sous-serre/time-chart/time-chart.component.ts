import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ChartComponent,
  ApexGrid,
  ApexLegend


} from "ng-apexcharts";



import {dataSeries} from "./data-series";
import * as echarts from 'echarts';

export type ChartTempHumOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};




@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.scss']
})
export class TimeChartComponent implements OnInit, AfterViewInit {
  breadCrumbItems: Array<{}>;

  public seriesAirHumidity: ApexAxisChartSeries;
  public chartAirHumidity: ApexChart;
  public dataLabelsAirHumidity: ApexDataLabels;
  public markersAirHumidity: ApexMarkers;
  public titleAirHumidity: ApexTitleSubtitle;
  public fillAirHumidity: ApexFill;
  public yaxisAirHumidity: ApexYAxis;
  public xaxisAirHumidity: ApexXAxis;
  public tooltipAirHumidity: ApexTooltip;
  public strokeAirHumidity: ApexStroke;

  public seriesSoilHumidity: ApexAxisChartSeries;
  public chartSoilHumidity: ApexChart;
  public dataLabelsSoilHumidity: ApexDataLabels;
  public markersSoilHumidity: ApexMarkers;
  public titleSoilHumidity: ApexTitleSubtitle;
  public fillSoilHumidity: ApexFill;
  public yaxisSoilHumidity: ApexYAxis;
  public xaxisSoilHumidity: ApexXAxis;
  public tooltipSoilHumidity: ApexTooltip;
  public strokeSoilHumidity: ApexStroke;

  public seriesAirTemperature: ApexAxisChartSeries;
  public chartAirTemperature: ApexChart;
  public dataLabelsAirTemperature: ApexDataLabels;
  public markersAirTemperature: ApexMarkers;
  public titleAirTemperature: ApexTitleSubtitle;
  public fillAirTemperature: ApexFill;
  public yaxisAirTemperature: ApexYAxis;
  public xaxisAirTemperature: ApexXAxis;
  public tooltipAirTemperature: ApexTooltip;
  public strokeAirTemperature: ApexStroke;

  public seriesSoilTemperature: ApexAxisChartSeries;
  public chartSoilTemperature: ApexChart;
  public dataLabelsSoilTemperature: ApexDataLabels;
  public markersSoilTemperature: ApexMarkers;
  public titleSoilTemperature: ApexTitleSubtitle;
  public fillSoilTemperature: ApexFill;
  public yaxisSoilTemperature: ApexYAxis;
  public xaxisSoilTemperature: ApexXAxis;
  public tooltipSoilTemperature: ApexTooltip;
  public strokeSoilTemperature: ApexStroke;



  @ViewChild('gaugeAirHumidityContainer') gaugeAirHumidityContainer: ElementRef;
  @ViewChild('gaugeSoilHumidityContainer') gaugeSoilHumidityContainer: ElementRef;

  @ViewChild('gaugeAirTemperatureContainer') gaugeAirTemperatureContainer: ElementRef;
  @ViewChild('gaugeSoilTemperatureContainer') gaugeSoilTemperatureContainer: ElementRef;

  @ViewChild('lineBrightnessContainer') lineBrightnessContainer: ElementRef;

  @ViewChild("chartTempHumOptions") chart: ChartComponent;
  public chartTempHumOptions: Partial<ChartTempHumOptions>;


  constructor() {
  }

  ngOnInit(): void {
    this.initHumidityAirCharts();
    this.initHumiditySoilCharts();
    this.initTemperatureAirCharts();
    this.initTemperatureSoilCharts();
    this.initTempHumLineChart();

    setInterval(() => {
      this.updateDataAndChart();
    }, 3000);

  }

  ngAfterViewInit(): void {
    this.initAitHumidityGauge();
    this.initSoilHumidityGauge();
    this.initAirTemperatureGauge();
    this.initSoilTemperatureGauge();
    this.initBrightnessLineChart();

  }

  //ZOOMABLE TIMESERIES For Air & Soil Humidity
  public initHumidityAirCharts(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }
    this.seriesAirHumidity = [
      {
        name: "Humidity Air",
        data: dates
      }
    ];
    this.chartAirHumidity = {
      type: "line",
      stacked: false,
      height: 400,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      },
    };
    this.strokeAirHumidity = {
      curve: "straight",
      colors: ['#034035'],
      width: 3
    }

    this.dataLabelsAirHumidity = {
      enabled: false
    };
    this.markersAirHumidity = {
      size: 0
    };
    this.titleAirHumidity = {
      text: "Air humidity",
      align: "center"
    };
    this.fillAirHumidity = {
      type: "solide",
      colors: ['#054237', '#111', '#fff'],

    };
    this.yaxisAirHumidity = {
      labels: {
        formatter: function (val) {
          return (val / 10000000).toFixed(0);
        }
      },
      title: {
        text: "en (%)"
      }
    };
    this.xaxisAirHumidity = {
      type: "datetime"
    };
    this.tooltipAirHumidity = {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }

  public initHumiditySoilCharts(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, (dataSeries[1][i].value - 10 - i)]);
    }

    this.seriesSoilHumidity = [
      {
        name: "Humidity Soil ",
        data: dates,
      }
    ];
    this.chartSoilHumidity = {
      type: "line",
      stacked: false,
      height: 400,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      },
    };
    this.strokeSoilHumidity = {
      curve: "straight",
      colors: ['#fb8f4d'],
      width: 3
    }

    this.dataLabelsSoilHumidity = {
      enabled: false
    };
    this.markersSoilHumidity = {
      size: 0
    };
    this.titleSoilHumidity = {
      text: "Soil humidity",
      align: "center"
    };
    this.fillSoilHumidity = {
      type: "solide",
      colors: ['#054237', '#111', '#fff'],

    };
    this.yaxisSoilHumidity = {
      labels: {
        formatter: function (val) {
          return (val / 10000000).toFixed(0);
        }
      },
      title: {
        text: "en (%)"
      }
    };
    this.xaxisSoilHumidity = {
      type: "datetime"
    };
    this.tooltipSoilHumidity = {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }

  public initTemperatureAirCharts(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }
    this.seriesAirTemperature = [
      {
        name: "Temperature Air",
        data: dates
      }
    ];
    this.chartAirTemperature = {
      type: "line",
      stacked: false,
      height: 400,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      },
    };
    this.strokeAirTemperature = {
      curve: "straight",
      colors: ['#034035'],
      width: 3
    }

    this.dataLabelsAirTemperature = {
      enabled: false
    };
    this.markersAirTemperature = {
      size: 0
    };
    this.titleAirTemperature = {
      text: "Air Temperature",
      align: "center"
    };
    this.fillAirTemperature = {
      type: "solide",
      colors: ['#054237', '#111', '#fff'],

    };
    this.yaxisAirTemperature = {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      },
      title: {
        text: "en (°C)"
      }
    };
    this.xaxisAirTemperature = {
      type: "datetime"
    };
    this.tooltipAirTemperature = {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }

  public initTemperatureSoilCharts(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, (dataSeries[1][i].value - 10 - i)]);
    }

    this.seriesSoilTemperature = [
      {
        name: "Humidity Soil ",
        data: dates,
      }
    ];
    this.chartSoilTemperature = {
      type: "line",
      stacked: false,
      height: 400,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      },
    };
    this.strokeSoilTemperature = {
      curve: "straight",
      colors: ['#fb8f4d'],
      width: 3
    }

    this.dataLabelsSoilTemperature = {
      enabled: false
    };
    this.markersSoilTemperature = {
      size: 0
    };
    this.titleSoilTemperature = {
      text: "Soil Temperature",
      align: "center"
    };
    this.fillSoilTemperature = {
      type: "solide",
      colors: ['#054237', '#111', '#fff'],

    };
    this.yaxisSoilTemperature = {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      },
      title: {
        text: "en (°C)"
      }
    };
    this.xaxisSoilTemperature = {
      type: "datetime"
    };
    this.tooltipSoilTemperature = {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }
  updateDataAndChart(): void {
    // Update your dataSeries here, for example, changing the values randomly
    dataSeries[1] = dataSeries[1].map(point => ({
      date: point.date,
      value: Math.random() * 10000000  // You can replace this with your logic to update values
    }));

    // Update the chart data
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, (dataSeries[1][i].value - 10 - i)]);
    }
    this.seriesAirHumidity = [
      {
        name: "Humidity Air ",
        data: dates,
      }
    ];
    this.seriesSoilHumidity = [
      {
        name: "Humidity Soil ",
        data: dates,
      }
    ];
    this.seriesAirTemperature = [
      {
        name: "Temperature Air ",
        data: dates,
      }
    ];
    this.seriesSoilTemperature = [
      {
        name: "Temperature Soil ",
        data: dates,
      }
    ];

  }


  initAitHumidityGauge(): void {
    if (this.gaugeAirHumidityContainer) {
      const chart = echarts.init(this.gaugeAirHumidityContainer.nativeElement);
      const initialDataValue = 50;

      const option = {
        series: [
          {
            type: 'gauge',
            detail: {formatter: '{value}%', fontSize: 14},
            data: [{value: [initialDataValue], name: ''}],
            axisTick: {
              length: 8,
              lineStyle: {
                color: '#034035'
              }
            },
            axisLine: {
              lineStyle: {
                width: 5,
                color: [[1, '#034035']],
              }
            },
            splitLine: {
              length: 8,
              lineStyle: {
                color: '#054237'
              }
            },
            axisLabel: {
              fontSize: 10
            },
            pointer: {
              width: 6,
              itemStyle: {
                color: '#fb8f4d'
              }
            }
          }
        ]
      };

      chart.setOption(option);

      setInterval(() => {
        const newDataValue = Math.floor(Math.random() * 101);
        const newData = {value: newDataValue, name: ''};

        chart.setOption({
          series: [
            {
              data: [newData]
            }
          ]
        });
      }, 2000);
    }
  }

  initSoilHumidityGauge(): void {
    if (this.gaugeSoilHumidityContainer) {
      const chart = echarts.init(this.gaugeSoilHumidityContainer.nativeElement);
      const initialDataValue = 50;

      const option = {
        series: [
          {
            type: 'gauge',
            detail: {formatter: '{value}%', fontSize: 14},
            data: [{value: [initialDataValue], name: ''}],
            axisTick: {
              length: 8,
              lineStyle: {
                color: '#034035'
              }
            },
            axisLine: {
              lineStyle: {
                width: 5,
                color: [[1, '#034035']],
              }
            },
            splitLine: {
              length: 8,
              lineStyle: {
                color: '#054237'
              }
            },
            axisLabel: {
              fontSize: 10
            },
            pointer: {
              width: 6,
              itemStyle: {
                color: '#fb8f4d'
              }
            }
          }
        ]
      };

      chart.setOption(option);

      setInterval(() => {
        const newDataValue = Math.floor(Math.random() * 101);
        const newData = {value: newDataValue, name: ''};

        chart.setOption({
          series: [
            {
              data: [newData]
            }
          ]
        });
      }, 2000);
    }
  }

  initAirTemperatureGauge(): void {
    if (this.gaugeAirTemperatureContainer) {
      const chart = echarts.init(this.gaugeAirTemperatureContainer.nativeElement);
      const option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#fd904d'
            },
            progress: {
              show: true,
              width: 20
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 20
              }
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: '#054237'
              }
            },
            splitLine: {
              distance: -37,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#054237'
              }
            },
            axisLabel: {
              distance: -10,
              color: '#000000',
              fontSize: 12
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 16,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'inherit'
            },
            data: [
              {
                value: 20
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#034035'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 20,

              }
            ]
          }
        ]
      };
      chart.setOption(option);
      setInterval(function () {
        const random = +(Math.random() * 60).toFixed(2);
        chart.setOption({
          series: [
            {
              data: [
                {
                  value: random
                }
              ]
            },
            {
              data: [
                {
                  value: random
                }
              ]
            }
          ]
        });
      }, 2000);
    }
  }

  initSoilTemperatureGauge(): void {
    if (this.gaugeSoilTemperatureContainer) {
      const chart = echarts.init(this.gaugeSoilTemperatureContainer.nativeElement);
      const option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#fd904d'
            },
            progress: {
              show: true,
              width: 20
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 20
              }
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: '#054237'
              }
            },
            splitLine: {
              distance: -37,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#054237'
              }
            },
            axisLabel: {
              distance: -10,
              color: '#000000',
              fontSize: 12
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 16,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'inherit'
            },
            data: [
              {
                value: 20
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#034035'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 20,

              }
            ]
          }
        ]
      };
      chart.setOption(option);
      setInterval(function () {
        const random = +(Math.random() * 60).toFixed(2);
        chart.setOption({
          series: [
            {
              data: [
                {
                  value: random
                }
              ]
            },
            {
              data: [
                {
                  value: random
                }
              ]
            }
          ]
        });
      }, 2000);
    }
  }

  initBrightnessLineChart(): void {
    if (this.lineBrightnessContainer) {
      const chart = echarts.init(this.lineBrightnessContainer.nativeElement);
      let option;

      function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value),
          ],
        };
      }

      let data = [];
      let now = new Date(1997, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let value = Math.random() * 1000;
      for (let i = 0; i < 1000; i++) {
        data.push(randomData());
      }

      option = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            const date = new Date(params.name);
            return (
              date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear() +
              ' : ' +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: data,
            lineStyle: {
              color: '#fb8f4d',
            },
            lenght : 8
          },
        ],
      };

      setInterval(() => {
        for (let i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }
        chart.setOption({
          series: [
            {
              data: data,
            },
          ],
        });
      }, 500);

      chart.setOption(option);
    }
  }

  initTempHumLineChart(){
    this.chartTempHumOptions = {
      series: [
        {
          name: "Air Tempertaure",
          data: [23, 24, 25, 26, 24, 21, 25, 30, 32, 34, 33, 28],
          color : '#034035'
        },
        {
          name: "Soil Tempertaure",
          data: [35, 36, 41, 42, 43, 45, 39, 37, 36, 35, 32, 35],
          color : '#5abb6c'
        },
        {
          name: "Air Humidity",
          data: [66, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
          color : '#fb8f4d'
        },
        {
          name: "Soil Humidity",
          data: [56, 57, 70, 89, 55, 44, 23, 30, 44, 65, 80, 89],
          color : '#fccb5e'
        }
      ],
      chart: {
        height: 450,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: "straight",
        dashArray: [5, 5, 5, 5]
      },
      title: {
        text: "",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "26 Feb",
          "27 Feb",
          "28 Feb",
          "29 Feb",
          "01 Mars",
          "02 Mars",
          "03 Mars",
          "01 Mars",
          "02 Mars",
          "03 Mars",
          "04 Mars",
          "05 Mars",
          "06 Mars",
          "07 Mars",
          "08 Mars",
          "09 Mars",
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }
}

