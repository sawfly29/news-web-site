import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-page-content',
  template: '<div class="news-page__content" [innerHTML]="rawContent"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageContentComponent {
  @Input() rawContent: string;
}
