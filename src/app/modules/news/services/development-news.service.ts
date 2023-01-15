import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { NewsPreview } from '../interfaces/news-preview.interface';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { FullNews } from '../interfaces/full-news.interface';
import { Router } from '@angular/router';
import { DataBaseCapacity } from '../interfaces/data-base-capacity.interface';
import { NewsServiceBase } from '../class/news-base.class';
import { CustomNews } from '../types/custom-news.type';
import { NewsStore } from '../types/news-store.type';

export const NEWS_LOCAL_STORAGE_KEY = 'news';

@Injectable()
export class DevelopmentNewsService extends NewsServiceBase {
  newsDataBaseCapacity: number = Infinity;
  private readonly NEWS_API = 'http://localhost:3004';

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
      .get<FullNews>(`${this.NEWS_API}${newsLink}`)
      .pipe(catchError(() => EMPTY));
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
      .get<NewsPreview[]>(`${this.NEWS_API}/news?_page=${this.currentNewsPage}&_limit=${this.loadAmount}`)
      .pipe(catchError(() => EMPTY));
  } // TODO: catch 404 on getNewsPreview

  protected setNewsDataBaseCapacity() {
    this.http.get<DataBaseCapacity>(`${this.NEWS_API}/_news-capacity`)
      .subscribe(({ capacity }) => this.newsDataBaseCapacity = capacity);
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
}
