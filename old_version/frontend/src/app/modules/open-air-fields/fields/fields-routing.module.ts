import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FieldsComponent} from "./fields/fields.component";
import {FieldsStatisticsComponent} from "./fields-statistics/fields-statistics.component";

const routes: Routes = [
  {
    path: '',
    component: FieldsComponent
  },
  {
    path: 'statistics',
    component: FieldsStatisticsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule {
}
