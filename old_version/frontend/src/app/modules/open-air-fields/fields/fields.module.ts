import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from './fields/fields.component';
import {FieldsRoutingModule} from "./fields-routing.module";
import { FieldsStatisticsComponent } from './fields-statistics/fields-statistics.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {UIModule} from "../../../shared/ui/ui.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "../../../shared/shared.module";
import {NgApexchartsModule} from "ng-apexcharts";



@NgModule({
  declarations: [
    FieldsComponent,
    FieldsStatisticsComponent
  ],
  imports: [
    CommonModule,
    FieldsRoutingModule,
    BsDropdownModule,
    UIModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    SharedModule,
    NgApexchartsModule
  ]
})
export class FieldsModule { }
