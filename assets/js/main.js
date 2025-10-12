// main.js — базовый функционал для Data Law

document.addEventListener('DOMContentLoaded', function () {

  // Плавная прокрутка к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Добавьте сюда обработку форм, если понадобится
  // Например: отправка запроса на помощь через fetch()

  // Пример: предотвращение отправки формы (пока нет бэкенда)
  const helpForms = document.querySelectorAll('.help-form');
  helpForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Спасибо! Ваш запрос принят. Мы свяжемся с вами в ближайшее время.');
      // В будущем: отправка на сервер или email
    });
  });

});