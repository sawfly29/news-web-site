import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsListRoutingModule } from './news-list-routing.module';
import { NewsPreviewComponent } from './components/news-preview/news-preview.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';
import { NewsPreviewImageComponent } from './components/news-preview-image/news-preview-image.component';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsPreviewComponent,
    CreateNewsComponent,
    NewsPreviewImageComponent,
  ],
  imports: [
    CommonModule,
    NewsListRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class NewsListModule {}
