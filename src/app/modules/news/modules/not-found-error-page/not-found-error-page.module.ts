import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundErrorPageComponent } from './components/not-found-error-page/not-found-error-page.component';
import { RouterModule } from "@angular/router";
import { NotFoundErrorPageRoutingModule } from "./not-found-error-page-routing.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    NotFoundErrorPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundErrorPageRoutingModule,
    MatButtonModule,
  ]
})
export class NotFoundErrorPageModule { }
