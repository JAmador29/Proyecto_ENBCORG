// carousel.js - Auto-desplazamiento asegurado
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    let autoInterval;
    const AUTO_TIME = 3000; // 3 segundos entre cambios
    
    // Crear puntos indicadores
    if (indicatorsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(dot);
        });
    }
    const indicators = document.querySelectorAll('.indicator');
    
    // Mostrar slide según índice
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Navegación
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;
        showSlide(currentIndex);
        resetAutoSlide(); // Reinicia el contador automático
    }
    
    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }
    
    // Auto-desplazamiento
    function startAutoSlide() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(nextSlide, AUTO_TIME);
        console.log('Auto-desplazamiento ACTIVADO');
    }
    
    function resetAutoSlide() {
        clearInterval(autoInterval);
        startAutoSlide();
    }
    
    // Asignar eventos a botones
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Iniciar carrusel
    showSlide(0);
    startAutoSlide();
    
    // Pausar auto-desplazamiento cuando el mouse está encima (opcional)
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoInterval));
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
});