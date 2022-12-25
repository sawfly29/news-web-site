import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NewsService } from '../../../../services/news.service';
import { NewsStore } from '../../../../types/news-store.type';
import { CreateNewsComponent } from '../create-news/create-news.component';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  @ViewChild(TemplateRef) dialogTemplate: TemplateRef<CreateNewsComponent>;

  news$: Observable<NewsStore> = this.newsService.news$;

  isLoadingNews = true;

  private readonly dialogRefConfig: MatDialogConfig = {
    width: '100%',
    maxWidth: '600px',
    height: 'fit-content',
    maxHeight: '90vh',
  };

  constructor(public dialog: MatDialog, private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.loadNews().subscribe(() => (this.isLoadingNews = false));
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isLoadingNews) return;

    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (pos === max) {
      this.isLoadingNews = true;
      this.newsService.loadNews().subscribe(() => (this.isLoadingNews = false));
    }
  }

  onCreateNewsButtonClick() {
    const dialogRef = this.dialog.open(
      CreateNewsComponent,
      this.dialogRefConfig
    );
    dialogRef.afterClosed().subscribe();
  }
}
