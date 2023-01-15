import { Injectable } from '@angular/core';
import { NewsServiceBase } from '../class/news-base.class';
import { catchError, delay, EMPTY, map, Observable, of, tap } from 'rxjs';
import { FullNews } from '../interfaces/full-news.interface';
import { MockDataBase } from '../interfaces/mock-data-base.interface';
import { NewsPreview } from '../interfaces/news-preview.interface';
import { CustomNews } from '../types/custom-news.type';
import { NEWS_LOCAL_STORAGE_KEY } from './development-news.service';
import { LocalStorageService } from './local-storage.service';
import { NewsStore } from '../types/news-store.type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ProductionNewsService extends NewsServiceBase {
  newsDataBaseCapacity: number = Infinity;
  private mockDataBasePath = '/news-web-site/assets/db.json';

  constructor(
    private localStorageService: LocalStorageService,
    protected override http: HttpClient,
    protected override router: Router,
  ) {
    super(http, router);
    this.setNewsDataBaseCapacity();
  }

  loadFullNews(newsLink: string): Observable<FullNews> {
    return this.http
      .get<MockDataBase>(this.mockDataBasePath)
      .pipe(
        map((mockDataBase) => {
          const requestedNewsTitle = newsLink.replace('/news/', '');
          return mockDataBase[requestedNewsTitle] as FullNews;
        }),
        tap((fullNews) => {
          if (!fullNews) this.router.navigate(['/404']);
        }),
        catchError(() => EMPTY),
      );
  }

  saveNews(customNews: CustomNews) {
    this.newsStorage.unshift(customNews);
    const currentLocalStorage = this.getLocalStorageNews();
    currentLocalStorage.unshift(customNews);
    this.localStorageService.setLocalStorageData(NEWS_LOCAL_STORAGE_KEY, JSON.stringify(currentLocalStorage));
  }

  loadNews(): Observable<NewsStore> {
    this.currentNewsPage++;

    const newsObs$ = this.newsStorage.length
      ? this.getNewsPreviews()
      : this.cachedNewsStrategy();

    return newsObs$.pipe(tap((newsResponse) => {
      this.newsStorage.push(...newsResponse);
      this.emitCards();
    }));
  }

  protected getNewsPreviews(): Observable<NewsPreview[]> {
    return this.http
      .get<MockDataBase>(this.mockDataBasePath)
      .pipe(
        delay(700),
        map((dataBase) => this.getMockNewsPreviews(dataBase)),
        catchError(() => EMPTY),
      );
  }

  protected setNewsDataBaseCapacity() {
    this.http.get<MockDataBase>(this.mockDataBasePath)
      .subscribe((dataBase) => this.newsDataBaseCapacity = dataBase['_news-capacity'].capacity);
  }

  private cachedNewsStrategy(): Observable<NewsStore> {
    const news = this.getLocalStorageNews();

    if (news.length > this.loadAmount) {
      return of(news);
    } else {
      return this.getNewsPreviews().pipe(map((res) => [...news, ...res]));
    }
  }

  private getLocalStorageNews(): CustomNews[] {
    return (
      this.localStorageService.getLocalStorageData(NEWS_LOCAL_STORAGE_KEY) || []
    );
  }

  private getMockNewsPreviews(dataBase: MockDataBase): NewsPreview[] {
    const totalPages = dataBase['_news-capacity'].capacity;
    const startIndex = this.currentNewsPage * this.loadAmount - this.loadAmount;
    const endIndex = startIndex + this.loadAmount < totalPages ? startIndex + this.loadAmount : totalPages - 1;

    return dataBase.news.slice(startIndex, endIndex);
  }
}
