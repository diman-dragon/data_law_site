(function () {
  'use strict';

  var input = document.getElementById('search-input');
  var container = document.getElementById('results-container');
  if (!input || !container) return;

  // Get the data URL that Nunjucks resolved with pathPrefix baked in.
  // We set data-url on the <script> tag itself so we can read it via currentScript.
  var me = document.currentScript || document.querySelector('script[data-url]');
  var dataUrl = me ? (me.getAttribute('data-url') || '') : '';
  if (!dataUrl) {
    // Last-resort fallback: try to infer from any script[src] that ends with /js/search.js
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      var m = scripts[i].src.match(/^(.*?)\/js\/search\.js(\?.*)?$/);
      if (m) { dataUrl = m[1] + '/data/echr_decisions.json'; break; }
    }
  }
  if (!dataUrl) dataUrl = '/data/echr_decisions.json';

  var db = [];
  var timer = null;

  input.disabled = true;
  input.placeholder = 'Загрузка базы…';

  fetch(dataUrl)
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (json) {
      db = Array.isArray(json) ? json : [];
      input.disabled = false;
      input.placeholder = 'Поиск по решениям…';
      input.focus();
    })
    .catch(function (e) {
      input.placeholder = '⚠ Не удалось загрузить базу';
      container.innerHTML = '<p class="sr-empty">Ошибка загрузки данных: ' + e.message + '</p>';
    });

  input.addEventListener('input', function () {
    clearTimeout(timer);
    var q = input.value;
    timer = setTimeout(function () { search(q.trim()); }, 180);
  });

  function search(q) {
    if (!q) { container.innerHTML = ''; return; }
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);

    var results = db.map(function (item) {
      var score = 0;
      var full = [item.title, item.article, item.case, item.summary, item.text]
        .filter(Boolean).join(' ').toLowerCase();
      terms.forEach(function (t) {
        if (item.title && item.title.toLowerCase().indexOf(t) !== -1) score += 5;
        if (item.article && item.article.toLowerCase().indexOf(t) !== -1) score += 4;
        if (item.case && item.case.toLowerCase().indexOf(t) !== -1) score += 3;
        if (item.summary && item.summary.toLowerCase().indexOf(t) !== -1) score += 2;
        if (full.indexOf(t) !== -1) score += 1;
      });
      return score > 0 ? { item: item, score: score } : null;
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; });

    render(results.map(function (r) { return r.item; }), q);
  }

  function render(items, q) {
    if (!items.length) {
      container.innerHTML = '<p class="sr-empty">По запросу «' + esc(q) + '» ничего не найдено.</p>';
      return;
    }
    container.innerHTML = items.map(function (item) {
      return (
        '<article class="sr-card">' +
          '<div class="sr-card__meta">' +
            '<span class="sr-card__article">' + esc(item.article) + '</span>' +
            '<span class="sr-card__date">' + esc(item.date) + '</span>' +
          '</div>' +
          '<h3 class="sr-card__title">' + hi(item.title, q) + '</h3>' +
          '<p class="sr-card__case">' + hi(item.case, q) + '</p>' +
          '<p class="sr-card__summary">' + hi(item.summary, q) + '</p>' +
          '<details class="sr-card__details">' +
            '<summary class="sr-card__toggle">Читать решение</summary>' +
            '<p class="sr-card__text">' + hi(item.text, q) + '</p>' +
          '</details>' +
        '</article>'
      );
    }).join('');
  }

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function hi(s, q) {
    var out = esc(s);
    q.split(/\s+/).filter(Boolean).forEach(function (t) {
      out = out.replace(
        new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'),
        '<mark>$1</mark>'
      );
    });
    return out;
  }
})();
