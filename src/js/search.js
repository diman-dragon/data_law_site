document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  let data = [];

  fetch('./data/echr_decisions.json')
    .then(response => response.json())
    .then(json => { data = json; });

  const render = (items) => {
    resultsContainer.innerHTML = items.map(item => `
      <div class="result-card">
        <h3>${item.title}</h3>
        <p><strong>Дело:</strong> ${item.case} (${item.date})</p>
        <p><strong>Статья:</strong> ${item.article}</p>
        <p>${item.summary}</p>
        <button onclick="alert('${item.text.replace(/'/g, "\\'")}')">Читать решение</button>
      </div>
    `).join('');
  };

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = data.filter(i => 
      i.title.toLowerCase().includes(q) || 
      i.case.toLowerCase().includes(q) ||
      i.text.toLowerCase().includes(q)
    );
    render(filtered);
  });
});
