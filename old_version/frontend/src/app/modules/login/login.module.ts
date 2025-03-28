import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {UIModule} from "../../shared/ui/ui.module";
import {CarouselModule} from "ngx-owl-carousel-o";
import {LoginComponent} from "./login.component";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    UIModule,
    CarouselModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
