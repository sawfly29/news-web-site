import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Breadcrumb } from '../../../modules/news/interfaces/breadcrumbs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[];
}
