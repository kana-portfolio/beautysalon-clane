(() => {
// 対象：ギャラリー内の画像（HTMLのクラス構造に合わせてある）
const thumbs = Array.from(document.querySelectorAll('.style-grid .style-item img'));
if (!thumbs.length) return;

const overlay = document.getElementById('lightbox');
const imgEl = document.getElementById('lightbox-img');
const capEl = document.getElementById('lightbox-caption');
const btnClose = overlay.querySelector('.lightbox-close');
const btnPrev = overlay.querySelector('.lightbox-prev');
const btnNext = overlay.querySelector('.lightbox-next');

let current = 0;

// 画像にホバー＆クリック可能な見た目（任意）
thumbs.forEach(t => (t.style.cursor = 'zoom-in'));

// figcaptionのテキストを拾う（なければalt）
const getCaption = (img) => {
const fig = img.closest('figure');
const cap = fig ? fig.querySelector('.style-caption') : null;
const txt = cap ? cap.textContent.trim() : (img.getAttribute('alt') || '');
return txt;
};

const lockScroll = () => {
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';
};
const unlockScroll = () => {
document.documentElement.style.overflow = '';
document.body.style.overflow = '';
};

const show = (index) => {
current = (index + thumbs.length) % thumbs.length;
const t = thumbs[current];
imgEl.src = t.src;
imgEl.alt = t.alt || '';
capEl.textContent = getCaption(t);

overlay.classList.add('is-open');
overlay.setAttribute('aria-hidden', 'false');
lockScroll();
};

const hide = () => {
overlay.classList.remove('is-open');
overlay.setAttribute('aria-hidden', 'true');
// 画像のチラつき防止で少し遅らせて消すなら以下を使う
// setTimeout(() => { imgEl.removeAttribute('src'); }, 150);
unlockScroll();
};

const showPrev = () => show(current - 1);
const showNext = () => show(current + 1);

// サムネイルクリックで開く
thumbs.forEach((img, i) => {
img.addEventListener('click', (e) => {
e.preventDefault();
show(i);
});
});

// 背景クリックで閉じる（中身クリックは閉じない）
overlay.addEventListener('click', (e) => {
if (e.target === overlay) hide();
});

// ボタン操作
btnClose.addEventListener('click', hide);
btnPrev.addEventListener('click', showPrev);
btnNext.addEventListener('click', showNext);

// キーボード操作
window.addEventListener('keydown', (e) => {
if (!overlay.classList.contains('is-open')) return;
if (e.key === 'Escape') hide();
if (e.key === 'ArrowLeft') showPrev();
if (e.key === 'ArrowRight') showNext();
});

// 画像読み込み失敗対策（任意）
imgEl.addEventListener('error', () => {
capEl.textContent = '画像を読み込めませんでした。';
});
})();