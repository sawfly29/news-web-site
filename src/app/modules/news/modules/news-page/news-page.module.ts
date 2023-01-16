import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NewsPageContentComponent } from './components/news-page-content/news-page-content.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsPageRoutingModule } from './news-page-routing.module';

@NgModule({
  declarations: [NewsPageComponent, NewsPageContentComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    NewsPageRoutingModule,
    MatCardModule,
    BreadcrumbsComponent,
  ],
})
export class NewsPageModule {}
