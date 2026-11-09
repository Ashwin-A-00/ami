(() => {
  document.documentElement.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const I18N = window.AmiI18n;
  const t = I18N.t;

  /* ---------- Cell 1: mascot SVG (brand sheet: bubble body, coral headset, mint eyes, gold sparks) ---------- */
  let uid = 0;
  const amiSVG = tight => {
    const i = ++uid;
    return `
<svg class="ami${tight ? ' tight' : ''}" viewBox="${tight ? '40 48 320 332' : '0 0 400 420'}" data-expr="happy" aria-hidden="true">
  <defs>
    <linearGradient id="b${i}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7a9bff"/><stop offset=".5" stop-color="#4A6BFF"/><stop offset="1" stop-color="#3347d9"/>
    </linearGradient>
    <linearGradient id="v${i}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1c2560"/><stop offset="1" stop-color="#0c1030"/>
    </linearGradient>
    <filter id="g${i}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <ellipse class="shadow" cx="200" cy="402" rx="105" ry="10" fill="#000" opacity=".25"/>
  <g class="tilt"><g class="float">
    <path d="M85 300 L62 374 L162 322 Z" fill="#2b3fd6"/>
    <rect x="48" y="58" width="304" height="262" rx="120" fill="url(#b${i})"/>
    <path d="M88 122 Q110 84 190 80" stroke="#fff" stroke-opacity=".35" stroke-width="10" stroke-linecap="round" fill="none"/>
    <rect x="88" y="122" width="224" height="146" rx="68" fill="url(#v${i})" stroke="#5a6cd0" stroke-opacity=".5" stroke-width="2"/>
    <g class="look" filter="url(#g${i})">
      <g class="eye eL"><ellipse cx="156" cy="192" rx="16" ry="22" fill="#7DF9E3"/><circle cx="161" cy="183" r="5" fill="#fff"/></g>
      <g class="eye eR"><ellipse cx="244" cy="192" rx="16" ry="22" fill="#7DF9E3"/><circle cx="249" cy="183" r="5" fill="#fff"/></g>
      <path class="arc arcL" d="M138 198 Q156 176 174 198" stroke="#7DF9E3" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path class="arc arcR" d="M226 198 Q244 176 262 198" stroke="#7DF9E3" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path class="mouth" d="M168 232 Q200 262 232 232" stroke="#7DF9E3" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path class="mouthJoy" d="M166 226 Q200 278 234 226 Z" fill="#7DF9E3" stroke="#7DF9E3" stroke-width="5" stroke-linejoin="round"/>
    </g>
    <circle cx="116" cy="244" r="12" fill="#b0608a" opacity=".65"/>
    <circle cx="284" cy="244" r="12" fill="#b0608a" opacity=".65"/>
    <g class="headset">
      <path d="M70 178 C 70 28, 330 28, 330 178" stroke="#FF9A76" stroke-width="15" stroke-linecap="round" fill="none"/>
      <rect x="50" y="148" width="40" height="88" rx="20" fill="#FF9A76"/>
      <rect x="310" y="148" width="40" height="88" rx="20" fill="#FF9A76"/>
      <circle cx="70" cy="190" r="7" fill="#FFD166"/><circle cx="330" cy="190" r="7" fill="#FFD166"/>
      <path d="M330 232 C 330 292, 292 300, 248 292" stroke="#FF9A76" stroke-width="9" stroke-linecap="round" fill="none"/>
      <ellipse cx="236" cy="292" rx="18" ry="11" fill="#FFD166"/>
    </g>
    <path class="spark" d="M352 26 Q356 48 378 52 Q356 56 352 78 Q348 56 326 52 Q348 48 352 26Z" fill="#FFD166"/>
    <path class="spark s2" d="M386 102 Q388 110 397 112 Q388 114 386 123 Q384 114 375 112 Q384 110 386 102Z" fill="#FFD166"/>
    <circle class="spark s3" cx="322" cy="26" r="4.5" fill="#FFD166"/>
  </g></g>
</svg>`;
  };

  /* ---------- Cell 2: expression + confetti helpers ---------- */
  const setExpr = (wrap, name, ms) => {
    const svg = wrap.querySelector('svg');
    clearTimeout(wrap._t);
    svg.dataset.expr = name;
    if (ms) wrap._t = setTimeout(() => (svg.dataset.expr = wrap.dataset.base || 'happy'), ms);
  };

  const burst = wrap => {
    if (reduce) return;
    const colors = ['#FFD166', '#7DF9E3', '#FF9A76', '#4A6BFF'];
    for (let n = 0; n < 14; n++) {
      const s = document.createElement('span');
      const a = (n / 14) * Math.PI * 2, d = 90 + Math.random() * 70;
      s.className = 'burst';
      s.style.setProperty('--c', colors[n % 4]);
      s.style.setProperty('--dx', Math.cos(a) * d + 'px');
      s.style.setProperty('--dy', Math.sin(a) * d + 'px');
      wrap.appendChild(s);
      setTimeout(() => s.remove(), 950);
    }
  };

  /* ---------- Cell 3: mount every [data-ami]. Only the hero reacts (hover wink, click joy, eye tracking) ---------- */
  const mount = el => {
    el.innerHTML = amiSVG(el.hasAttribute('data-tight'));
    el.classList.add('ami-wrap');
    if (el.dataset.base) el.firstElementChild.dataset.expr = el.dataset.base;
    if (el.hasAttribute('data-loading')) { el.classList.add('no-look', 'no-hover'); return; }
    if (el.hasAttribute('data-calm')) { el.classList.add('calm', 'no-look', 'no-hover'); return; }
    el.addEventListener('pointerenter', () => setExpr(el, 'wink', 900));
    el.addEventListener('click', () => { setExpr(el, 'joy', 1600); burst(el); });
  };
  $$('[data-ami]').forEach(mount);

  /* ---------- Cell 4: hero eyes follow the cursor ---------- */
  const heroAmi = $('#heroAmi');
  let mx = 0, my = 0, raf = 0;
  const lookAt = () => {
    raf = 0;
    const svg = $('svg', heroAmi), r = svg.getBoundingClientRect();
    const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height * .45);
    const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
    svg.style.setProperty('--lx', (dx / d * 7 * k).toFixed(2));
    svg.style.setProperty('--ly', (dy / d * 5 * k).toFixed(2));
  };
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; raf ||= requestAnimationFrame(lookAt); });

  /* ---------- Cell 5: starfields ---------- */
  $$('.starfield').forEach(c => {
    for (let n = 0; n < 40; n++) {
      const s = document.createElement('span'), z = 1 + Math.random() * 2.5;
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;animation-delay:${Math.random() * 3}s`;
      c.appendChild(s);
    }
  });

  /* ---------- Cell 6: language + loading screen (text follows the detected locale) ---------- */
  I18N.init();

  const loaderAmi = $('#loader [data-ami]'), fill = $('#barFill'), pctEl = $('#barPct'), txt = $('#loaderText');
  const stepAt = pct => (pct >= 100 ? 'ld4' : pct >= 65 ? 'ld3' : pct >= 30 ? 'ld2' : 'ld1');
  const dur = reduce ? 600 : 2800, t0 = performance.now();
  const pageLoaded = new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', r));

  const finish = () => {
    setExpr(loaderAmi, 'joy');
    burst(loaderAmi);
    setTimeout(() => {
      document.body.classList.replace('is-loading', 'loaded');
      setTimeout(() => { burst(heroAmi); setExpr(heroAmi, 'joy', 1100); }, 1750);   // landing
      setTimeout(() => setExpr(heroAmi, 'wink', 1200), 3000);
    }, 750);
  };

  const timer = setInterval(() => {
    const p = Math.min(1, Math.max(0, (performance.now() - t0) / dur)), pct = Math.round((1 - Math.pow(1 - p, 3)) * 100);
    fill.style.width = pct + '%';
    pctEl.textContent = new Intl.NumberFormat(document.documentElement.lang).format(pct) + '%';
    txt.textContent = t(stepAt(pct));
    if (p >= 1) { clearInterval(timer); pageLoaded.then(finish); }
  }, 33);

  /* ---------- Cell 7: reveal sections on scroll ---------- */
  const rev = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    rev.forEach(el => io.observe(el));
  } else rev.forEach(el => el.classList.add('in'));

  /* ---------- Cell 8: Ask Ami demo (localized prompts + replies; Ami switches face on reply) ---------- */
  const tryAmi = $('#tryAmi'), q = $('#q'), msgs = $('#msgs');

  const add = (cls, text) => {
    const m = document.createElement('div');
    m.className = 'msg ' + cls;
    m.textContent = text;
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
    return m;
  };

  const send = (text, key) => {
    if (!text.trim()) return;
    add('me', text);
    q.value = '';
    const dots = document.createElement('div');
    dots.className = 'msg bot typing';
    dots.innerHTML = '<i></i><i></i><i></i>';
    msgs.appendChild(dots);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      dots.remove();
      add('bot', t(key ? 'r' + key : 'r_def'));
      setExpr(tryAmi, 'joy', 1800);
    }, 900);
  };

  $('#form').addEventListener('submit', e => { e.preventDefault(); send(q.value); });
  $$('.quick button').forEach(b => b.addEventListener('click', () => send(b.textContent, b.dataset.q)));
})();
