const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer:fine)').matches;

// 1. Entrance Curtain
setTimeout(() => {
  const c = document.getElementById('curtain');
  if (c) c.style.display = 'none';
}, 1600);

// 2. Navigation Scroll & Mobile Toggle
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
  updateScrollProgress();
});
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// 3. Scroll Progress Indicator
function updateScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
}

// 4. Live Yangon, Myanmar Clock HUD
function updateYangonClock() {
  const timeEl = document.getElementById('navTime');
  if (!timeEl) return;
  const now = new Date();
  const options = {
    timeZone: 'Asia/Yangon',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  timeEl.textContent = 'Yangon: ' + new Intl.DateTimeFormat('en-GB', options).format(now);
}
setInterval(updateYangonClock, 1000);
updateYangonClock();

// 5. Theme Toggle System (Dark & Light)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('sml_theme') || 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sml_theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}

// 6. Intersection Observer for Scroll Reveals
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .section-head').forEach(el => io.observe(el));

// 7. Animated Language Proficiency Bars
const langIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.4 });
document.querySelectorAll('.lang-fill').forEach(el => langIO.observe(el));

// 8. Animated Statistics Counters
const counters = document.querySelectorAll('.num[data-count]');
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
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

// 9. Spotlight Card Radial Glow Physics
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 10. Interactive Caesar Cipher Sandbox Logic
const cipherInput = document.getElementById('cipherInput');
const cipherOutput = document.getElementById('cipherOutput');
const shiftSlider = document.getElementById('shiftSlider');
const shiftVal = document.getElementById('shiftVal');
const btnEncrypt = document.getElementById('btnModeEncrypt');
const btnDecrypt = document.getElementById('btnModeDecrypt');
const btnCopy = document.getElementById('btnCopyCipher');
const btnReset = document.getElementById('btnResetCipher');

let cipherMode = 'encrypt'; // 'encrypt' or 'decrypt'

function caesarCipher(str, shift, decrypt = false) {
  let s = parseInt(shift, 10) % 26;
  if (decrypt) s = (26 - s) % 26;
  return str.split('').map(char => {
    const code = char.charCodeAt(0);
    // Uppercase
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + s) % 26) + 65);
    }
    // Lowercase
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + s) % 26) + 97);
    }
    return char;
  }).join('');
}

function updateCipher() {
  if (!cipherInput || !cipherOutput) return;
  const text = cipherInput.value;
  const shift = parseInt(shiftSlider.value, 10);
  if (shiftVal) shiftVal.textContent = shift;
  const result = caesarCipher(text, shift, cipherMode === 'decrypt');
  cipherOutput.textContent = result || '(No input)';
}

if (cipherInput && shiftSlider) {
  cipherInput.addEventListener('input', updateCipher);
  shiftSlider.addEventListener('input', updateCipher);
}

if (btnEncrypt && btnDecrypt) {
  btnEncrypt.addEventListener('click', () => {
    cipherMode = 'encrypt';
    btnEncrypt.style.borderColor = 'var(--forest)';
    btnEncrypt.style.color = 'var(--forest)';
    btnDecrypt.style.borderColor = 'var(--line)';
    btnDecrypt.style.color = 'var(--ink)';
    updateCipher();
  });
  btnDecrypt.addEventListener('click', () => {
    cipherMode = 'decrypt';
    btnDecrypt.style.borderColor = 'var(--forest)';
    btnDecrypt.style.color = 'var(--forest)';
    btnEncrypt.style.borderColor = 'var(--line)';
    btnEncrypt.style.color = 'var(--ink)';
    updateCipher();
  });
}

// Toast notification helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

if (btnCopy) {
  btnCopy.addEventListener('click', () => {
    const text = cipherOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied transformed text! 📋');
    }).catch(() => {
      showToast('Copied! (Fallback)');
    });
  });
}

if (btnReset) {
  btnReset.addEventListener('click', () => {
    cipherInput.value = 'Clean code, clear interfaces.';
    shiftSlider.value = 3;
    cipherMode = 'encrypt';
    btnEncrypt.style.borderColor = 'var(--forest)';
    btnEncrypt.style.color = 'var(--forest)';
    btnDecrypt.style.borderColor = 'var(--line)';
    btnDecrypt.style.color = 'var(--ink)';
    updateCipher();
    showToast('Reset to default');
  });
}

// 11. Custom Interactive Cursor & Magnetic Buttons (Desktop)
if (isFinePointer && !reduceMotion) {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });
  function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .work-row, .icon-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
  });

  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  window.addEventListener('mousemove', (e) => {
    const px = (e.clientX / window.innerWidth - 0.5);
    const py = (e.clientY / window.innerHeight - 0.5);
    if (blob1) blob1.style.transform = `translate(${px * 36}px, ${py * 36}px)`;
    if (blob2) blob2.style.transform = `translate(${px * -28}px, ${py * -28}px)`;
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
    });
  });

  const tiltFigure = document.getElementById('tiltFigure');
  if (tiltFigure) {
    tiltFigure.addEventListener('mousemove', (e) => {
      const r = tiltFigure.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tiltFigure.style.transform = `perspective(900px) rotateY(${px * 16}deg) rotateX(${-py * 16}deg) scale(1.02)`;
    });
    tiltFigure.addEventListener('mouseleave', () => {
      tiltFigure.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)';
    });
  }

  const panel = document.getElementById('previewPanel');
  const label = document.getElementById('previewLabel');
  document.querySelectorAll('.work-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      panel.style.background = row.dataset.color;
      label.textContent = row.querySelector('.title').textContent;
      panel.classList.add('show');
      ring.classList.add('tag');
      ring.dataset.label = 'View';
    });
    row.addEventListener('mousemove', (e) => {
      panel.style.left = (e.clientX + 28) + 'px';
      panel.style.top = (e.clientY - 100) + 'px';
    });
    row.addEventListener('mouseleave', () => {
      panel.classList.remove('show');
      ring.classList.remove('tag');
    });
  });
}

// 12. Atmospheric Ambient Particle Canvas Background
(function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numParticles = Math.min(50, Math.floor(window.innerWidth / 28));
  const particles = [];
  let mouse = { x: null, y: null, maxDist: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const dotColor = isLight ? 'rgba(36, 64, 47, 0.4)' : 'rgba(16, 185, 129, 0.45)';
    const lineColor = isLight ? 'rgba(36, 64, 47, 0.12)' : 'rgba(16, 185, 129, 0.15)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse influence
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      // Connect near neighbors
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - dist / 110;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
})();

// 13. Keyboard Shortcut Jump Navigation
window.addEventListener('keydown', (e) => {
  if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;
  if (e.key === 't' || e.key === 'T') {
    if (themeToggle) themeToggle.click();
  } else if (e.key === 'p' || e.key === 'P') {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 's' || e.key === 'S') {
    const el = document.getElementById('cipher');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 'c' || e.key === 'C') {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
});
