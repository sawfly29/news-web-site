import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from "./components/news-list/news-list.component";

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    pathMatch: 'full',
    title: 'Список новостей',
  },
  {
    path: ':url',
    loadChildren: () => import('../news-page/news-page.module').then(m => m.NewsPageModule),
    title: 'Новость',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsListRoutingModule {
}
