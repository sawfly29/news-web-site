import { NewsPreview } from './news-preview.interface';

export interface NewsResponse {
  totalCount: number;
  news: NewsPreview[];
}
