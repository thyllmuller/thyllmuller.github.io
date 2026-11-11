const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a');

const themeButtons = document.querySelectorAll('[data-theme-choice]');
const paletteButtons = document.querySelectorAll('[data-palette-choice]');
const savedTheme = localStorage.getItem('cv-theme');
const savedPalette = localStorage.getItem('cv-palette');
const availableThemes = new Set([...themeButtons].map((button) => button.dataset.themeChoice));
let currentTheme = 'code';

const setTheme = (theme) => {
  currentTheme = theme;
  document.body.dataset.theme = theme;
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === currentTheme));
  });
  localStorage.setItem('cv-theme', theme);
};

const setPalette = (palette) => {
  document.body.dataset.palette = palette;
  paletteButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.paletteChoice === palette));
  });
  localStorage.setItem('cv-palette', palette);
};

setTheme(availableThemes.has(savedTheme) ? savedTheme : 'code');
setPalette([...paletteButtons].some((button) => button.dataset.paletteChoice === savedPalette) ? savedPalette : 'slate');
themeButtons.forEach((button) => {
  button.addEventListener('click', () => setTheme(button.dataset.themeChoice));
});
paletteButtons.forEach((button) => {
  button.addEventListener('click', () => setPalette(button.dataset.paletteChoice));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      const id = section.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
