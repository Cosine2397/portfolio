const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer:fine)').matches;

  setTimeout(() => { const c = document.getElementById('curtain'); if(c) c.style.display='none'; }, 1600);

  const nav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 12); });
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

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

    const panel = document.getElementById('previewPanel');
    const label = document.getElementById('previewLabel');
    document.querySelectorAll('.work-row').forEach(row => {
      row.addEventListener('mouseenter', () => {
        panel.style.background = row.dataset.color;
        label.textContent = row.querySelector('.title').textContent;
        panel.classList.add('show');
        ring.classList.add('tag'); ring.dataset.label='View';
      });
      row.addEventListener('mousemove', (e) => {
        panel.style.left = (e.clientX + 28) + 'px';
        panel.style.top = (e.clientY - 100) + 'px';
      });
      row.addEventListener('mouseleave', () => { panel.classList.remove('show'); ring.classList.remove('tag'); });
    });
  }
