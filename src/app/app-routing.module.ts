import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './modules/news/components/news/news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: 'avto-novosti',
        loadChildren: () =>
          import('./modules/news/modules/news-list/news-list.module').then(
            (m) => m.NewsListModule
          ),
        title: 'Список новостей',
      },
      {
        path: '404',
        loadChildren: () =>
          import(
            './modules/news/modules/not-found-error-page/not-found-error-page.module'
          ).then((m) => m.NotFoundErrorPageModule),
        title: 'Страница не найдена',
      },
      {
        path: '',
        redirectTo: 'avto-novosti',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'avto-novosti',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
