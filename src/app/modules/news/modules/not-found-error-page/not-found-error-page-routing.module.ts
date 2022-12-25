import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundErrorPageComponent } from "./components/not-found-error-page/not-found-error-page.component";

const routes: Routes = [
  {
    path: '',
    component: NotFoundErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundErrorPageRoutingModule {
}
