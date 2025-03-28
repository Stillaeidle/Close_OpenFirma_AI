import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {SousSerreRoutingModule} from './sous-serre-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {NgApexchartsModule} from "ng-apexcharts";
import {HttpClientModule} from "@angular/common/http";
import {UIModule} from "../../shared/ui/ui.module";
import {WidgetModule} from "../../shared/widget/widget.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {TabsModule} from "ngx-bootstrap/tabs";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {SimplebarAngularModule} from "simplebar-angular";
import {LightboxModule} from "ngx-lightbox";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import { TimeChartComponent } from './time-chart/time-chart.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { WaterConsumptionComponent } from './water-consumption/water-consumption.component';
import { IrrigationControlComponent } from './irrigation-control/irrigation-control.component';
import { EnergieConsumptionComponent } from './energie-consumption/energie-consumption.component';
import {NgChartsModule} from "ng2-charts";
import { FertigationComponent } from './fertigation/fertigation.component';
import {NgxSpinnerComponent} from "ngx-spinner";



@NgModule({
  declarations: [
    DashboardComponent,
    TimeChartComponent,
    WaterConsumptionComponent,
    IrrigationControlComponent,
    EnergieConsumptionComponent,
    FertigationComponent
  ],
  imports: [
    CommonModule,
    SousSerreRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,
    NgSelectModule,
    NgOptimizedImage,
    NgChartsModule,
    NgxSpinnerComponent
  ]
})
export class SousSerreModule {
}
