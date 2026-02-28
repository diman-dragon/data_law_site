document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const expanders = document.querySelectorAll('.expander');

    // Мобильное меню: открыть/закрыть
    if (toggle && nav) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = nav.classList.toggle('is-open');
            toggle.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // Аккордеоны для мобильной версии (клик по стрелке)
    expanders.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Важно, чтобы не срабатывал переход по ссылке родителя
            const group = btn.closest('.nav-group');
            const panel = group.querySelector('.dropdown-panel');
            if (panel) {
                const isActive = panel.classList.toggle('is-active');
                btn.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });

    // Авто-закрытие меню при клике на любую ссылку
    const links = document.querySelectorAll('.drop-item, .nav-link, .cta-button, .text-logo');
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav?.classList.remove('is-open');
            toggle?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});