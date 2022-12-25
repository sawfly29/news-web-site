import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsPageRoutingModule } from "./news-page-routing.module";
import { RouterOutlet } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  declarations: [
    NewsPageComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    NewsPageRoutingModule,
    MatCardModule,
    SharedModule,
  ],
})
export class NewsPageModule {
}
