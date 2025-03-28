import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './core/guards/auth.guard';
import {HomeComponent} from "./shared/home/home.component";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {Error404Component} from "./shared/error-pages/error404/error404.component";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'greenhouse',
        loadChildren: () => import('./modules/sous-serre/sous-serre.module').then(m => m.SousSerreModule)
      },
      {
        path: 'openair-fields',
        loadChildren: () => import('./modules/open-air-fields/open-air-fields.module').then(m => m.OpenAirFieldsModule)
      },
    ]
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
