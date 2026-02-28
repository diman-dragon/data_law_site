document.addEventListener('DOMContentLoaded', () => {
    // Элементы управления
    const trigger = document.getElementById('laylaTrigger');
    const windowEl = document.getElementById('laylaWindow');
    const closeBtn = document.getElementById('laylaClose');
    const input = document.getElementById('laylaIn');
    const sendBtn = document.getElementById('laylaSend');
    const msgs = document.getElementById('laylaMsgs');

    let laylaDB = null;

    // 1. Загрузка базы знаний (путь берём из data-атрибута — работает с любым pathPrefix)
    const dbPath = windowEl?.dataset.db || '/data/layla-db.json';
    fetch(dbPath)
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
            setTimeout(() => input.focus(), 100);
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

    document.addEventListener('click', (e) => {
        if (windowEl.classList.contains('active') && 
            !windowEl.contains(e.target) && 
            !trigger.contains(e.target)) {
            closeWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeWindow();
    });

    // 4. Логика отправки сообщений
    function handleSend() {
        const val = input.value.trim();
        if (!val) return;

        addMsg(val, 'user');
        input.value = '';

        setTimeout(() => {
            let reply = "Анализирую ваш запрос... В открытых базах данных совпадений не найдено. Рекомендуется ручная проверка специалистом.";
            
            if (laylaDB) {
                const query = val.toLowerCase();
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
        msgs.scrollTop = msgs.scrollHeight;
    }

    sendBtn?.addEventListener('click', handleSend);
    
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});