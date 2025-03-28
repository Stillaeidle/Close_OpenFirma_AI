import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-energie-consumption',
  templateUrl: './energie-consumption.component.html',
  styleUrls: ['./energie-consumption.component.scss']
})
export class EnergieConsumptionComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  public chart: any;


  constructor() {
  }

  ngOnInit() {
    this.barchartLightConsumption()
  }

  barchartLightConsumption() {

    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: ['20/02', '21/02', '22/02', '23/02', '24/02', '25/02', '26/02', '27/02', '28/02', '29/02', '01/03', '02/03', '03/03', '04/03', '05/03', '06/03', '07/03', '08/03', '09/03'],
        datasets: [
          {
            label: "Light Consumption",
            data: [10.3, 12.9, 12.26, 13.56, 12.36, 12.26, 14.35, 14.32, 16.56, 11.98, 10.65, 9.35, 8.53, 12.53, 13.53, 15.35, 12.54, 10.35, 11.35],
            backgroundColor : '#fb8f4d',
            borderWidth : 1,
            borderColor : '#034035'
          }]

      },
      options: {aspectRatio: 2.5}
    });
  }
}

