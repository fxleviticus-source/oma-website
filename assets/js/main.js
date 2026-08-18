/* ORBIT MEDIA AGENCY — shared interaction layer */
(function(){
  "use strict";
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Logo intro ---------------- */
  function initIntro(){
    const intro = document.querySelector('.intro');
    if(!intro) return;

    const done = sessionStorage.getItem('oma-intro-seen');
    if(done || reduced){
      intro.remove();
      document.body.classList.remove('lock-scroll');
      return;
    }

    document.body.classList.add('lock-scroll');
    const stage = intro.querySelector('.intro-stage');

    // build rings with orbiting seed dots
    const ringDefs = [
      {size:340, dur:14, dir:1},
      {size:260, dur:10, dir:-1},
      {size:190, dur:7,  dir:1}
    ];
    ringDefs.forEach((r,i)=>{
      const ring = document.createElement('div');
      ring.className = 'intro-ring';
      ring.style.width = r.size+'px';
      ring.style.height = r.size+'px';
      ring.style.marginTop = -(r.size/2)+'px';
      ring.style.marginLeft = -(r.size/2)+'px';
      const seed = document.createElement('div');
      seed.className = 'seed';
      seed.style.animation = `spin ${r.dur}s linear infinite ${r.dir<0?'reverse':''}`;
      seed.style.transformOrigin = (r.size/2)+'px center';
      ring.appendChild(seed);
      stage.appendChild(ring);
    });

    const glow = intro.querySelector('.intro-glow');
    const rings = intro.querySelectorAll('.intro-ring');
    const logo = intro.querySelector('.intro-logo');
    const word = intro.querySelector('.intro-word');
    const skip = intro.querySelector('.intro-skip');

    const finish = ()=>{
      intro.classList.add('hide');
      sessionStorage.setItem('oma-intro-seen','1');
      document.body.classList.remove('lock-scroll');
      setTimeout(()=> intro.remove(), 900);
    };

    // sequence
    requestAnimationFrame(()=>{
      glow.style.transition = 'opacity 1.2s ease';
      glow.style.opacity = '1';
    });
    setTimeout(()=>{
      rings.forEach((r,i)=>{
        r.style.transition = `opacity .8s ease ${i*0.12}s`;
        r.style.opacity = '1';
      });
    }, 150);
    setTimeout(()=>{
      logo.style.transition = 'opacity 1s cubic-bezier(.16,.84,.44,1), transform 1s cubic-bezier(.16,.84,.44,1)';
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1)';
    }, 550);
    setTimeout(()=>{
      word.style.transition = 'opacity .8s ease, letter-spacing .8s ease';
      word.style.opacity = '1';
    }, 950);
    setTimeout(()=>{
      skip.style.transition = 'opacity .5s ease';
      skip.style.opacity = '1';
    }, 700);

    const autoTimer = setTimeout(finish, 3400);

    skip.addEventListener('click', ()=>{ clearTimeout(autoTimer); finish(); });
    window.addEventListener('keydown', function esc(e){
      if(e.key === 'Escape' || e.key === 'Enter'){ clearTimeout(autoTimer); finish(); window.removeEventListener('keydown', esc); }
    });
  }

  /* ---------------- Nav scroll state ---------------- */
  function initNavScroll(){
    const nav = document.querySelector('.nav');
    if(!nav) return;
    const onScroll = ()=>{
      if(window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---------------- Mobile menu ---------------- */
  function initMobileMenu(){
    const burger = document.querySelector('.nav-burger');
    const panel = document.querySelector('.mobile-panel');
    if(!burger || !panel) return;
    const toggle = ()=>{
      burger.classList.toggle('open');
      panel.classList.toggle('open');
      document.body.classList.toggle('lock-scroll');
    };
    burger.addEventListener('click', toggle);
    panel.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      burger.classList.remove('open'); panel.classList.remove('open'); document.body.classList.remove('lock-scroll');
    }));

    // mobile submenu accordion
    panel.querySelectorAll('.mobile-toggle').forEach(t=>{
      t.addEventListener('click', (e)=>{
        e.preventDefault();
        const sub = t.parentElement.querySelector('.mobile-sub');
        sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
        t.classList.toggle('open');
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveals(){
    const items = document.querySelectorAll('[data-reveal], [data-stagger]');
    if(!items.length) return;
    if(reduced){ items.forEach(i=> i.classList.add('in')); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    items.forEach(i=> io.observe(i));
  }

  /* ---------------- Back to top ---------------- */
  function initBackTop(){
    const btn = document.querySelector('.back-top');
    if(!btn) return;
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 700) btn.classList.add('show'); else btn.classList.remove('show');
    }, {passive:true});
    btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior: reduced ? 'auto' : 'smooth'}));
  }

  /* ---------------- Contact form ---------------- */
  function initForm(){
    const form = document.querySelector('#project-form');
    if(!form) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(()=>{
        form.style.transition = 'opacity .4s ease';
        form.style.opacity = '0';
        setTimeout(()=>{
          form.style.display = 'none';
          document.querySelector('#form-success').style.display = 'block';
          requestAnimationFrame(()=> document.querySelector('#form-success').style.opacity = '1');
        }, 400);
      }, 900);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initIntro();
    initNavScroll();
    initMobileMenu();
    initReveals();
    initBackTop();
    initForm();
  });
})();
