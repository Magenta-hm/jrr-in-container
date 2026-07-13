document.addEventListener('DOMContentLoaded', () => {

    // Скрипт 1: Кнопка "Вверх"
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            // Заменили pageYOffset на современный scrollY для стабильности на смартфонах
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Скрипт 2: переключение табов
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content-item');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(content => content.style.display = 'none');
            if (contents[index]) contents[index].style.display = 'block';
        });
    });

    // Скрипт 3: --- КОД ДЛЯ МОБИЛЬНЫХ (Авто-карусель в путешествиях) ---
    const containerMob = document.getElementById('spreadIndex');

    if (window.innerWidth <= 768 && containerMob) {
        let scrollAmount = 0;
        
        setInterval(() => {
            const step = containerMob.clientWidth; 
            const maxScroll = containerMob.scrollWidth - containerMob.clientWidth;

            if (scrollAmount >= maxScroll - 10) { 
                scrollAmount = 0; 
            } else {
                scrollAmount += step;
            }
            
            containerMob.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 3500);
    }

        // Скрипт 4: Меню-гамбургер в мобильной версии (Обновленный)
    const header = document.querySelector('.main-header');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    // Хитрый перенос ссылок для идеального единого списка на мобилках
    const navLeftList = document.querySelector('.nav-left');
    const navRightItems = document.querySelectorAll('.nav-right li:not(:last-child)'); // Все, кроме кнопки темы

    if (toggle && header) {
        toggle.addEventListener('click', () => {
            header.classList.toggle('mobile-open');
            
            // Если меню открывается и мы на мобилке — временно переносим пункты в левое меню
            if (header.classList.contains('mobile-open') && window.innerWidth <= 768) {
                navRightItems.forEach(item => navLeftList.appendChild(item));
            }
        });
    }


    // Скрипт 5: Аккордеоны в блоке Контакты (оставили этот финальный вариант)
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // При открытии одного — остальные автоматически закрываются
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Переключаем класс active у текущего элемента
            item.classList.toggle('active');
        });
    });
});


// Скрипт 6: --- КОД ДЛЯ ДЕСКТОПА (Разлетающиеся фото в путешествиях) ---
// Вынесли за пределы DOMContentLoaded, чтобы анимация скролла не тормозила
window.addEventListener('scroll', () => {
    // Если это мобилка — выходим, чтобы не ломать авто-карусель
    if (window.innerWidth <= 768) return; 

    const container = document.getElementById('spreadIndex');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Проверяем, виден ли блок на экране
    if (rect.top < windowHeight && rect.bottom > 0) {
        // Вычисляем прогресс прокрутки блока (от 0 до 1)
        const scrollFactor = Math.max(0, (windowHeight - rect.top) / windowHeight);
        
        // Оставили вашу идеальную силу разлета в 550px
        const distance = scrollFactor * 550; 

        const leftPhoto = container.querySelector('.left-wing');
        const rightPhoto = container.querySelector('.right-wing');

        if (leftPhoto) leftPhoto.style.transform = `translateX(-${distance}px)`;
        if (rightPhoto) rightPhoto.style.transform = `translateX(${distance}px)`;
    }
});

// Скрипт 7: Переключатель темы (Вариант только с иконкой)
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        if (themeIcon) themeIcon.innerText = '🌙'; // Луна для светлой темы
    } else {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.innerText = '☀️'; // Солнце для темной темы
    }
}

