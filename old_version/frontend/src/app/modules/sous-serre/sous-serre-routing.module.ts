import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TimeChartComponent} from "./time-chart/time-chart.component";
import {WaterConsumptionComponent} from "./water-consumption/water-consumption.component";
import {IrrigationControlComponent} from "./irrigation-control/irrigation-control.component";
import {EnergieConsumptionComponent} from "./energie-consumption/energie-consumption.component";
import { FertigationComponent } from './fertigation/fertigation.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'time-charts',
    component: TimeChartComponent
  },
  {
    path: 'water-consumption',
    component: WaterConsumptionComponent
  },
  {
    path: 'energy-consumption',
    component: EnergieConsumptionComponent
  },
  {
    path: 'irrigation-control',
    component: IrrigationControlComponent
  },
  {
    path: 'fertigation',
    component: FertigationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousSerreRoutingModule {
}
