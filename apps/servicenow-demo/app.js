(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cell 1: Ami mascot SVG (brand sheet: bubble body, coral headset, mint eyes) ---------- */
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
    if (ms) wrap._t = setTimeout(() => (svg.dataset.expr = 'happy'), ms);
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

  /* ---------- Cell 3: mount every [data-ami] (hover = wink + wiggle, click = joy) ---------- */
  const mount = el => {
    el.innerHTML = amiSVG(el.hasAttribute('data-tight'));
    el.classList.add('ami-wrap');
    if (el.hasAttribute('data-calm')) { el.classList.add('calm', 'no-look', 'no-hover'); return; }       // navbar, search, chat
    if (el.hasAttribute('data-launcher')) { el.classList.add('steady', 'no-look', 'no-hover'); return; } // bottom bubble
    const trigger = el.closest('button') || el;           // buttons react as a whole
    trigger.addEventListener('pointerenter', () => setExpr(el, 'wink', 900));
    if (trigger === el) el.addEventListener('click', () => { setExpr(el, 'joy', 1600); burst(el); });
  };
  $$('[data-ami]').forEach(mount);

  /* ---------- Cell 4: eyes follow the cursor ---------- */
  let mx = 0, my = 0, raf = 0;
  const lookAt = () => {
    raf = 0;
    $$('.ami-wrap:not(.no-look) svg').forEach(svg => {
      const r = svg.getBoundingClientRect();
      const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height * .45);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
      svg.style.setProperty('--lx', (dx / d * 7 * k).toFixed(2));
      svg.style.setProperty('--ly', (dy / d * 5 * k).toFixed(2));
    });
  };
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; raf ||= requestAnimationFrame(lookAt); });

  /* ---------- Cell 5: elements + page intro (no loader: Ami spins straight in on refresh) ---------- */
  const chat = $('#chat'), launcher = $('#launcher'), greet = $('#greet');
  const launcherAmi = $('.ami-slot', launcher), heroBot = $('#heroBot'), chatAmi = $('#chatAmi');
  const input = $('#chatInput'), msgs = $('#msgs');

  $$('.tile').forEach((t, i) => (t.style.animationDelay = (1.1 + i * .07) + 's'));
  setTimeout(() => { burst(heroBot); setExpr(heroBot, 'joy', 1100); }, 1250);   // landing
  setTimeout(() => setExpr(heroBot, 'wink', 1200), 2500);
  setTimeout(() => launcher.classList.add('on', 'enter'), 1700);
  setTimeout(() => greet.classList.add('show'), 3000);
  setTimeout(() => greet.classList.add('hide'), 9300);
  setTimeout(() => (greet.style.display = 'none'), 9800);

  /* ---------- Cell 6: chat ---------- */
  const openChat = (v = '') => {
    chat.classList.add('open');
    chat.setAttribute('aria-hidden', 'false');
    launcher.setAttribute('aria-expanded', 'true');
    greet.style.display = 'none';
    if (v) input.value = v;
    setExpr(chatAmi, 'joy', 1200);
    setTimeout(() => input.focus(), 200);
  };
  const closeChat = () => {
    chat.classList.remove('open');
    chat.setAttribute('aria-hidden', 'true');
    launcher.setAttribute('aria-expanded', 'false');
  };

  const addMsg = (who, text, typing = false) => {
    const row = document.createElement('div');
    row.className = 'row' + (who === 'me' ? ' me' : '');
    if (who === 'bot') {
      const av = document.createElement('span');
      av.className = 'mini';
      av.setAttribute('data-ami', '');
      av.setAttribute('data-tight', '');
      av.setAttribute('data-calm', '');
      row.appendChild(av);
      mount(av);
    }
    const m = document.createElement('div');
    m.className = 'msg' + (typing ? ' typing' : '');
    if (typing) m.innerHTML = '<i></i><i></i><i></i>'; else m.textContent = text;
    row.appendChild(m);
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
    return row;
  };

  launcher.onclick = () => {
    setExpr(launcherAmi, 'blink', 220);   // the only time the launcher blinks
    chat.classList.contains('open') ? closeChat() : openChat();
  };
  $('#topAmi').onclick = () => openChat();
  $('#close').onclick = closeChat;
  $$('.chip').forEach(b => (b.onclick = () => openChat(b.textContent)));
  $('#searchForm').onsubmit = e => { e.preventDefault(); openChat($('#searchInput').value.trim()); };

  $('#chatForm').onsubmit = e => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    addMsg('me', v);
    input.value = '';
    const typing = addMsg('bot', '', true);
    setTimeout(() => {
      typing.remove();
      addMsg('bot', 'This working prototype is ready for ServiceNow Otto integration. The production action would use knowledge, catalog or live-agent handoff.');
      setExpr(chatAmi, 'joy', 1500);
    }, 900);
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeChat(); });
})();
