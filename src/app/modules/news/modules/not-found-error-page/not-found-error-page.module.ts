import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundErrorPageComponent } from './components/not-found-error-page/not-found-error-page.component';
import { NotFoundErrorPageRoutingModule } from './not-found-error-page-routing.module';

@NgModule({
  declarations: [NotFoundErrorPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundErrorPageRoutingModule,
    MatButtonModule,
  ],
})
export class NotFoundErrorPageModule {}
