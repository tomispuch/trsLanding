// Navbar scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile menu
const ham = document.getElementById('ham');
const mobMenu = document.getElementById('mobMenu');
const mobClose = document.getElementById('mobClose');
const mobLinks = document.querySelectorAll('.mob-link');

ham.addEventListener('click', () => {
  mobMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

const closeMenu = () => {
  mobMenu.classList.remove('open');
  document.body.style.overflow = '';
};

mobClose.addEventListener('click', closeMenu);
mobLinks.forEach(l => l.addEventListener('click', closeMenu));

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Generic carousel — handles every .sp-carousel on the page
function initCarousel(el) {
  const track = el.querySelector('.sp-track');
  if (!track) return;
  const slides = track.querySelectorAll('.sp-slide');
  const dots   = el.querySelectorAll('.sp-dot');
  const prev   = el.querySelector('.sp-prev');
  const next   = el.querySelector('.sp-next');
  const numEl  = el.querySelector('.sp-current-num');
  const total  = slides.length;
  let idx = 0;

  const go = (i) => {
    idx = (i + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, k)   => d.classList.toggle('active', k === idx));
    slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
    if (numEl) numEl.textContent = String(idx + 1).padStart(2, '0');
  };

  if (prev) prev.addEventListener('click', () => go(idx - 1));
  if (next) next.addEventListener('click', () => go(idx + 1));
  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) go(idx + (diff < 0 ? 1 : -1));
  });

  slides[0].classList.add('is-active');
}

document.querySelectorAll('.sp-carousel').forEach(initCarousel);

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const btn = this.querySelector('.form-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch(window.TRS_CONFIG.formspreeUrl, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      this.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      btn.textContent = 'Hubo un error, intentá de nuevo';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Hubo un error, intentá de nuevo';
    btn.disabled = false;
  }
});
