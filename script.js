/* ScribeGulf — Site JavaScript */

/* Mobile nav */
const hamburger = document.querySelector('.nav__hamburger');
const mobileNav = document.querySelector('.nav__mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = !mobileNav.classList.contains('open');
    hamburger.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav__mobile .nav__link').forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Active nav link */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link[data-page]').forEach(l => {
  if (l.dataset.page === page) l.classList.add('active');
});

/* FAQ accordion */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* Scroll reveal */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* Counter animation */
function runCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { runCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* Process track animation */
const track = document.querySelector('.steps-track');
if (track) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) track.classList.add('animated');
  }, { threshold: 0.4 }).observe(track);
}

/* Smooth nav shadow on scroll */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 28px rgba(0,0,0,0.22)'
      : '0 2px 24px rgba(0,0,0,0.18)';
  }, { passive: true });
}

/* Form submission — opens WhatsApp to ScribeGulf (+1-236-869-6643) */
const SCRIBEGULF_WHATSAPP_DIGITS = '12368696643';
const form = document.querySelector('#brief-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value?.trim() || '';
    const wa = form.querySelector('[name="whatsapp"]')?.value?.trim() || '';
    const uni = form.querySelector('[name="university"]')?.value?.trim() || '';
    const subj = form.querySelector('[name="subject"]')?.value?.trim() || '';
    const type = form.querySelector('[name="type"]')?.value?.trim() || '';
    const wc = form.querySelector('[name="wordcount"]')?.value?.trim() || '';
    const dl = form.querySelector('[name="deadline"]')?.value?.trim() || '';
    const brief = form.querySelector('[name="brief"]')?.value?.trim() || '';
    const extra = form.querySelector('[name="extra"]')?.value?.trim() || '';
    const parts = [
      'Hi ScribeGulf — new brief via the website form.',
      '',
      `Name: ${name}`,
      `My WhatsApp: ${wa}`,
      `University / programme: ${uni}`,
      `Subject: ${subj}`,
      `Assignment type: ${type}`,
      `Word count or pages: ${wc}`,
      `Deadline: ${dl}`,
      '',
      'Brief and rubric:',
      brief,
    ];
    if (extra) {
      parts.push('', 'Anything else:', extra);
    }
    const msg = parts.join('\n');
    window.open(`https://wa.me/${SCRIBEGULF_WHATSAPP_DIGITS}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}
