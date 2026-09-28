document.addEventListener('DOMContentLoaded', () => {
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
});
