import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsModule } from './modules/news/news.module';
import { BadRequestNewsInterceptor } from './bad-request-news-interceptor.service';
import { NewsServiceBase } from './modules/news/class/news-base.class';
import { ProductionNewsService } from './modules/news/services/production-news.service';
import { environment } from '../environments/environment';
import { DevelopmentNewsService } from './modules/news/services/development-news.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BadRequestNewsInterceptor,
      multi: true,
    },
    {
      provide: NewsServiceBase,
      useClass: environment.production ? ProductionNewsService : DevelopmentNewsService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
