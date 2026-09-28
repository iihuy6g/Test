document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06 });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('in'));
  }
  const toggle = document.querySelector('[data-lo-menu]');
  const menu = document.querySelector('[data-lo-nav]');
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  const country = document.querySelector('[data-lo-country]');
  country?.addEventListener('change', () => {
    const url = country.value === 'KW' ? country.dataset.kwUrl : country.dataset.qaUrl;
    if (url) location.assign(url);
  });
  document.querySelector('[data-lo-lang]')?.addEventListener('click', () => {
    document.querySelector('[data-lo-localization]')?.open();
  });
  document.querySelectorAll('.collection-count[data-qa-count]').forEach((count) => {
    const total = country?.dataset.current === 'KW' ? count.dataset.kwCount : count.dataset.qaCount;
    count.textContent = `${total} منتجًا`;
  });
  document.querySelectorAll('.faq-q').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = !item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('open', isOpen);
      question.setAttribute('aria-expanded', String(isOpen));
    });
  });
});
