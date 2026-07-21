/* =============================================
   script.js — Lógica interactiva de MiSitio
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Año actual en el footer ─────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Navbar: scroll + enlace activo ─────── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll () {
    // Fondo translúcido al hacer scroll
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Back-to-top visible
    backToTop.classList.toggle('visible', window.scrollY > 400);

    // Resalta el enlace de navegación de la sección visible
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── Menú hamburguesa (móvil) ────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cierra el menú al hacer clic en un enlace
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });



  /* ─── Typing effect ────────────────────────── */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const phrases = [
      'Diseño & Desarrollo Web',
      'Redes & Infraestructura',
      'QA & Testing Automatizado',
      'DevOps & Cloud Computing',
      'Ingeniera en Software'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 80;

    function typeLoop() {
      const current = phrases[phraseIndex];

      if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        speed = 60 + Math.random() * 40;

        if (charIndex === current.length) {
          isDeleting = true;
          speed = 2000; // pause at end
        }
      } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        speed = 35;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          speed = 400;
        }
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  /* ─── Scroll reveal ────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.service-card, .portfolio-card, .about-grid, .contact-grid, ' +
    '.section-header, .about-stats, .skills-grid, .skill-category, ' +
    '.timeline-item, .edu-card, .cert-card-v2'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── Contadores animados ─────────────────── */
  function animateCounter (el, target, duration = 1800) {
    const start    = performance.now();
    const startVal = 0;

    function step (now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease     = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(startVal + (target - startVal) * ease);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach(el => counterObserver.observe(el));

  /* ─── Filtros del portfolio ─────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.transition = 'opacity 0.3s, transform 0.3s';

        if (match) {
          card.style.opacity    = '1';
          card.style.transform  = 'scale(1)';
          card.style.pointerEvents = 'auto';
          card.classList.remove('hide');
        } else {
          card.style.opacity    = '0';
          card.style.transform  = 'scale(0.95)';
          card.style.pointerEvents = 'none';
          setTimeout(() => {
            if (card.style.opacity === '0') card.classList.add('hide');
          }, 310);
        }
      });
    });
  });

  /* ─── Formulario de contacto (Web3Forms) ──── */
  const form        = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError   = document.getElementById('form-error');
  const btnSend     = document.getElementById('btn-send');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ocultar mensajes previos
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');

    // Validación simple
    let valid = true;
    const fields = form.querySelectorAll('input[required], textarea[required]');

    fields.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
      if (field.type === 'email' && field.value.trim()) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (!emailOk) { field.classList.add('error'); valid = false; }
      }
    });

    if (!valid) {
      // Shake animation en el botón
      btnSend.style.animation = 'none';
      void btnSend.offsetHeight; // reflow
      btnSend.style.animation = 'shake 0.4s ease';
      return;
    }

    // Enviar formulario a Web3Forms
    const originalHTML = btnSend.innerHTML;
    btnSend.innerHTML   = '<span>Enviando…</span>';
    btnSend.disabled    = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('Web3Forms respuesta:', result);

      if (result.success) {
        form.reset();
        formSuccess.classList.remove('hidden');
        setTimeout(() => formSuccess.classList.add('hidden'), 7000);
      } else {
        console.error('Web3Forms error:', result.message);
        formError.classList.remove('hidden');
        setTimeout(() => formError.classList.add('hidden'), 7000);
      }
    } catch (error) {
      console.error('Error de red:', error);
      formError.classList.remove('hidden');
      setTimeout(() => formError.classList.add('hidden'), 7000);
    } finally {
      btnSend.innerHTML = originalHTML;
      btnSend.disabled  = false;
    }
  });

  // Limpia error al escribir
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });

  /* ─── Back to top ────────────────────────── */
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── Animación shake (CSS inyectado) ──────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

  /* ─── Efecto parallax sutil en hero ─────── */
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
      heroContent.style.opacity   = `${1 - scrollY / (window.innerHeight * 0.8)}`;
    }
  }, { passive: true });

});
