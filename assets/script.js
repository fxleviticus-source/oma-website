// ============================================================
// ORBIT MEDIA AGENCY — site interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Intro loader (home page only) ---------- */
  const loader = document.querySelector('.loader');
  if (loader) {
    const finish = () => {
      loader.classList.add('hide');
      document.body.style.overflow = '';
      setTimeout(() => loader.remove(), 800);
    };
    if (sessionStorage.getItem('oma-intro-seen')) {
      loader.remove();
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
      window.addEventListener('load', () => {
        setTimeout(() => {
          finish();
          sessionStorage.setItem('oma-intro-seen', '1');
        }, 1900);
      });
      // safety fallback in case load event is delayed
      setTimeout(() => {
        if (!loader.classList.contains('hide')) {
          finish();
          sessionStorage.setItem('oma-intro-seen', '1');
        }
      }, 3200);
    }
  }

  /* ---------- Sticky nav on scroll ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Portfolio filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length && workCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        workCards.forEach(card => {
          const match = cat === 'all' || card.dataset.category === cat;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Contact form (static demo submit) ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.style.opacity = '0.7';
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.style.opacity = '1'; }, 2600);
    });
  }

});
