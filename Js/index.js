// index.js - Carrusel principal y utilidades generales

document.addEventListener('DOMContentLoaded', function() {
    // ========== CARRUSEL PRINCIPAL (HERO) ==========
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    // Solo ejecutar si existe al menos un slide
    if (slides.length > 0) {
        let currentIndex = 0;
        let autoInterval = null;
        const AUTO_TIME = 5000; // 5 segundos (ajústalo a tu gusto)

        // --- Crear indicadores dinámicamente ---
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = ''; // Limpiar por si se ejecuta dos veces
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('indicator');
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', () => goToSlide(i));
                indicatorsContainer.appendChild(dot);
            });
        }

        // Actualizar indicadores (si existen)
        function updateIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }

        // Mostrar slide activo
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            if (indicatorsContainer) updateIndicators();
        }

        // Navegación programática
        function goToSlide(index) {
            if (slides.length === 0) return;
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentIndex = index;
            showSlide(currentIndex);
            resetAutoSlide();
        }

        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }

        // --- Auto-desplazamiento ---
        function startAutoSlide() {
            if (autoInterval) clearInterval(autoInterval);
            // No iniciar auto si solo hay una imagen
            if (slides.length <= 1) return;
            autoInterval = setInterval(() => {
                nextSlide();
            }, AUTO_TIME);
        }

        function stopAutoSlide() {
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
            }
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // --- Eventos de botones ---
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // --- Pausa al hover ---
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        // --- Inicialización ---
        showSlide(0);
        startAutoSlide();

        // Limpiar intervalo si la página se oculta (opcional, mejora rendimiento)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });
    }

    // ========== CARRUSEL DE TARJETAS (opcional) ==========
    // Si existe un contenedor con clase 'carrusel-wrapper', lo inicializa
    const carruselWrapper = document.querySelector('.carrusel-wrapper');
    if (carruselWrapper) {
        const track = carruselWrapper.querySelector('.carrusel-track');
        const cards = track ? Array.from(track.children) : [];
        const prevCarrusel = carruselWrapper.querySelector('.carousel-btn.prev');
        const nextCarrusel = carruselWrapper.querySelector('.carousel-btn.next');
        const dotsContainer = carruselWrapper.querySelector('.carrusel-dots');

        if (track && cards.length > 0) {
            let currentCardIndex = 0;
            let cardsPerView = 1;
            let totalDots = 0;

            // Calcular cuántas tarjetas se ven según el ancho (responsive)
            function updateCardsPerView() {
                const width = window.innerWidth;
                if (width >= 1024) cardsPerView = 3;
                else if (width >= 768) cardsPerView = 2;
                else cardsPerView = 1;
                totalDots = Math.ceil(cards.length / cardsPerView);
                if (currentCardIndex >= totalDots) currentCardIndex = totalDots - 1;
                if (currentCardIndex < 0) currentCardIndex = 0;
                updateCarrusel();
                createDots();
            }

            function updateCarrusel() {
                const desplazamiento = -(currentCardIndex * 100) / totalDots;
                track.style.transform = `translateX(${desplazamiento}%)`;
            }

            function goToCardSet(index) {
                if (index < 0) index = 0;
                if (index >= totalDots) index = totalDots - 1;
                currentCardIndex = index;
                updateCarrusel();
                updateDotsActive();
            }

            function nextCardSet() { goToCardSet(currentCardIndex + 1); }
            function prevCardSet() { goToCardSet(currentCardIndex - 1); }

            function createDots() {
                if (!dotsContainer) return;
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalDots; i++) {
                    const dot = document.createElement('button');
                    dot.classList.add('carrusel-dot');
                    if (i === currentCardIndex) dot.classList.add('activo');
                    dot.addEventListener('click', () => goToCardSet(i));
                    dotsContainer.appendChild(dot);
                }
            }

            function updateDotsActive() {
                if (!dotsContainer) return;
                const dots = dotsContainer.querySelectorAll('.carrusel-dot');
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('activo', idx === currentCardIndex);
                });
            }

            if (prevCarrusel) prevCarrusel.addEventListener('click', prevCardSet);
            if (nextCarrusel) nextCarrusel.addEventListener('click', nextCardSet);
            window.addEventListener('resize', () => {
                updateCardsPerView();
                updateCarrusel();
            });
            updateCardsPerView();
        }
    }

    // ========== OTRAS INTERACCIONES GLOBALES ==========
    // Ejemplo: dropdowns en dispositivos táctiles (si se desea)
    // Por ahora solo asegura que los menús hover funcionen en desktop
    // Para móviles, se puede añadir un toggle con JS si el CSS no es suficiente
    // Pero el CSS ya maneja bien el hover en móviles (aunque sea menos intuitivo)
    // Si quieres que al tocar se abra/cierre, descomenta el siguiente código:

    
    const dropdownParents = document.querySelectorAll('.has-dropdown');
    dropdownParents.forEach(parent => {
        const link = parent.querySelector('a');
        const dropdown = parent.querySelector('.dropdown');
        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 720) {
                    e.preventDefault();
                    const isOpen = dropdown.style.display === 'block';
                    dropdown.style.display = isOpen ? 'none' : 'block';
                }
            });
        }
    });
});