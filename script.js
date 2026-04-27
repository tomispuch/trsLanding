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

// Accordion
function toggleAcc(trigger) {
  const item = trigger.closest('.acc-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.acc-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

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
