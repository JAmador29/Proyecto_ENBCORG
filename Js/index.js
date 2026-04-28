// Menú responsive: dropdown al clic en móvil
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 720) {
            e.preventDefault();
            const parent = link.parentElement;
            parent.classList.toggle('open');
        }
    });
});

// Carrusel
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let intervalId = null;
    const autoplayDelay = 5000;

    function createIndicators() {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(dot);
        });
    }

    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentIndex = index;
        updateIndicators();
        resetAutoplay();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoplay() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, autoplayDelay);
    }

    function resetAutoplay() {
        if (intervalId) clearInterval(intervalId);
        startAutoplay();
    }

    function pauseAutoplay() { if (intervalId) clearInterval(intervalId); }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', pauseAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    createIndicators();
    startAutoplay();

    // Soporte táctil básico
    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    container.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) diff > 0 ? prevSlide() : nextSlide();
    });
});