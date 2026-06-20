/* ============================================
   PÂTISSERIE DÉMO — script.js
   ============================================ */

const WA_NUMBER = '2290198554017';

/* ---- Commander via WhatsApp ---- */
function commander(produit) {
  const message = encodeURIComponent(
    `Bonjour 👋, je souhaite commander : *${produit}*.\nPourriez-vous me donner plus d'informations sur la disponibilité et les délais ? Merci !`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

/* ---- Header : scroll shadow ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Menu burger (mobile) ---- */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

/* Fermer le menu en cliquant sur un lien */
document.querySelectorAll('.header__nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

/* ---- Apparition au scroll (Intersection Observer) ---- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll('.product-card, .why__card, .testimonial-card')
  .forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

/* ---- CSS pour l'animation fade-in (injecté par JS) ---- */
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .5s ease, transform .5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
