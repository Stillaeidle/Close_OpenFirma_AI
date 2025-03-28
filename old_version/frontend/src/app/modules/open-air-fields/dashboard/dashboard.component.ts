import {Component, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {icon, Marker} from "leaflet";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexPlotOptions,
  ApexStates,
  ApexTheme,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";


export type CropChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  breadCrumbItems: any[];
  map: L.Map;
  @ViewChild("cropChart") chart: ChartComponent;
  public cropChartOptions: Partial<CropChartOptions>;
  @ViewChild("barChart") barChart: ChartComponent;
  public barChartOptions: Partial<BarChartOptions>;

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
  drawnItems: L.FeatureGroup;

  ngOnInit() {
    this.initCropChart()
    this.initBarChart()
    this.initMap()
    this.dropFields()
  }
  initMap() {
    this.map = L.map('fieldsMap').setView([30, -7], 6);

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
    this.drawnItems = L.featureGroup().addTo(this.map);
  }
  initCropChart() {
    this.cropChartOptions = {
      series: [1, 3, 1, 1],
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true
              }
            }
          }
        }
      },
      labels: ["Wheat", "Corn", "Barley", "Alfalfa"],
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8
        }
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          enabled: true,
          style: [
            "verticalLines",
            "squares",
            "horizontalLines",
            "circles"
          ]
        }
      },
      states: {
        hover: {
          filter: {
            type: "none"
          }
        }
      },
      theme: {
        palette: "palette2"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  initBarChart() {
    this.barChartOptions = {
      series: [
        {
          name: "Irrigation Amount (m³/ha)",
          data: [45, 25, 32, 47, 33, 15],
          color: '#054137'
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: [
          "Field 1",
          "Field 2",
          "Field 3",
          "Field 4",
          "Field 5",
          "Field 6",
        ]
      }
    };
  }

  dropFields() {
    this.fields.forEach(field => {
      // @ts-ignore
      const polygon = L.polygon(field.polygon, {color: 'red'}).addTo(this.drawnItems);
      const center = polygon.getBounds().getCenter();
      const marker = L.marker(center);
      const popupContent = `<b>Field Name:</b> ${field.fieldName}<br>
                                   <b>Crop Type:</b> ${field.crop_type}<br>
                                   <b>Area:</b> ${(field.area/1000).toFixed(2)} ha, ${field.area.toFixed(2)} m²<br>`;
      marker.bindPopup(popupContent);
      marker.addTo(this.map);

      polygon.on('mouseover', function() {
        marker.openPopup();
      });

      polygon.on('mouseout', function() {
        marker.closePopup();
      });
      this.map.fitBounds(this.drawnItems.getBounds());
    });
  }


}
