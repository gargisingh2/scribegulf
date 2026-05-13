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

/* Form submission — logs to Google Sheet via Apps Script and notifies by email */
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxYBVCHBh0lWcjZYGNRy73Sca7k4t4x_t0A1c8WKjDPI3fOu4IWdv4vkakK6j469Zt0mw/exec';

const form = document.querySelector('#brief-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Honeypot — bots fill this hidden field; humans don't
    const honey = form.querySelector('[name="website"]');
    if (honey && honey.value) return;

    // Basic native validation (we set novalidate, so check manually)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('.form__submit');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    const val = n => form.querySelector(`[name="${n}"]`)?.value?.trim() || '';
    const payload = new URLSearchParams({
      name: val('name'),
      whatsapp: val('whatsapp'),
      university: val('university'),
      subject: val('subject'),
      type: val('type'),
      wordcount: val('wordcount'),
      deadline: val('deadline'),
      brief: val('brief'),
      extra: val('extra'),
      ua: navigator.userAgent,
      ref: document.referrer
    });

    try {
      await fetch(FORM_ENDPOINT, { method: 'POST', body: payload });
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
      alert("Sorry — we couldn't submit your brief right now. Please try again, or message us on WhatsApp at +1-236-869-6643.");
      return;
    }

    // In-page confirmation
    const success = document.createElement('div');
    success.className = 'form__success';
    success.setAttribute('role', 'status');
    success.innerHTML =
      '<strong>Thanks — your brief has been received.</strong>' +
      "<p>We'll review it and reply with fit and pricing within a few hours during working hours " +
      '(Sunday–Thursday, 9 am–8 pm UAE time). Outside those hours we reply the next morning.</p>';
    form.parentNode.insertBefore(success, form);
    form.style.display = 'none';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
