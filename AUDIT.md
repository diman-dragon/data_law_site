# DataLaw — Аудит и рефакторинг CSS/компонентов

## Что изменено и почему

### 🔴 Критические проблемы (исправлены)

**1. Тройное дублирование цветовых переменных**
- `tokens.css`, `global.css` и `header.css` независимо определяли `--navy`, `--gold` и другие цвета с разными значениями.
- **Решение:** единственный источник истины — `tokens.css`. Все остальные файлы используют переменные оттуда.

**2. Импорт шрифтов дублировался**
- Google Fonts подключались в `base.njk` И внутри `global.css`.
- **Решение:** только в `base.njk`, из `global.css` удалено.

**3. Виджет Layla: 4 CSS-файла без причины**
- `layla-widget.css` просто импортировал три других через `@import`.
- **Решение:** всё объединено в один файл `layla-widget.css`. Файлы `layla-window.css`, `layla-messages.css`, `layla-input.css` можно удалить.

---

### 🟡 Системные улучшения

**Токены**
- Добавлена полная система спейсингов (`--sp-1` … `--sp-32`)
- Типографическая шкала (`--fs-xs` … `--fs-hero`) вместо магических чисел
- Веса, межстрочные интервалы, трекинг — всё через переменные
- Тени (`--shadow-sm/md/lg`) и анимации (`--ease-out`, `--t-base` и т.д.)

**Кнопки**
- Вместо `.cta-btn` / `.cta-btn--light` — система `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--gold`
- Макрос `cta.njk` обновлён

**Карточки**
- Вместо инлайн-стилей в `card.njk` — компонентные классы `.card`, `.card__title`, `.card__desc`, `.card__arrow`
- `card--dark` для тёмного варианта

**Типографика**
- Убран `h1…h6 { font-weight: 900 }` как глобальный — заменён на `var(--fw-black)` через переменную
- Добавлены утилиты `.label`, `.label--gold`, `.label--with-line`
- Статистика: `.stat`, `.stat__num`, `.stat__label`

**Секции**
- `.page-section`, `.page-section--dark`, `.page-section--surface`
- Макрос `section.njk` использует новые классы

**Новости/статьи**
- Семантические классы `.article-item`, `.article-side` вместо инлайновых стилей в `index.njk`

---

### 🟢 Что НЕ трогали

- Логика `layla-widget.js` (работает корректно)
- HTML-структура хедера и футера (только классы уточнены)
- Страницы в `/pages/` (не в скоупе аудита)
- Конфиг `.eleventy.js`, `package.json`

---

## Миграция

### Удалить старые файлы:
```
src/_includes/components/layla-widget/layla-window.css
src/_includes/components/layla-widget/layla-messages.css
src/_includes/components/layla-widget/layla-input.css
src/css/tokens.css  ← заменить новым
```

### Заменить файлы из этого архива:
Все файлы кладутся в ту же структуру проекта, что и оригинал.

### Проверить в страницах:
Если в `.njk`-страницах есть:
- `.cta-btn` → заменить на `.btn.btn--primary`
- `.cta-btn--light` → `.btn.btn--secondary`
- `.block-label` → `.label.label--gold`
- `.edu-stat-num` → `.stat__num`
- `.edu-stat-label` → `.stat__label`

---

## Структура токенов

```
tokens.css
├── Цвета: --c-ink, --c-navy, --c-gold, --c-paper, --c-washi, --c-surface, --c-text, --c-border …
├── Типографика: --f-sans, --f-serif, --fs-xs … --fs-hero, --fw-*, --lh-*, --ls-*
├── Отступы: --sp-1 … --sp-32, --section-pad
├── Сетка: --max-w, --max-w-content, --gutter
├── Анимации: --ease-out, --ease-in, --ease-std, --t-fast, --t-base, --t-slow
├── Хедер: --header-h, --header-h-mob
└── Тени: --shadow-sm, --shadow-md, --shadow-lg
```
