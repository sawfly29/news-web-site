import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../../interfaces/breadcrumbs';
import { FullNews } from '../../../../interfaces/full-news.interface';
import { NewsServiceBase } from '../../../../class/news-base.class';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent {
  readonly news$: Observable<FullNews> = this.newsService.loadFullNews(this.router.routerState.snapshot.url);

  readonly breadcrumbs: Breadcrumb[] = [
    {
      title: 'Список новостей',
      path: '/news',
      class: 'breadcrumbs__link_parent',
    },
    {
      title: 'Новость',
      class: 'breadcrumbs__link_current',
    },
  ];

  constructor(
    private router: Router,
    private newsService: NewsServiceBase,
  ) {
  }
}
