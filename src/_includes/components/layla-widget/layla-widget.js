document.addEventListener('DOMContentLoaded', () => {
    // Элементы управления
    const trigger = document.getElementById('laylaTrigger');
    const windowEl = document.getElementById('laylaWindow');
    const closeBtn = document.getElementById('laylaClose');
    const input = document.getElementById('laylaIn');
    const sendBtn = document.getElementById('laylaSend');
    const msgs = document.getElementById('laylaMsgs');

    let laylaDB = null;

    // 1. Загрузка базы знаний (путь соответствует passthrough в .eleventy.js)
    fetch('/data/layla-db.json')
        .then(response => {
            if (!response.ok) throw new Error("Database not found");
            return response.json();
        })
        .then(data => {
            laylaDB = data.responses;
            console.log("LAYLA AI: System Online");
        })
        .catch(err => {
            console.error("LAYLA AI: Database error", err);
        });

    // 2. Функции открытия/закрытия
    const toggleWindow = (e) => {
        if (e) e.stopPropagation();
        const isActive = windowEl.classList.toggle('active');
        if (isActive) {
            setTimeout(() => input.focus(), 100); // Фокус на ввод при открытии
        }
    };

    const closeWindow = () => {
        windowEl.classList.remove('active');
    };

    // 3. Обработчики кликов
    trigger?.addEventListener('click', toggleWindow);
    
    closeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWindow();
    });

    // Закрытие при клике вне окна
    document.addEventListener('click', (e) => {
        if (windowEl.classList.contains('active') && 
            !windowEl.contains(e.target) && 
            !trigger.contains(e.target)) {
            closeWindow();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeWindow();
    });

    // 4. Логика отправки сообщений
    function handleSend() {
        const val = input.value.trim();
        if (!val) return;

        // Сообщение пользователя
        addMsg(val, 'user');
        input.value = '';

        // Имитация "раздумий" ИИ
        setTimeout(() => {
            let reply = "Анализирую ваш запрос... В открытых базах данных совпадений не найдено. Рекомендуется ручная проверка специалистом.";
            
            if (laylaDB) {
                const query = val.toLowerCase();
                // Поиск по ключам в базе данных
                for (const key in laylaDB) {
                    const match = laylaDB[key].keys.some(k => query.includes(k.toLowerCase()));
                    if (match) {
                        reply = laylaDB[key].text;
                        break;
                    }
                }
            }
            addMsg(reply, 'ai');
        }, 600);
    }

    function addMsg(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${type}`;
        msgDiv.textContent = text;
        msgs.appendChild(msgDiv);
        
        // Автопрокрутка вниз
        msgs.scrollTop = msgs.scrollHeight;
    }

    // События отправки
    sendBtn?.addEventListener('click', handleSend);
    
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});