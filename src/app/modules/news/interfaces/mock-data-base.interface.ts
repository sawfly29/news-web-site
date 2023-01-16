import { NewsPreview } from './news-preview.interface';
import { FullNews } from './full-news.interface';
import { DataBaseCapacity } from './data-base-capacity.interface';

export interface MockDataBase {
  "news": NewsPreview[],
  "_news-capacity": DataBaseCapacity,

  [key: string]: FullNews | NewsPreview[] | DataBaseCapacity,
}
