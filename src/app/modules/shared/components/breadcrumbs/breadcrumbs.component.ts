import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Breadcrumb } from '../../../news/interfaces/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [NgIf, NgForOf],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[];
}
