import { Observable, Subject } from 'rxjs';
import { NewsStore } from '../types/news-store.type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FullNews } from '../interfaces/full-news.interface';
import { CustomNews } from '../types/custom-news.type';
import { NewsPreview } from '../interfaces/news-preview.interface';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class NewsServiceBase {

  news$ = new Subject<NewsStore>();

  abstract newsDataBaseCapacity: number;
  newsStorage: NewsStore = [];
  protected readonly loadAmount = 10;
  protected currentNewsPage = 0;

  protected constructor(
    protected http: HttpClient,
    protected router: Router,
  ) {
  }

  get isMaxCapacityReached() {
    return this.loadAmount * this.currentNewsPage > this.newsDataBaseCapacity;
  }

  emitCards() {
    this.news$.next(this.newsStorage);
  }

  abstract loadFullNews(newsLink: string): Observable<FullNews>;

  abstract loadNews(): Observable<NewsStore>

  abstract saveNews(customNews: CustomNews): void;

  protected abstract getNewsPreviews(): Observable<NewsPreview[]>;

  protected abstract setNewsDataBaseCapacity(): void;
}
