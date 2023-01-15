import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

const mockImageLink = 'https://www.freeiconspng.com/uploads/no-image-icon-6.png';

@Component({
  selector: 'app-news-preview-image',
  templateUrl: './news-preview-image.component.html',
  styleUrls: ['./news-preview-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPreviewImageComponent implements OnInit {
  @Input() src: string;

  isImageLoading = true;

  ngOnInit() {
    this.checkInputImageSrc();
  }

  onImageLoad() {
    this.isImageLoading = false;
  }

  onImageLoadError() {
    this.src = mockImageLink;
  }

  private checkInputImageSrc() {
    if (!this.src) {
      this.src = mockImageLink;
    }
  }
}
