import { Component, Input } from '@angular/core';
import { Breadcrumb } from "../../../news/interfaces/breadcrumbs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[];
}
