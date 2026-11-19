const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer:fine)').matches;

setTimeout(() => { const c = document.getElementById('curtain'); if(c) c.style.display='none'; }, 1600);

const nav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function setMenuOpen(open) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
}

navToggle.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
nav.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    setMenuOpen(false);
    navToggle.focus();
  }
});

function getScrollPosition() {
  const { scrollHeight, clientHeight, scrollTop } = document.scrollingElement;
  return Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
}

function setHeaderHidden(hidden) {
  if (hidden === nav.inert) return;
  nav.classList.toggle('nav-hidden', hidden);
  nav.inert = hidden;
  if (hidden) setMenuOpen(false);
}

const scrollThreshold = 8;
let scrollAnchor = getScrollPosition();

function updateHeaderVisibility() {
  const position = getScrollPosition();
  if (position <= 2) {
    scrollAnchor = position;
    setHeaderHidden(false);
    return;
  }

  // Track the furthest point before a reversal so small scroll movements can add up.
  scrollAnchor = nav.inert ? Math.max(scrollAnchor, position) : Math.min(scrollAnchor, position);
  if (Math.abs(position - scrollAnchor) >= scrollThreshold) {
    scrollAnchor = position;
    setHeaderHidden(!nav.inert);
  }
}

function resetScrollAnchor() {
  scrollAnchor = getScrollPosition();
  if (scrollAnchor <= 2) setHeaderHidden(false);
}

window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
window.addEventListener('resize', resetScrollAnchor);
window.addEventListener('pageshow', resetScrollAnchor);

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .section-head').forEach(el => io.observe(el));

const langIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.4 });
document.querySelectorAll('.lang-fill').forEach(el => langIO.observe(el));

const counters = document.querySelectorAll('.num[data-count]');
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(el => countIO.observe(el));

if (isFinePointer && !reduceMotion) {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx=0, my=0, rx=0, ry=0;
  window.addEventListener('mousemove', (e) => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  function loop(){
    rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .work-row').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
  });

  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  window.addEventListener('mousemove', (e) => {
    const px = (e.clientX / window.innerWidth - 0.5);
    const py = (e.clientY / window.innerHeight - 0.5);
    if (blob1) blob1.style.transform = `translate(${px*30}px, ${py*30}px)`;
    if (blob2) blob2.style.transform = `translate(${px*-24}px, ${py*-24}px)`;
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${x*0.28}px, ${y*0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
  });

  const tiltFigure = document.getElementById('tiltFigure');
  if (tiltFigure) {
    tiltFigure.addEventListener('mousemove', (e) => {
      const r = tiltFigure.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tiltFigure.style.transform = `perspective(800px) rotateY(${px*14}deg) rotateX(${-py*14}deg)`;
    });
    tiltFigure.addEventListener('mouseleave', () => { tiltFigure.style.transform = 'perspective(800px) rotateY(0) rotateX(0)'; });
  }
}

// Hover preview & project interaction (runs universally)
const panel = document.getElementById('previewPanel');
const label = document.getElementById('previewLabel');
const previewImg = document.getElementById('previewImg');
const cursorRingEl = document.getElementById('cursorRing');

// Preload project previews for instantaneous display
document.querySelectorAll('.work-row[data-preview]').forEach(row => {
  const p = new Image();
  p.src = row.dataset.preview;
});

if (previewImg) {
  previewImg.addEventListener('error', () => {
    previewImg.style.opacity = '0';
    if (panel) panel.classList.remove('has-image');
  });
  previewImg.addEventListener('load', () => {
    previewImg.style.opacity = '1';
    if (panel) panel.classList.add('has-image');
  });
}

function setPanelPos(e) {
  if (!panel) return;
  const pad = 24;
  const panelW = 320;
  const panelH = 200;
  let x = e.clientX + 28;
  let y = e.clientY - 100;
  if (x + panelW > window.innerWidth - pad) {
    x = e.clientX - panelW - 28;
  }
  if (y < pad) y = pad;
  if (y + panelH > window.innerHeight - pad) {
    y = window.innerHeight - panelH - pad;
  }
  panel.style.left = x + 'px';
  panel.style.top = y + 'px';
}

document.querySelectorAll('.work-row').forEach(row => {
  row.addEventListener('mouseenter', (e) => {
    if (panel) {
      panel.style.background = row.dataset.color || 'var(--forest)';
      if (label) label.textContent = row.querySelector('.title').textContent;

      const imgSrc = row.dataset.preview;
      if (previewImg && imgSrc) {
        if (previewImg.getAttribute('src') !== imgSrc) {
          previewImg.src = imgSrc;
        }
        panel.classList.add('has-image');
        previewImg.style.opacity = '1';
      }

      setPanelPos(e);
      panel.classList.add('show');
    }
    if (cursorRingEl) {
      cursorRingEl.classList.add('tag');
      cursorRingEl.dataset.label = 'View';
    }
  });

  row.addEventListener('mousemove', (e) => {
    setPanelPos(e);
  });

  row.addEventListener('mouseleave', () => {
    if (panel) panel.classList.remove('show');
    if (cursorRingEl) cursorRingEl.classList.remove('tag');
  });

  // Explicit click handling backup
  row.addEventListener('click', (e) => {
    const url = row.getAttribute('href');
    if (url && !e.defaultPrevented) {
      // Native <a> handles navigation; if tapped on mobile or keyboard, opens target url
    }
  });
});
