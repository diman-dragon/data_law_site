console.log('Search script initialized');
(function() {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  let data = [];
  
  // Use absolute path relative to the root for better reliability with pathPrefix
  const dataPath = '/data/echr_decisions.json';

  console.log('Fetching data from:', dataPath);
  fetch(dataPath)
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error('Network response error');
      return response.json();
    })
    .then(json => { 
      data = json; 
      console.log('Data loaded:', data); 
    })
    .catch(err => console.error('Fetch error:', err));

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      console.log('Searching for:', q);
      if (!q) { 
        resultsContainer.innerHTML = ''; 
        return; 
      }
      const filtered = data.filter(i => 
        (i.title && i.title.toLowerCase().includes(q)) || 
        (i.case && i.case.toLowerCase().includes(q)) ||
        (i.text && i.text.toLowerCase().includes(q))
      );
      render(filtered);
    });
  } else {
    console.error('Search input not found!');
  }

  function render(items) {
    if (items.length === 0) {
      resultsContainer.innerHTML = '<p>Ничего не найдено.</p>';
      return;
    }
    resultsContainer.innerHTML = items.map(item => `
      <div class="result-card" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
        <h3>${item.title}</h3>
        <p><strong>Дело:</strong> ${item.case} (${item.date})</p>
        <p><strong>Статья:</strong> ${item.article}</p>
        <p>${item.summary}</p>
        <button onclick="alert('${item.text.replace(/'/g, "\\'")}')">Читать решение</button>
      </div>
    `).join('');
  }
})();

