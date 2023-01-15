import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NewsStore } from '../../../../types/news-store.type';
import { CreateNewsComponent } from '../create-news/create-news.component';
import { NewsServiceBase } from '../../../../class/news-base.class';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent implements OnInit {

  news$: Observable<NewsStore> = this.newsService.news$;

  isLoadingNews = true;
  imageLoadThresholdLevel: number = 0.1;
  imageLoadThreshold: number = 1;

  private readonly dialogRefConfig: MatDialogConfig = {
    width: '100%',
    maxWidth: '600px',
    height: 'fit-content',
    maxHeight: '90vh',
  };

  constructor(
    public dialog: MatDialog,
    private newsService: NewsServiceBase,
    private ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.initDisplayParams();

    this.newsService.loadNews().subscribe(() => this.isLoadingNews = false);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isLoadingNews || this.newsService.isMaxCapacityReached) return;

    const docElement = document.documentElement;

    if (Math.abs(docElement.scrollHeight - docElement.scrollTop - docElement.clientHeight) < this.imageLoadThreshold) {
      this.isLoadingNews = true;
      this.newsService.loadNews().subscribe(() => this.isLoadingNews = false);
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.initDisplayParams();
  }

  onCreateNewsButtonClick() {
    const dialogRef = this.dialog.open(CreateNewsComponent, this.dialogRefConfig);

    dialogRef.afterClosed().subscribe(() => this.ref.markForCheck());
  }

  private initDisplayParams() {
    this.imageLoadThreshold = document.documentElement.clientHeight * this.imageLoadThresholdLevel;
  }
}
