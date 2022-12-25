import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from '../../../../services/news.service';
import { Breadcrumb } from '../../../../interfaces/breadcrumbs';
import { FullNews } from '../../../../interfaces/full-news.interface';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent {
  news$: Observable<FullNews> = this.newsService.loadNewsItem(
    this.router.routerState.snapshot.url
  );

  readonly breadcrumbs: Breadcrumb[] = [
    {
      title: 'Список новостей',
      path: '/avto-novosti',
      class: 'breadcrumbs__link_parent',
    },
    { title: 'Новость', class: 'breadcrumbs__link_current' },
  ];

  constructor(private router: Router, private newsService: NewsService) {}
}
