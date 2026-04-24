// Инициализация Яндекс.Карт
ymaps.ready(function () {
    var myMap = new ymaps.Map('yandex-map', {
        center: [43.449823, 39.911753], // Координаты ул. Троицкая 15, строение 76
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем метку салона красоты
    var myPlacemark = new ymaps.Placemark([43.449823, 39.911753], {
        balloonContent: '<strong>Салон красоты Алины Шиповской</strong><br>г. Сочи, ул. Троицкая 15, строение 76<br><a href="tel:+79181000466">+7 (918) 100-04-66</a>',
        hintContent: 'Салон красоты Алины Шиповской'
    }, {
        preset: 'islands#redDotIcon',
        iconColor: '#d4a574'
    });

    myMap.geoObjects.add(myPlacemark);
    
    // Отключаем скролл карты колесиком мыши
    myMap.behaviors.disable('scrollZoom');
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к элементам
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Изменение стиля хедера при скролле
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Модальное окно для галереи
document.addEventListener('DOMContentLoaded', () => {
    // Создаём модальное окно один раз
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.modal-close');

    // Открытие по клику/тапу на gallery-item
    document.querySelectorAll('.gallery-item').forEach(item => {
        // Поддержка и клика и тача
        const openModal = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const img = item.querySelector('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        };
        
        item.addEventListener('click', openModal);
        item.addEventListener('touchend', openModal);
    });

    // Закрытие по кнопке
    const closeModalBtn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    };
    
    closeBtn.addEventListener('click', closeModalBtn);
    closeBtn.addEventListener('touchend', closeModalBtn);

    // Закрытие по клику/тапу на фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    modal.addEventListener('touchend', (e) => {
        if (e.target === modal) closeModal();
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
});
