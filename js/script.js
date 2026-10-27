document.addEventListener('DOMContentLoaded', () => {
  /* ===== Menú móvil ===== */
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  menuBtn.addEventListener('click', () => menu.classList.toggle('open'));

  /* ===== Dropdowns (Investigación, Proyecto, Contacto) =====
     Escritorio: el submenú se abre al pasar el mouse (hover, vía CSS) y el
     botón principal SÍ navega normalmente a su sección al hacer clic.
     Móvil/táctil (sin hover): el clic en el botón principal abre/cierra
     el submenú en vez de navegar, porque no hay forma de "pasar el mouse". */
  const dropdownItems = document.querySelectorAll('nav li.has-dropdown');
  const isMobile = () => window.matchMedia('(max-width:820px)').matches;

  function closeAllDropdowns(except) {
    dropdownItems.forEach(li => { if (li !== except) li.classList.remove('open'); });
  }

  dropdownItems.forEach(li => {
    const trigger = li.querySelector('a.btn-nav');
    trigger.addEventListener('click', (e) => {
      if (!isMobile()) return; // en escritorio deja que el enlace navegue normal
      e.preventDefault();
      e.stopPropagation();
      const isOpen = li.classList.contains('open');
      closeAllDropdowns(li);
      li.classList.toggle('open', !isOpen);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav li.has-dropdown')) closeAllDropdowns(null);
  });

  // Cerrar menú y dropdown al elegir un enlace
  document.querySelectorAll('#menu a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      closeAllDropdowns(null);
    });
  });

  /* ===== Reveal on scroll ===== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ===== Formulario de contacto ===== */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Listo! Recibimos tu mensaje. Pronto te escribimos. ✊');
      e.target.reset();
    });
  }

  /* ===== Galería + Lightbox ===== */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
  }

  function updateLightboxImage() {
    const img = galleryItems[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  galleryItems.forEach((img, index) => {
    img.closest('.gallery-item').addEventListener('click', () => openLightbox(index));
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
  });
  document.getElementById('lightboxNext').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxImage();
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
  });
});
