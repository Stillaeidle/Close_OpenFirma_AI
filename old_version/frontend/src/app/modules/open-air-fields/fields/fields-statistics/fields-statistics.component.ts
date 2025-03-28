import {Component, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw-src.js';
import {icon, Marker} from 'leaflet';
import {WeatherService} from "../../services/weather.service";
import {Loading} from "../../../../core/helpers/loading";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

/***************** Personalize the marker icon ************************/
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;
/***********************************************************************/


@Component({
  selector: 'app-fields-statistics',
  templateUrl: './fields-statistics.component.html',
  styleUrls: ['./fields-statistics.component.scss']
})
export class FieldsStatisticsComponent implements OnInit {
  breadCrumbItems: any[];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("WaterRequirementChart") waterRequirementChart: ChartComponent;
  public WaterRequirementChartOptions: Partial<ChartOptions>;

  map: L.Map;
  drawnItems: L.FeatureGroup = new L.FeatureGroup();

  fields = [
    {
      ID: 0,
      fieldName: 'Field 1',
      latitude: 30.509596599203846,
      longitude: -8.798377811908724,
      area: 17619.97,
      crop_type: 'Wheat',
      polygon: [
        [30.51045133496514, -8.798997402191164],
        [30.50864946052525, -8.798686265945436],
        [30.508751105613126, -8.797758221626284],
        [30.510118683735666, -8.797978162765505],
        [30.510543737882447, -8.798450231552126]
      ],
      timestamp: '2022-02-19 09:30:00'
    },
    {
      ID: 1,
      fieldName: 'Field 2',
      latitude: 30.511637792401302,
      longitude: -8.797683119773867,
      area: 13220.97,
      crop_type: 'Barley',
      polygon: [
        [30.511921929522753, -8.798369765281679],
        [30.511215054991617, -8.798278570175173],
        [30.511173473976836, -8.798214197158815],
        [30.51103025034521, -8.798171281814577],
        [30.51115961363458, -8.796996474266054],
        [30.512245334457393, -8.797178864479067]
      ],
      timestamp: '2022-02-19 10:15:00'
    },
    {
      ID: 2,
      fieldName: 'Field 3',
      latitude: 30.500222386362,
      longitude: -8.839348554611208,
      area: 17685.02,
      crop_type: 'Corn',
      polygon: [
        [30.500982481190547, -8.839922547340395],
        [30.499397603183766, -8.839825987815859],
        [30.499462292587516, -8.83877456188202],
        [30.501047169540236, -8.838892579078676]
      ],
      timestamp: '2022-02-19 11:00:00'
    },
    {
      ID: 3,
      fieldName: 'Field 4',
      latitude: 30.49212170821891,
      longitude: -8.84879529476166,
      area: 69959.32,
      crop_type: 'Corn',
      polygon: [
        [30.492408225185297, -8.850699663162233],
        [30.490458141443582, -8.849380016326906],
        [30.492089375303088, -8.846890926361086],
        [30.493785274994234, -8.8480281829834]
      ],
      timestamp: '2022-02-19 11:45:00'
    },
    {
      ID: 4,
      fieldName: 'Field 5',
      latitude: 30.52496489400154,
      longitude: -8.857920169830324,
      area: 37600.02,
      crop_type: 'Agrumes',
      polygon: [
        [30.52679831096519, -8.857158422470095],
        [30.52664125222123, -8.856943845748903],
        [30.526207029666736, -8.857147693634035],
        [30.525939104143784, -8.857158422470095],
        [30.525583408773667, -8.857249617576601],
        [30.52427711754562, -8.857383728027346],
        [30.523131477037886, -8.857544660568239],
        [30.52361190857258, -8.858896493911745],
        [30.523981469675334, -8.85877847671509],
        [30.52466515401033, -8.858467340469362],
        [30.525201011342737, -8.858639001846315],
        [30.525579805260527, -8.858467340469362],
        [30.525866209437538, -8.858177661895754],
        [30.526050985877923, -8.857587575912477],
        [30.526429776482235, -8.857351541519167]
      ],
      timestamp: '2022-02-19 12:30:00'
    },
    {
      ID: 5,
      fieldName: 'Field 6',
      latitude: 35.16386043622833,
      longitude: -5.319356918334961,
      area: 509143.32,
      crop_type: 'Wheat',
      Polygon: [
        [35.167209841655534, -5.3141212463378915],
        [35.1646671642838, -5.3139066696167],
        [35.16282586552549, -5.313069820404054],
        [35.16051103080114, -5.323905944824219],
        [35.1646671642838, -5.325644016265869]
      ],
      timestamp: '2022-02-19 11:45:00'
    },
  ];
  selectedField = this.fields[0]
  currentWeatherData: any

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.initMap()
    if (this.selectedField != null)
      this.onSelectField()

    this.initChart()
    this.initWaterRequirementChart()

    setInterval(() => {
      // this.fetchCurrentWeatherData();
    }, 1000 * 60);
  }

  initMap() {
    this.map = L.map('mapStats').setView([30, -7], 6);

    const mqi = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      crossOrigin: true,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);


    const baseMaps = {
      'Open street map': osm,
      'Mapquest imagery': mqi
    };

    const overlays = {};

    L.control.layers(baseMaps, overlays, {position: 'bottomright'}).addTo(this.map);
    this.map.addLayer(this.drawnItems);
  }

  selectedYAxis: string = "relativeHumidity";

  initChart() {
    this.chartOptions = {
      series: [
        {
          name: "Relative Humidity",
          data: [60, 65, 70, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70, 65],
          color: '#f98e4c'
        }
      ],
      chart: {
        type: "area",
        height: 350
      },
      stroke: {
        curve: "straight",
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        opposite: true,
      },
      title: {
        text: "Field metrics overview : ",
        align: "left",
      },
      subtitle: {
        text: 'Today',
        align: "left"
      },
      labels: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
      legend: {
        horizontalAlign: "left",
      },
    };
  }

  onYAxisChange() {
    switch (this.selectedYAxis) {
      case "relativeHumidity":
        this.chartOptions.series = [
          { name: "Relative Humidity", data: [60, 65, 70, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70, 65], color: '#f98e4c' }
        ];
        break;
      case "evapotranspiration":
        this.chartOptions.series = [
          { name: "Evapotranspiration", data: [15, 20, 25, 30, 35, 40, 45, 50, 45, 40, 35, 30, 25, 20], color: '#2196F3' }
        ];
        break;
      case "temperature":
        this.chartOptions.series = [
          { name: "Temperature", data: [20, 22, 24, 26, 28, 30, 32, 34, 32, 30, 28, 26, 24, 22], color: '#ea7854' }
        ];
        break;
      case "windSpeed":
        this.chartOptions.series = [
          { name: "Wind Speed", data: [10, 12, 14, 16, 18, 20, 22, 24, 22, 20, 18, 16, 14, 12], color: '#FFEB3B' }
        ];
        break;
      case "solarRadiation":
        this.chartOptions.series = [
          { name: "Solar Radiation", data: [100, 110, 120, 130, 140, 150, 160, 170, 160, 150, 140, 130, 120, 110], color: '#9C27B0' }
        ];
        break;
    }
  }

  initWaterRequirementChart() {
    this.WaterRequirementChartOptions = {
      series: [
        {
          name: "Irrigation amount",
          data: [2.85, 15.0, 20.9, 15.5, 15.7, 23.7, 13.5],
          color: '#054138'
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Prediction Of Water Requirement",
        align: "left"
      },
      subtitle: {
        text: "Amount in : m³/ha",
        align: "left"
      },
      labels: ["2 March 2023", "3 March 2023", "4 March 2023", "5 March 2023", "6 March 2023", "7 March 2023", "8 March 2023"],
      xaxis: {
        type: "category"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  fetchCurrentWeatherData() {
    console.log('fetch weather data')
    this.weatherService.fetchCurrentWeatherData(this.selectedField.latitude, this.selectedField.longitude)
      .then(data => {
        this.currentWeatherData = data;
        Loading.closeSwal()
      })
      .catch(error => {
        Loading.closeSwal()
        console.log(error)
      })
  }

  onSelectField() {
    Loading.showLoadingBox()
    this.fetchCurrentWeatherData()
    this.drawnItems.clearLayers();

    // Zoom to the selected field
    // @ts-ignore
    const polygon = L.polygon(this.selectedField.polygon, {color: 'red'}).addTo(this.drawnItems);
    const bounds = polygon.getBounds();
    const center = polygon.getBounds().getCenter();
    const marker = L.marker(center);
    this.drawnItems.addLayer(marker);

    // zoom the map to the polygon
    this.map.fitBounds(bounds);

  }

}
