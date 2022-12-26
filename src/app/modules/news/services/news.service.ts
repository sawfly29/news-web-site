import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, Subject, tap } from "rxjs";
import { CustomNews } from "../types/custom-news.type";
import { NewsPreview } from "../interfaces/news-preview.interface";
import { LocalStorageService } from "./local-storage.service";
import { HttpClient } from "@angular/common/http";
import { NewsResponse } from "../interfaces/news-response.interface";
import { NewsStore } from "../types/news-store.type";
import { FullNews } from "../interfaces/full-news.interface";

export const NEWS_LOCAL_STORAGE_KEY = 'news'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news$ = new Subject<NewsStore>();
  private readonly NEWS_API = 'https://webapi.autodoc.ru/api/news'
  private readonly loadAmount = 10;
  private currentNewsPage = 0;
  private newsStorage: NewsStore = [];
  private newsAmount: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {
  }


  loadNews(): Observable<NewsStore> {
    this.currentNewsPage++;

    const newsObs$ = this.newsStorage.length ?
      this.getNewsPreviews() :
      this.cachedNewsStrategy();

    return newsObs$.pipe(
      tap((newsResponse) => {
        this.newsStorage.push(...newsResponse);
        this.emitCards();
      }),
    );
  }

  loadNewsItem(newsLink: string): Observable<FullNews> {
    return this.http.get<FullNews>(`${this.NEWS_API}/item${newsLink}`).pipe(
      catchError(() => EMPTY),
    );
  }

  emitCards() {
    this.news$.next(this.newsStorage);
  }

  saveNews(customNews: CustomNews) {
    this.newsStorage.unshift(customNews);
    const currentLocalStorage = this.getLocalStorageNews();
    currentLocalStorage.unshift(customNews);
    this.localStorageService.setLocalStorageData(NEWS_LOCAL_STORAGE_KEY, JSON.stringify(currentLocalStorage));
  }

  private cachedNewsStrategy(): Observable<NewsStore> {
    const news = this.getLocalStorageNews();

    if (news.length > this.loadAmount) {
      return of(news);
    } else {
      return this.getNewsPreviews().pipe(
        map((res) => [...news, ...res]),
      );
    }
  }

  private getLocalStorageNews(): CustomNews[] {
    return this.localStorageService.getLocalStorageData(NEWS_LOCAL_STORAGE_KEY) || [];
  }

  private getNewsPreviews(): Observable<NewsPreview[]> {
    return this.http.get<NewsResponse>(`${this.NEWS_API}/${this.currentNewsPage}/${this.loadAmount}`).pipe(
      catchError(() => EMPTY),
      map(({news, totalCount}) => {
        this.newsAmount = totalCount;
        return news;
      }),
    );
  }
}
