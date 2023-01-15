import { CustomNews } from './custom-news.type';
import { NewsPreview } from '../interfaces/news-preview.interface';

export type NewsStore = (CustomNews | NewsPreview)[];
