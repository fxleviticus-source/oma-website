// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const navCta = document.querySelector('.nav-cta');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navLinks.classList.toggle('mobile-open', isOpen);
  navCta.classList.toggle('mobile-open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is tapped
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('mobile-open');
    navCta.classList.remove('mobile-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback: reveal everything immediately
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ===== Nav background on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10 ? '0 8px 24px -12px rgba(0,0,0,0.5)' : 'none';
});
