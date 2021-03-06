# Шаблон для быстрого старта

### Установка шаблона:
```sh
npm i
```
## Команды:
#### Запуск шаблона:
```sh
npm run start
```
#### Production сборка:
```sh
npm run prod
```
## Структура папок и файлов
```
├── app/                          # Исходная директория
│   ├── fonts/                    # Шрифты
│   ├── img/                      # Исходные картинки
│   │   └── favicons/             # Фавиконки
│   │   └── sprite/               # Папка для генерации спрайтов
│   ├── js/                       # Скрипты
│   │   └── script.js             # Главный скрипт
│   └── scss/                     # Стили
│   │   ├── base                  # Базовые стили
│   │   │   ├── base.scss         # Базовые стили шаблона
│   │   │   ├── default.scss      # Сброс стилей
│   │   │   ├── mixins.scss       # Sass-миксины
│   │   │   ├── typography.scss   # Подключение шрифтов
│   │   │   └── variables.scss    # Переменные стилей
│   │   ├── blocks/               # Стили блоков
│   │   └── style.scss            # Корневой файл стилей
│   └── views/                    # Страницы
│       └── layouts/              # Шаблоны
│       │   └── layout.pug        # Базовый шаблон
│       └── index.pug             # Главная
├── public/                       # Директория сборки
│   ├── css/                      # Стили
│   ├── img/                      # Изображения
│   │   └── favicons/             # Фавиконки
│   ├── js/                       # Скрипты
│   └── index.html                # Страница
├── tasks/                        # Таски проекта
├── .babelrc                      # Babel-конфиг
├── .editorconfig                 # Конфигурация настроек редактора кода
├── .eslintrc                     # ESLint-конфиг
├── .gitignore                    # Список исключённых файлов из Git
├── .stylelintrc                  # Stylelint-конфиг
├── gulpfile.babel.js             # Gulp-конфиг
└── package.json                  # Список зависимостей
```
