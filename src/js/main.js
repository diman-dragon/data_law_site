document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  // 1. Бургер
  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('active');
      
      // Блокируем скролл страницы
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // 2. Аккордеоны (выпадашки) на мобилке
  const expanders = document.querySelectorAll('.expander');
  expanders.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const group = btn.closest('.nav-group');
      const panel = group.querySelector('.dropdown-panel');
      
      if (panel) {
        const isActive = panel.classList.toggle('is-active');
        // Поворот иконки
        btn.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0)';
      }
    });
  });

  // 3. Закрытие меню при клике на ссылку
  const links = document.querySelectorAll('.drop-item, .nav-link:not(.expander)');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1150) {
        nav.classList.remove('is-open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});