import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIModule} from './ui/ui.module';
import {WidgetModule} from './widget/widget.module';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {FooterComponent} from "./footer/footer.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {TopbarComponent} from "./topbar/topbar.component";
import {LanguageService} from "../core/services/language.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {SimplebarAngularModule} from "simplebar-angular";
import {TranslateModule} from "@ngx-translate/core";
import {HomeComponent} from "./home/home.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {Error401Component} from "./error-pages/error401/error401.component";
import {Error404Component} from "./error-pages/error404/error404.component";

@NgModule({
  declarations: [
    MainLayoutComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    HomeComponent,
    Error401Component,
    Error404Component
  ],
  imports: [
    CommonModule,
    WidgetModule,
    BsDropdownModule.forRoot(),
    UIModule,
    SimplebarAngularModule,
    TranslateModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [LanguageService]
})

export class SharedModule {
}
