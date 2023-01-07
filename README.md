# NewsWebSite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.3.

## Development

Run `npm start` to start developer frontend application along with backend server.
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Backend server runs on `http://localhost:3004/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Initial task

Реализовать 2 страницы:
1 - Родительская – список новостей.
2 - Дочерняя – страница новости.

Для каждой новости должны отображаться название, описание/содержание, дата публикации,
фото.
На странице со списком новостей сделать кнопку «Добавить новость», по нажатию на которую
открывается модальное окно с формой:
* «Название» - текстовое поле.
* «Описание» - текстовое поле.
* «Прикрепить фото» - кнопка, реализует функционал добавления фото (достаточно одной).
* «Сохранить» - кнопка, добавляет новость в начало списка. При этом уже загруженные
ранее данные сохраняются.

Добавленные новости хранить в storage браузера таким образом, чтобы после перезагрузки
страницы они отображались первыми. По нажатию на пользовательскую новость действий не
предусмотрено.

Реализовать подгрузку данных по мере скроллинга страницы.
По дизайну и вёрстке - обязателен адаптив, следование UI/UX стандартам отображения
подобного контента.
Источник данных:

1 - Список новостей: http://localhost:3004/news?_page=1&_limit=10 (последние 2 параметра - номер
страницы и количество элементов на ней).

2 - Отдельная новость: url приходит на этапе получения списка новостей, пример ссылки:
http://localhost:3004/lorem-ipsum-dolor-sit-amet
