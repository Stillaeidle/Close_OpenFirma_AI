import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAirFieldsRoutingModule } from './open-air-fields-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {WeatherService} from "./services/weather.service";
import {UIModule} from "../../shared/ui/ui.module";
import {NgApexchartsModule} from "ng-apexcharts";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    OpenAirFieldsRoutingModule,
    UIModule,
    NgApexchartsModule
  ],
  providers: [WeatherService]
})
export class OpenAirFieldsModule { }
