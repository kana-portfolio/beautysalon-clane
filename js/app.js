console.log('hamburger init')
// js/main.js
document.addEventListener('DOMContentLoaded', () => {
const header = document.querySelector('.site-header');
const headerHeight = header ? header.offsetHeight : 0;

// 「#〜」に飛ぶリンクを全部ひっかける
const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach((link) => {
link.addEventListener('click', (e) => {
const href = link.getAttribute('href');

// href="#" だけのやつは無視
if (!href || href === '#') return;

const target = document.querySelector(href);
if (!target) return;

e.preventDefault();

const targetY =
target.getBoundingClientRect().top +
window.scrollY -
headerHeight -
16; // ちょっとだけ余白

window.scrollTo({
top: targetY,
behavior: 'smooth',
});
});
});

// 別ページから index.html#about みたいに来たとき用
if (location.hash) {
const target = document.querySelector(location.hash);
if (target) {
const targetY =
target.getBoundingClientRect().top +
window.scrollY -
headerHeight -
16;

window.scrollTo({
top: targetY,
behavior: 'smooth',
});
}
}
});

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const globalNav = document.querySelector('.global-nav');
  const overlay   = document.querySelector('.nav-overlay');
  const navLinks  = document.querySelectorAll('.global-nav .nav-list a');
  const root      = document.documentElement; // <html>

  const openMenu = () => {
    navToggle.classList.add('active');
    globalNav.classList.add('open');
    overlay.classList.add('is-active');
    root.classList.add('no-scroll');          // スクロールロック
    navToggle.setAttribute('aria-expanded', 'true');
    globalNav.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    navToggle.classList.remove('active');
    globalNav.classList.remove('open');
    overlay.classList.remove('is-active');
    root.classList.remove('no-scroll');
    navToggle.setAttribute('aria-expanded', 'false');
    globalNav.setAttribute('aria-hidden', 'true');
  };

  // トグル
  navToggle.addEventListener('click', () => {
    globalNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // オーバーレイ・リンククリック・ESCで閉じる
  overlay.addEventListener('click', closeMenu);
  navLinks.forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && globalNav.classList.contains('open')) closeMenu();
  });
});
