// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky nav border
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 8) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-in'));
}
setTimeout(() => reveals.forEach(el => el.classList.add('is-in')), 2500);

// =============== MODAL ===============
const body = document.body;
let lastFocused = null;

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  lastFocused = document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');
  const closeBtn = modal.querySelector('.modal__close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
};

const closeModal = (modal) => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal.is-open')) body.classList.remove('no-scroll');
  if (lastFocused) lastFocused.focus();
};

document.querySelectorAll('[data-open]').forEach(el => {
  el.addEventListener('click', (ev) => {
    ev.preventDefault();
    openModal(el.dataset.open);
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => closeModal(modal));
  });
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    const open = document.querySelector('.modal.is-open');
    if (open) closeModal(open);
  }
});

// Smooth anchor with sticky offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (ev) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    ev.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});
