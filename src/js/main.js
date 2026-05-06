document.addEventListener('DOMContentLoaded', () => {

  // ── МОБИЛЬНОЕ МЕНЮ ────────────────────────────────────────────────────────

  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ── АККОРДЕОНЫ НАВИГАЦИИ ───────────────────────────────────────────────────

  document.querySelectorAll('.expander').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const group = btn.closest('.nav-group');
      const panel = group?.querySelector('.dropdown-panel');
      if (!panel) return;

      const isActive = panel.classList.toggle('is-active');
      btn.style.transform = isActive ? 'rotate(180deg)' : '';
    });
  });

  // ── ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ССЫЛКУ ─────────────────────────────────────

  document.querySelectorAll('.drop-item, .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1150 && nav && toggle) {
        nav.classList.remove('is-open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ── СВЯЗЬ КНОПКИ В ФУТЕРЕ С ВИДЖЕТОМ LAYLA ────────────────────────────────

  const footerTrigger = document.getElementById('laylaTriggerFooter');
  const laylaPanel    = document.getElementById('laylaWindow');

  if (footerTrigger && laylaPanel) {
    footerTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      laylaPanel.classList.add('active');
      laylaPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      document.getElementById('laylaIn')?.focus();
    });
  }

});
