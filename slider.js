// Función para inicializar el slider automático
function initAutoSlider() {
  const slider = document.getElementById('logosSlider');
  if (!slider) return;
  
  // Solo activar en móvil
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) return;
  
  const logos = slider.children;
  if (logos.length === 0) return;
  
  // Clonamos el primer logo y lo añadimos al final para efecto infinito
  const firstLogo = logos[0].cloneNode(true);
  slider.appendChild(firstLogo);
  
  let currentIndex = 0;
  const logoWidth = logos[0].offsetWidth + 20; // 20 es el margin (10px izquierda + 10px derecha)
  const totalLogos = logos.length;
  
  // Función para mover el slider
  function moveToNext() {
    currentIndex++;
    
    // Si llegamos al último (que es el clonado), reiniciamos sin transición
    if (currentIndex >= totalLogos - 1) {
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft = 0;
      currentIndex = 0;
      
      // Pequeño retraso para restaurar la transición suave
      setTimeout(() => {
        slider.style.scrollBehavior = 'smooth';
      }, 50);
    } else {
      slider.style.scrollBehavior = 'smooth';
      slider.scrollLeft = currentIndex * logoWidth;
    }
  }
  
  // Iniciar el intervalo (cambia cada 3 segundos)
  const interval = setInterval(moveToNext, 3000);
  
  // Pausar al hacer hover (opcional)
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', () => {
    // Reiniciamos el intervalo después de salir
    setTimeout(() => {
      clearInterval(window.sliderInterval);
      window.sliderInterval = setInterval(moveToNext, 3000);
    }, 100);
  });
  
  // Guardamos el intervalo para poder limpiarlo después
  window.sliderInterval = interval;
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', initAutoSlider);

// Re-inicializar si la ventana cambia de tamaño (de PC a móvil)
window.addEventListener('resize', () => {
  // Limpiamos el intervalo anterior
  if (window.sliderInterval) {
    clearInterval(window.sliderInterval);
  }
  
  // Reiniciamos el slider
  const slider = document.getElementById('logosSlider');
  if (slider) {
    slider.scrollLeft = 0;
  }
  
  // Inicializamos de nuevo
  initAutoSlider();
});