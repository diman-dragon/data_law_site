(function () {
  'use strict';

  var btnSearch = document.getElementById('btn-search');
  var qGlobal = document.getElementById('q-global');
  var fJurisdiction = document.getElementById('f-jurisdiction');
  var fType = document.getElementById('f-type');
  var resultsContainer = document.getElementById('results-area');
  var aiContent = document.getElementById('ai-content');

  if (!btnSearch || !resultsContainer) return;

  var dataUrl = '/data/echr_decisions.json';
  var db = [];

  fetch(dataUrl)
    .then(function (r) { return r.json(); })
    .then(function (json) {
      db = Array.isArray(json) ? json : [];
      qGlobal.placeholder = 'Суть запроса...';
    });

  btnSearch.addEventListener('click', function () {
    var q = qGlobal.value.toLowerCase();
    var jur = fJurisdiction.value;
    var type = fType.value;

    var filtered = db.filter(function(item) {
      var matchQ = !q || (item.title && item.title.toLowerCase().includes(q)) || (item.text && item.text.toLowerCase().includes(q));
      var matchJur = !jur || (item.jurisdiction && item.jurisdiction === jur);
      var matchType = !type || (item.type && item.type === type);
      return matchQ && matchJur && matchType;
    });

    render(filtered, q);
    updateAI(filtered);
  });

  function updateAI(items) {
    if (!aiContent) return;
    aiContent.innerHTML = items.length > 0 
      ? 'Лайла нашла ' + items.length + ' релевантных кейсов. Анализирую: ' + items.slice(0, 3).map(function(i){ return i.title; }).join(', ')
      : 'Лайла: Ничего не найдено, попробуйте изменить параметры.';
  }

  function render(items, q) {
    if (items.length === 0) {
      resultsContainer.innerHTML = '<p>Ничего не найдено.</p>';
      return;
    }
    resultsContainer.innerHTML = items.map(function(item) {
      return (
        '<div class="result-card" style="border: 1px solid var(--c-border); padding: 16px;">' +
          '<h3>' + item.title + '</h3>' +
          '<p><strong>Дело:</strong> ' + item.case + '</p>' +
          '<p>' + (item.summary || '').substring(0, 100) + '...</p>' +
        '</div>'
      );
    }).join('');
  }
})();
