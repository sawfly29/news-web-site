import { Component, Input, OnInit } from '@angular/core';
import { NewsPreview } from '../../../../interfaces/news-preview.interface';
import { CustomNews } from '../../../../types/custom-news.type';

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.scss'],
})
export class NewsPreviewComponent implements OnInit {
  @Input() newsPreviewData: NewsPreview | CustomNews;

  imageSource: string;
  newsUrl: string[] = [];

  ngOnInit() {
    this.setInitialProps();
  }

  private setInitialProps() {
    if ('url' in this.newsPreviewData) {
      this.imageSource = this.newsPreviewData.titleImageUrl || '';
      this.newsUrl.push(...this.getCorrectLinkParams(this.newsPreviewData.url));
    } else {
      this.imageSource = this.newsPreviewData.titleImageRaw;
    }
  }

  private getCorrectLinkParams(url: string): string[] {
    return ['/', ...url.split('/')];
  }
}
