import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {
    path: 'overview',
    component: DashboardComponent
  },
  {
    path: 'fields',
    loadChildren: () => import('./fields/fields.module').then(m => m.FieldsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAirFieldsRoutingModule {
}
