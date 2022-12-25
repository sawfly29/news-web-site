import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-news-page-content',
  templateUrl: './news-page-content.component.html',
  styleUrls: ['./news-page-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsPageContentComponent {
  @Input() rawContent: string;
}
