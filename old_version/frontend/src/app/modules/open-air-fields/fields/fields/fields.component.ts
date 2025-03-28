import {Component, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import 'leaflet-draw/dist/leaflet.draw-src.js';
import {icon, Marker} from 'leaflet';

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
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent {

  breadCrumbItems: any[];
  map: L.Map;
  drawnItems: L.FeatureGroup;
  drawControl: L.Control.Draw;
  isDrawing: boolean = false
  modalRef?: BsModalRef;


  @ViewChild('modal') modal;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
    this.initMap()
  }

  initMap() {
    this.map = L.map('map').setView([30, -7], 6);

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

    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);

    this.drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          shapeOptions: {
            color: 'green'
          }
        },
        // rectangle: {
        //   shapeOptions: {
        //     color: 'green'
        //   }
        // },
        rectangle: false,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });

    this.map.on(L.Draw.Event.CREATED, this.onDrawCreated, this);
  }

  startDrawing() {
    if (this.isDrawing)
      this.stopDrawing()
    else {
      this.isDrawing = true
      this.drawnItems.clearLayers()
      this.map.addControl(this.drawControl);
    }
  }

  stopDrawing() {
    this.isDrawing = false
    this.map.removeControl(this.drawControl);
  }

  onDrawCreated(event: any) {
    const layer = event.layer;
    this.drawnItems.clearLayers().addLayer(layer);
    const areaSquareMeters = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    const areaHectares = areaSquareMeters / 10000;

    // layer.getLatLngs().forEach(element => {
    //   console.log(element)
    //   element.map(({ lat, lng }) => console.log([lat, lng]));
    // })

    this.stopDrawing();

    const center = layer.getBounds().getCenter();
    const marker = L.marker(center);
    this.drawnItems.addLayer(marker);

    this.openModal(this.modal)
    layer.on('click', (e) => {
      this.openModal(this.modal)
    });

    layer.on('mouseover', (e) => {
      const popup = L.popup()
        .setLatLng(center)
        .setContent('Area: ' + areaHectares.toFixed(2) + ' ha (' + areaSquareMeters.toFixed(2) + ' m<sup>2</sup>' + ')')
        .openOn(this.map);
    });

    layer.on('mouseout', (e) => {
      this.map.closePopup();
    });
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

}
