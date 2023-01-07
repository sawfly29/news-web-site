// lorem text file created using https://www.lipsum.com/
const fs = require('fs');
const axios = require('axios');

interface NewsPreview {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  url: string;
  fullUrl: string;
  titleImageUrl?: string;
  categoryType: string;
}

interface FullNews extends NewsPreview {
  text: string;
}

interface PhotosAlbum {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string,
}

interface ArticleCount {
  count: number,
}

interface DbTemplate {
  "news": NewsPreview[],
  "_articles-amount": ArticleCount,

  [key: string]: FullNews | NewsPreview[] | ArticleCount,
}

enum TagsType {
  'paragraph' = 'p',
  'division' = 'div',
  'article' = 'article',
  'section' = 'section',
}

const maxTitleLength = 12;
const minTitleLength = 5;
const maxParagraphAmount = 8;
const minParagraphAmount = 3;
const maxAdditionImagesAmount = 9;
const minAdditionImagesAmount = 2;
const newsCategory = 'common-news';
const photosUrl = 'https://jsonplaceholder.typicode.com/photos';
const basePath = './mock-api/db-creation/';
const dbSavePath = './mock-api/';
const lorem = fs.readFileSync(`${basePath}/lorem.txt`, {encoding: 'utf8', flag: 'r'});
const loremParagraphsArray: string[] = lorem.split('\n\n')
const newsDate = new Date();
const photosImagesArr: string[] = [];

function createJsonDB(): Promise<void> {
  return axios.get(photosUrl)
    .then(({data: photosAlbums}: any) => {
      photosAlbums.forEach((album: PhotosAlbum) => photosImagesArr.push(album.url));
      const dbTemplate: DbTemplate = {
        'news': [],
        "_articles-amount": {count: loremParagraphsArray.length},
      }

      loremParagraphsArray.forEach((paragraph, index) => {
        const paragraphWords = paragraph.split(' ');
        const newsTitle = getFirstParagraphWords(paragraphWords, getRandomInt(maxTitleLength, minTitleLength));
        const newsLink = getNewsLink(newsTitle);
        const previewImageIndex = getRandomInt(photosAlbums.length);

        newsDate.setDate(newsDate.getDate() - index)

        const newsPreview: NewsPreview = {
          id: index,
          title: newsTitle,
          description: getLastParagraphWords(paragraphWords, getRandomInt(maxTitleLength, minTitleLength)),
          categoryType: newsCategory,
          publishedDate: newsDate.toJSON(),
          titleImageUrl: photosImagesArr[previewImageIndex],
          url: `news/${newsLink}`,
          fullUrl: '',
        }

        const fullNews: FullNews = {...newsPreview, text: getInlineHtml(previewImageIndex)};

        dbTemplate["news"].push(newsPreview);
        dbTemplate[newsLink] = fullNews;
      })
      fs.writeFileSync(`${dbSavePath}/db.json`, JSON.stringify(dbTemplate));
      console.log('Database created successfully!')
    });
}

module.exports = { createJsonDB }

function getInlineHtml(index: number): string {
  const paragraphsAmount = getRandomInt(maxParagraphAmount, minParagraphAmount);
  const additionImagesAmount = getRandomInt(maxAdditionImagesAmount, minAdditionImagesAmount);
  let inlineHtml = getInlineImage(index, 'article__main-illustration');
  let articleImages = '';

  for (let i = 0; i < paragraphsAmount; i++) {
    inlineHtml = inlineHtml +
      wrapInTags(loremParagraphsArray[getRandomInt(loremParagraphsArray.length)], TagsType.paragraph, 'article__paragraph');
  }

  for (let i = 0; i < additionImagesAmount; i++) {
    articleImages = articleImages + getInlineImage(getRandomInt(photosImagesArr.length));
  }

  return wrapInTags(
    wrapInTags(inlineHtml, TagsType.section, 'article__content') +
    wrapInTags(articleImages, TagsType.section, 'article__illustration-container'),
    TagsType.article, 'article'
  );
}

function getInlineImage(index: number, className: string = 'article__illustration'): string {
  return `<a class=\"${className}\" href=\"${photosImagesArr[index]}\" rel=\"group2\" style=\"float: left\"><img alt=\"\" src=\"${photosImagesArr[index]}\" style=\"border-style:solid; border-width:0px; float:left; height:233px; margin:5px; width:350px\" /></a>`
}

function getRandomInt(max: number = 100, min: number = 0): number {
  if (max < min) return 0;
  let randomNumber = Math.floor(Math.random() * max);

  while (randomNumber < min) {
    randomNumber = Math.floor(Math.random() * max);
  }

  return randomNumber;
}

function getNewsLink(paragraphWords: string): string {
  return paragraphWords.toLowerCase().replace(/\s/g, '-').replace(/[^a-z-]/g, '');
}

function getFirstParagraphWords(paragraphWords: string[], titleLength: number): string {
  if (paragraphWords.length < titleLength) return paragraphWords.join(' ');

  return normalizeText(paragraphWords.slice(0, titleLength).join(' '));
}

function getLastParagraphWords(paragraphWords: string[], titleLength: number): string {
  if (paragraphWords.length < titleLength) return paragraphWords.join(' ');
  const sentence = paragraphWords.slice(-titleLength).join(' ');

  return normalizeText(sentence)
}

function normalizeText(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1, text.length - 1) + text[text.length - 1].replace(/[^a-zA-Z]/, '');
}

function getOpeningTag(tag: string, className: string): string {
  return `<${tag} class="${className}">\r\n\t`
}

function getClosingTag(tag: string): string {
  return `</${tag}>\r\n`
}

function wrapInTags(content: string, tagsType: TagsType, className: string): string {
  return `${getOpeningTag(tagsType, className)}${content}${getClosingTag(tagsType)}`
}
