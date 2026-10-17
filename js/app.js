/* Supervision: app logic.
   Practice model: active recall + progressive hints + self-grading,
   scheduled with spaced repetition (SM-2 style) and interleaved across topics,
   plus timed mock interviews. All progress lives in localStorage. */
(() => {
  'use strict';

  const QB = window.QB || [];
  const TOPICS = window.TOPICS || [];
  const TOPIC = Object.fromEntries(TOPICS.map(t => [t.id, t]));
  const BY_ID = Object.fromEntries(QB.map(q => [q.id, q]));
  const DAY = 86400000;
  const MASTERED_DAYS = 14;
  const STORE_KEY = 'supervision.v1';
  const DIFF_LABEL = { 3: 'Hard', 4: 'Very hard', 5: 'Brutal' };
  const GRADES = [
    { g: 0, name: 'Again', desc: "Couldn't crack it" },
    { g: 1, name: 'Hard', desc: 'Got there with nudges' },
    { g: 2, name: 'Good', desc: 'Solved it myself' },
    { g: 3, name: 'Easy', desc: 'Solved + the follow-up' }
  ];

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const app = $('#app');

  /* ───────────── Storage ───────────── */

  const defaults = () => ({
    cards: {},
    notes: {},
    streak: { last: null, count: 0 },
    daily: {},
    settings: { size: 8, mockMins: 30, mockCount: 4 }
  });

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaults();
      const d = JSON.parse(raw);
      const base = defaults();
      return { ...base, ...d, settings: { ...base.settings, ...(d.settings || {}) } };
    } catch (e) { return defaults(); }
  }
  let S = load();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* private mode: keep in memory */ }
  }

  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const yesterday = () => {
    const d = new Date(Date.now() - DAY);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  /* ───────────── Spaced repetition ───────────── */

  const card = id => S.cards[id];

  function schedule(id, g, secs, hints) {
    const now = Date.now();
    const c = S.cards[id] || { reps: 0, interval: 0, ease: 2.5, due: 0, lapses: 0, seen: 0, history: [] };
    c.seen++;
    c.last = g;
    c.lastAt = now;
    if (g === 0) {
      c.lapses++;
      c.reps = 0;
      c.interval = 0;
      c.ease = Math.max(1.3, c.ease - 0.2);
      c.due = now + 10 * 60 * 1000;
    } else {
      if (g === 1) {
        c.interval = c.reps === 0 ? 1 : Math.max(1, c.interval * 1.2);
        c.ease = Math.max(1.3, c.ease - 0.15);
      } else if (g === 2) {
        c.interval = c.reps === 0 ? 1 : c.reps === 1 ? 3 : c.interval * c.ease;
      } else {
        c.interval = c.reps === 0 ? 3 : c.reps === 1 ? 6 : c.interval * c.ease * 1.3;
        c.ease = Math.min(3.2, c.ease + 0.15);
      }
      c.reps++;
      c.due = now + c.interval * DAY;
    }
    c.history.push({ t: now, g, s: Math.round(secs), h: hints });
    if (c.history.length > 30) c.history.shift();
    S.cards[id] = c;

    const t = today();
    if (S.streak.last !== t) {
      S.streak.count = S.streak.last === yesterday() ? S.streak.count + 1 : 1;
      S.streak.last = t;
    }
    S.daily[t] = (S.daily[t] || 0) + 1;
    save();
  }

  function status(id) {
    const c = card(id);
    if (!c) return 'new';
    if (c.last === 0 || (c.lapses > 0 && c.interval < 3)) return 'struggling';
    if (c.interval >= MASTERED_DAYS) return 'mastered';
    return 'learning';
  }
  const STATUS_LABEL = { new: 'New', learning: 'Learning', mastered: 'Mastered', struggling: 'Struggling' };

  function cardScore(id) {
    const c = card(id);
    if (!c || c.last === 0) return 0;
    return Math.min(1, c.interval / MASTERED_DAYS);
  }

  function topicStats(tid) {
    const qs = QB.filter(q => q.topic === tid);
    const st = { total: qs.length, new: 0, learning: 0, mastered: 0, struggling: 0, score: 0 };
    qs.forEach(q => { st[status(q.id)]++; st.score += cardScore(q.id); });
    st.score = qs.length ? st.score / qs.length : 0;
    return st;
  }

  function readiness() {
    let num = 0, den = 0;
    TOPICS.forEach(t => { const s = topicStats(t.id); num += t.weight * s.score; den += t.weight; });
    return den ? num / den : 0;
  }

  const isDue = id => { const c = card(id); return c && c.due <= Date.now(); };
  const dueIds = () => QB.filter(q => isDue(q.id)).sort((a, b) => card(a.id).due - card(b.id).due).map(q => q.id);
  const newIds = () => QB.filter(q => !card(q.id)).map(q => q.id);

  /* Weighted random pick of new questions: likely topics and weak topics first. */
  function pickNew(n, exclude = new Set()) {
    const pool = newIds().filter(id => !exclude.has(id));
    const tScore = Object.fromEntries(TOPICS.map(t => [t.id, topicStats(t.id).score]));
    const out = [];
    while (out.length < n && pool.length) {
      const weights = pool.map(id => {
        const q = BY_ID[id];
        const w = TOPIC[q.topic] ? TOPIC[q.topic].weight : 1;
        return w * (1.5 - tScore[q.topic]);
      });
      const total = weights.reduce((a, b) => a + b, 0);
      let r = Math.random() * total, i = 0;
      while (r > weights[i] && i < weights.length - 1) { r -= weights[i]; i++; }
      out.push(pool.splice(i, 1)[0]);
    }
    return out;
  }

  /* Interleave so the same topic doesn't come up twice in a row where avoidable. */
  function interleave(ids) {
    const rest = ids.slice();
    const out = [];
    while (rest.length) {
      const prev = out.length ? BY_ID[out[out.length - 1]].topic : null;
      let i = rest.findIndex(id => BY_ID[id].topic !== prev);
      if (i < 0) i = 0;
      out.push(rest.splice(i, 1)[0]);
    }
    return out;
  }

  function buildSupervision(n) {
    const due = dueIds().slice(0, n);
    const picked = new Set(due);
    let queue = due.concat(pickNew(n - due.length, picked));
    if (queue.length < n) {
      // Everything seen and nothing due: practise ahead, weakest first.
      const ahead = QB.map(q => q.id).filter(id => !queue.includes(id))
        .sort((a, b) => cardScore(a) - cardScore(b) || card(a).due - card(b).due)
        .slice(0, n - queue.length);
      queue = queue.concat(ahead);
    }
    return interleave(queue);
  }

  /* ───────────── Formatting ───────────── */

  function fmt(s) {
    return s.trim().split(/\n\s*\n/).map(p => {
      const html = p.replace(/\s*\n\s*/g, (m, off, str) => {
        const before = str.slice(0, off);
        const after = str.slice(off + m.length);
        return (before.endsWith('$$') || after.startsWith('$$')) ? ' ' : '<br>';
      });
      return `<p>${html}</p>`;
    }).join('');
  }

  function math(el) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (e) { /* leave raw TeX */ }
    }
  }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const diffDots = d => `<span class="diff" title="${DIFF_LABEL[d]}">${[1, 2, 3].map(i => `<i class="${i <= d - 2 ? 'on' : ''}"></i>`).join('')}<span class="diff-label">${DIFF_LABEL[d]}</span></span>`;
  const likelihood = w => w === 3 ? '<span class="pill high">High likelihood</span>' : w === 2 ? '<span class="pill">Medium likelihood</span>' : '<span class="pill">Lower likelihood</span>';
  const mmss = secs => { secs = Math.max(0, Math.round(secs)); return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`; };

  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ───────────── Router ───────────── */

  let ticker = null;
  let keyHandler = null;
  let session = null;  // active practice session
  let mock = null;     // active mock interview

  function setNav(name) {
    $$('.nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === name));
  }

  function cleanup() {
    clearInterval(ticker); ticker = null;
    if (keyHandler) { document.removeEventListener('keydown', keyHandler); keyHandler = null; }
  }

  function route() {
    cleanup();
    const [, view, arg] = (location.hash || '#/home').split('/');
    window.scrollTo(0, 0);
    switch (view) {
      case 'supervise': setNav('supervise'); return startSupervision();
      case 'session': setNav(session && session.nav || 'supervise'); return session ? renderCard() : go('home');
      case 'q': setNav('library'); return startSingle(arg);
      case 'topic': setNav('home'); return startTopic(arg);
      case 'drill': setNav('home'); return startDrill();
      case 'mock': setNav('mock'); return mock && !mock.done ? renderMockCard() : renderMockIntro();
      case 'review': setNav('mock'); return mock ? renderMockReview() : go('mock');
      case 'library': setNav('library'); return renderLibrary();
      case 'method': setNav('method'); return renderMethod();
      default: setNav('home'); return renderHome();
    }
  }
  const go = path => { if (location.hash === '#/' + path) route(); else location.hash = '#/' + path; };
  window.addEventListener('hashchange', route);

  /* ───────────── Home ───────────── */

  function renderHome() {
    const r = readiness();
    const due = dueIds().length;
    const fresh = newIds().length;
    const mastered = QB.filter(q => status(q.id) === 'mastered').length;
    const struggling = QB.filter(q => status(q.id) === 'struggling').length;
    const C = 2 * Math.PI * 52;
    const weakest = TOPICS.slice().sort((a, b) => (topicStats(a.id).score - topicStats(b.id).score) || (b.weight - a.weight))[0];

    app.innerHTML = `
      <section class="hero">
        <div>
          <div class="eyebrow">Cambridge Engineering · ${QB.length} hard questions</div>
          <h1>Prepare like it's the real supervision.</h1>
          <p class="lead">Attempt each problem out loud, take a nudge only when you're stuck, then compare with a model answer and grade yourself honestly. Anything you fail comes back until you've mastered it.</p>
        </div>
        <div class="ring" aria-label="Interview readiness ${Math.round(r * 100)} percent">
          <svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="52" fill="none" stroke-width="10"/>
          <circle class="fill" cx="60" cy="60" r="52" fill="none" stroke-width="10" stroke-linecap="round"
            stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - r)}"/></svg>
          <div class="ring-label"><strong>${Math.round(r * 100)}%</strong><span>Readiness</span></div>
        </div>
      </section>

      <div class="stats">
        <div class="stat"><strong>${due}</strong><span>Due for review</span></div>
        <div class="stat"><strong>${fresh}</strong><span>Not yet attempted</span></div>
        <div class="stat"><strong>${mastered}<small style="font-size:.9rem"> / ${QB.length}</small></strong><span>Mastered (${MASTERED_DAYS}+ day interval)</span></div>
        <div class="stat"><strong>${S.streak.last === today() || S.streak.last === yesterday() ? S.streak.count : 0}</strong><span>Day streak · ${S.daily[today()] || 0} today</span></div>
      </div>

      <div class="actions">
        <button class="action primary" data-go="supervise">
          <h3>Begin supervision</h3>
          <p>Today's session: due reviews first, then new problems weighted towards likely topics and your weak spots.</p>
          <span class="meta">${S.settings.size} questions · about ${S.settings.size * 8} min${due ? ` · ${Math.min(due, S.settings.size)} reviews due` : ''}</span>
        </button>
        <button class="action" data-go="mock">
          <h3>Mock interview</h3>
          <p>${S.settings.mockCount} unseen-style problems against a ${S.settings.mockMins}-minute clock, like the real thing. Review afterwards.</p>
          <span class="meta">Timed · mixed topics</span>
        </button>
        <button class="action" data-go="drill" ${struggling ? '' : 'disabled style="opacity:.55;cursor:default"'}>
          <h3>Drill my failures</h3>
          <p>Re-attempt only the problems you've failed or found hard, until they stick.</p>
          <span class="meta">${struggling} struggling</span>
        </button>
      </div>

      <section class="section">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap">
          <h2>Topics</h2>
          <small>Readiness is weighted by how likely each topic is to come up.</small>
        </div>
        ${weakest && QB.some(q => card(q.id)) ? `<div class="callout" style="margin:10px 0 16px"><p>Weakest area: <b>${esc(weakest.name)}</b>. A focused drill there will lift your readiness fastest.</p></div>` : ''}
        <div class="topics">
          ${TOPICS.map(t => {
            const s = topicStats(t.id);
            const pct = n => (s.total ? (n / s.total) * 100 : 0).toFixed(1);
            return `<button class="topic" data-topic="${t.id}">
              <div class="topic-head"><span class="topic-name">${esc(t.name)}</span>${t.weight === 3 ? '<span class="pill high">High</span>' : ''}</div>
              <span class="topic-blurb">${esc(t.blurb)}</span>
              <div class="bar" title="${s.mastered} mastered, ${s.learning} learning, ${s.struggling} struggling"><span class="m" style="width:${pct(s.mastered)}%"></span><span class="l" style="width:${pct(s.learning)}%"></span><span class="s" style="width:${pct(s.struggling)}%"></span></div>
              <div class="topic-foot"><span>${s.total} questions</span><span>${Math.round(s.score * 100)}% ready</span></div>
            </button>`;
          }).join('')}
        </div>
      </section>
    `;
    $$('[data-go]', app).forEach(b => b.addEventListener('click', () => { if (!b.disabled) go(b.dataset.go); }));
    $$('[data-topic]', app).forEach(b => b.addEventListener('click', () => go('topic/' + b.dataset.topic)));
  }

  /* ───────────── Practice sessions ───────────── */

  function newSession(title, queue, nav = 'supervise') {
    session = { title, queue, index: 0, results: [], requeued: {}, nav };
    beginCard();
    location.hash = '#/session';
  }

  function beginCard() {
    session.cur = { start: Date.now(), hints: 0, revealed: false, secs: 0 };
  }

  function startSupervision() {
    const q = buildSupervision(S.settings.size);
    if (!q.length) { app.innerHTML = `<div class="empty">No questions loaded.</div>`; return; }
    newSession('Supervision', q, 'supervise');
  }
  function startTopic(tid) {
    const t = TOPIC[tid];
    if (!t) return go('home');
    const ids = QB.filter(q => q.topic === tid).map(q => q.id);
    const order = ids.sort((a, b) => {
      const ra = !card(a) ? 1 : isDue(a) ? 0 : 2, rb = !card(b) ? 1 : isDue(b) ? 0 : 2;
      return ra - rb || cardScore(a) - cardScore(b);
    }).slice(0, S.settings.size);
    newSession(t.name, order, 'home');
  }
  function startDrill() {
    const ids = QB.map(q => q.id).filter(id => status(id) === 'struggling' || (card(id) && card(id).last === 1))
      .sort((a, b) => cardScore(a) - cardScore(b));
    if (!ids.length) { toast('Nothing to drill. Nice.'); return go('home'); }
    newSession('Drill: failures', interleave(ids.slice(0, S.settings.size)), 'home');
  }
  function startSingle(id) {
    if (!BY_ID[id]) return go('library');
    newSession('Single question', [id], 'library');
  }

  function questionHTML(q, cur, opts = {}) {
    const t = TOPIC[q.topic] || { name: q.topic };
    const hintsShown = q.hints.slice(0, cur.hints);
    return `
      <article class="card qcard">
        <div class="qmeta">
          <span class="pill">${esc(t.name)}</span>
          ${diffDots(q.diff)}
          ${status(q.id) !== 'new' ? `<span class="pill ${status(q.id)}">${STATUS_LABEL[status(q.id)]}</span>` : ''}
        </div>
        <h2 class="qtitle">${esc(q.title)}</h2>
        <div class="qbody">${fmt(q.q)}</div>
        <div class="coach" aria-hidden="true">Interview habits: <span>Think aloud</span><span>Sketch it</span><span>State assumptions</span><span>Check units & limits</span><span>Put in numbers</span></div>

        <div class="scratch">
          <label for="notes">Your working: talk it through as if to the interviewer (saved automatically)</label>
          <textarea id="notes" placeholder="Approach, key equations, answer, sanity checks…">${esc(S.notes[q.id] || '')}</textarea>
        </div>

        <div class="hints" id="hints">
          ${hintsShown.map((h, i) => `<div class="hint"><b class="hn">${opts.mock ? 'Interviewer nudge' : 'Hint'} ${i + 1} of ${q.hints.length}</b>${fmt(h)}</div>`).join('')}
        </div>

        ${cur.revealed ? '' : `
        <div class="controls">
          <button class="btn" id="hintBtn" ${cur.hints >= q.hints.length ? 'disabled' : ''}>${opts.mock ? 'Ask for a nudge' : 'Show a hint'} <kbd>H</kbd></button>
          <span class="spacer"></span>
          ${opts.mock
            ? `<button class="btn btn-primary" id="nextBtn">${opts.last ? 'Finish interview' : 'Next question'} <kbd>Enter</kbd></button>`
            : `<button class="btn btn-primary" id="revealBtn">Reveal model answer <kbd>Enter</kbd></button>`}
        </div>`}

        ${cur.revealed ? solutionHTML(q) + gradeHTML(cur) : ''}
      </article>`;
  }

  function solutionHTML(q) {
    return `
      <div class="solution">
        <div class="block"><span class="label">Model answer</span>${fmt(q.sol)}</div>
        <div class="block insight"><span class="label">Key insight</span>${fmt(q.insight)}</div>
        <div class="block follow"><span class="label">The interviewer pushes further</span>${fmt(q.follow)}</div>
      </div>`;
  }

  function gradeCap(cur) { return cur.hints >= 2 ? 1 : cur.hints === 1 ? 2 : 3; }

  function gradeHTML(cur) {
    const cap = gradeCap(cur);
    return `
      <div class="grade">
        <div class="grade-q">How did you do? Be honest: this decides when you see it again.</div>
        <div class="grades">
          ${GRADES.map(x => `<button class="gbtn g${x.g}" data-grade="${x.g}" ${x.g > cap ? 'disabled' : ''}><strong>${x.name} <kbd>${x.g + 1}</kbd></strong><span>${x.desc}</span></button>`).join('')}
        </div>
        ${cap < 3 ? `<div class="grade-note">You used ${cur.hints} hint${cur.hints > 1 ? 's' : ''}, so the best grade is "${GRADES[cap].name}". In the real interview nudges are normal, but you should be able to solve it unaided before calling it mastered.</div>` : ''}
      </div>`;
  }

  function startTicker(elId, getSecs, target, countdown = false, onZero) {
    const tick = () => {
      const el = document.getElementById(elId);
      if (!el) return;
      const secs = getSecs();
      if (countdown) {
        el.querySelector('.t').textContent = mmss(secs);
        el.classList.toggle('warn', secs < 300);
        el.classList.toggle('over', secs <= 0);
        if (secs <= 0 && onZero) onZero();
      } else {
        el.querySelector('.t').textContent = mmss(secs);
        el.classList.toggle('warn', secs > target * 60);
        el.classList.toggle('over', secs > target * 120);
      }
    };
    tick();
    ticker = setInterval(tick, 1000);
  }

  function bindNotes(id) {
    const ta = $('#notes');
    if (!ta) return;
    ta.addEventListener('input', () => { S.notes[id] = ta.value; save(); });
  }

  function renderCard() {
    cleanup();
    const id = session.queue[session.index];
    const q = BY_ID[id];
    const cur = session.cur;
    app.innerHTML = `
      <div class="session-bar">
        <div>
          <div class="eyebrow" style="margin:0 0 6px">${esc(session.title)} · ${session.index + 1} of ${session.queue.length}</div>
          <div class="progress-dots">${session.queue.map((_, i) => `<i class="${i < session.index ? 'done' : i === session.index ? 'cur' : ''}"></i>`).join('')}</div>
        </div>
        <div class="btn-row" style="align-items:center">
          <span class="timer" id="qtimer" title="Aim: about ${q.mins} minutes"><span class="dot"></span><span class="t">0:00</span><small class="muted">/ ~${q.mins}m</small></span>
          <button class="btn btn-ghost btn-small" id="endBtn">End session</button>
        </div>
      </div>
      ${questionHTML(q, cur)}
    `;
    math(app);
    bindNotes(id);
    if (!cur.revealed) startTicker('qtimer', () => (Date.now() - cur.start) / 1000, q.mins);
    else $('#qtimer .t').textContent = mmss(cur.secs);

    const hint = () => { if (!cur.revealed && cur.hints < q.hints.length) { cur.hints++; renderCard(); } };
    const reveal = () => { if (!cur.revealed) { cur.secs = (Date.now() - cur.start) / 1000; cur.revealed = true; renderCard(); $('.solution').scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
    const grade = g => {
      if (!cur.revealed || g > gradeCap(cur)) return;
      schedule(id, g, cur.secs, cur.hints);
      session.results.push({ id, g, secs: cur.secs, hints: cur.hints });
      if (g === 0 && (session.requeued[id] || 0) < 2) {
        session.requeued[id] = (session.requeued[id] || 0) + 1;
        session.queue.splice(Math.min(session.queue.length, session.index + 4), 0, id);
      }
      session.index++;
      if (session.index >= session.queue.length) return renderSummary();
      beginCard();
      renderCard();
      window.scrollTo(0, 0);
    };

    $('#hintBtn') && $('#hintBtn').addEventListener('click', hint);
    $('#revealBtn') && $('#revealBtn').addEventListener('click', reveal);
    $$('[data-grade]').forEach(b => b.addEventListener('click', () => grade(+b.dataset.grade)));
    $('#endBtn').addEventListener('click', () => session.results.length ? renderSummary() : (session = null, go('home')));

    keyHandler = e => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'h' || e.key === 'H') { e.preventDefault(); hint(); }
      else if (e.key === 'Enter' && !cur.revealed) { e.preventDefault(); reveal(); }
      else if (cur.revealed && ['1', '2', '3', '4'].includes(e.key)) { e.preventDefault(); grade(+e.key - 1); }
    };
    document.addEventListener('keydown', keyHandler);
  }

  function renderSummary() {
    cleanup();
    const res = session.results;
    const counts = [0, 0, 0, 0];
    res.forEach(r => counts[r.g]++);
    const time = res.reduce((a, r) => a + r.secs, 0);
    const unique = [...new Set(res.map(r => r.id))];
    app.innerHTML = `
      <section class="section">
        <div class="eyebrow">${esc(session.title)} complete</div>
        <h1>Well argued.</h1>
        <p class="muted">${res.length} attempt${res.length === 1 ? '' : 's'} in ${mmss(time)}. Readiness is now <b>${Math.round(readiness() * 100)}%</b>. Anything you marked "Again" will come back soon; everything else is spaced out further each time you get it right.</p>
        <div class="summary-grid">
          ${GRADES.map(x => `<div class="stat"><strong style="color:var(--${['again', 'hard', 'good', 'easy'][x.g]})">${counts[x.g]}</strong><span>${x.name}</span></div>`).join('')}
        </div>
        <div class="card">
          <ul class="result-list">
            ${unique.map(id => {
              const q = BY_ID[id];
              const last = res.filter(r => r.id === id).pop();
              return `<li><span><a href="#/q/${id}">${esc(q.title)}</a><br><small>${esc(TOPIC[q.topic].name)} · ${mmss(last.secs)} · ${last.hints} hint${last.hints === 1 ? '' : 's'}</small></span><span class="pill ${status(id)}">${GRADES[last.g].name}</span></li>`;
            }).join('')}
          </ul>
        </div>
        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-primary" id="again">Another session</button>
          <a class="btn" href="#/home">Back to home</a>
        </div>
      </section>`;
    session = null;
    $('#again').addEventListener('click', () => go('supervise'));
  }

  /* ───────────── Mock interview ───────────── */

  function buildMock(n) {
    // Interview 1: maths + mechanics (high-likelihood). Interview 2: physics/engineering breadth.
    const first = ['calculus', 'algebra', 'statics', 'dynamics', 'rotation', 'geometry', 'oscillations', 'probability'];
    const second = ['circuits', 'em', 'fluids', 'thermo', 'materials', 'estimation', 'dynamics', 'oscillations'];
    const rank = id => (card(id) ? cardScore(id) + 0.3 : 0) + Math.random() * 0.6; // prefer unseen/weak
    const pick = (topics, k, taken) => QB.filter(q => topics.includes(q.topic) && !taken.has(q.id) && q.topic !== 'personal')
      .sort((a, b) => rank(a.id) - rank(b.id))
      .reduce((acc, q) => { if (acc.length < k && !acc.some(x => BY_ID[x].topic === q.topic)) acc.push(q.id); return acc; }, []);
    const taken = new Set();
    const a = pick(first, Math.ceil(n / 2), taken); a.forEach(x => taken.add(x));
    const b = pick(second, Math.floor(n / 2), taken);
    return a.concat(b);
  }

  function renderMockIntro() {
    app.innerHTML = `
      <section class="section prose">
        <div class="eyebrow">Mock interview</div>
        <h1>The real thing, against the clock.</h1>
        <p>You'll get <b>${S.settings.mockCount} problems</b> in <b>${S.settings.mockMins} minutes</b>, split like a typical Cambridge Engineering interview: maths and mechanics first, then broader physics and engineering. There are no model answers until the end.</p>
        <ul>
          <li><b>Talk out loud.</b> Ideally have a friend or parent play interviewer, or record yourself. Write your working in the box as you go.</li>
          <li><b>Nudges are allowed</b>, just as an interviewer would give them, but each one is counted.</li>
          <li><b>Move on</b> when you think the interviewer would. Spending 20 minutes stuck on one problem is the most common way to lose a mock.</li>
          <li>Afterwards you'll review every problem with its model answer and grade yourself. Those grades feed your spaced-repetition schedule.</li>
        </ul>
        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-primary" id="startMock">Start the ${S.settings.mockMins}-minute interview</button>
          <a class="btn" href="#/method">Change length in settings</a>
        </div>
      </section>`;
    $('#startMock').addEventListener('click', () => {
      const ids = buildMock(S.settings.mockCount);
      mock = { ids, index: 0, start: Date.now(), limit: S.settings.mockMins * 60, per: ids.map(() => ({ hints: 0, secs: 0 })), qStart: Date.now(), done: false, graded: {} };
      renderMockCard();
    });
  }

  function mockRemaining() { return mock.limit - (Date.now() - mock.start) / 1000; }

  function finishMock() {
    if (mock.done) return;
    mock.per[mock.index].secs += (Date.now() - mock.qStart) / 1000;
    mock.done = true;
    mock.used = Math.min(mock.limit, (Date.now() - mock.start) / 1000);
    cleanup();
    go('review');
  }

  function renderMockCard() {
    cleanup();
    const id = mock.ids[mock.index];
    const q = BY_ID[id];
    const per = mock.per[mock.index];
    const half = Math.ceil(mock.ids.length / 2);
    const part = mock.index < half ? 'Interview 1 · Mathematics & Mechanics' : 'Interview 2 · Physics & Engineering';
    app.innerHTML = `
      <div class="mock-banner">
        <div><h3>${part}</h3><small>Problem ${mock.index + 1} of ${mock.ids.length} · nudges used: ${mock.per.reduce((a, p) => a + p.hints, 0)}</small></div>
        <div class="btn-row" style="align-items:center">
          <span class="timer" id="mtimer"><span class="dot"></span><span class="t"></span></span>
          <button class="btn btn-small" id="quitMock" style="background:transparent;color:inherit;border-color:rgba(255,255,255,.25)">End early</button>
        </div>
      </div>
      <div style="height:16px"></div>
      ${questionHTML(q, { hints: per.hints, revealed: false }, { mock: true, last: mock.index === mock.ids.length - 1 })}
    `;
    math(app);
    bindNotes(id);
    startTicker('mtimer', mockRemaining, 0, true, () => { toast("Time's up."); finishMock(); });

    const hint = () => { if (per.hints < q.hints.length) { per.hints++; renderMockCard(); } };
    const next = () => {
      if (mock.index >= mock.ids.length - 1) return finishMock();
      per.secs += (Date.now() - mock.qStart) / 1000;
      mock.index++;
      mock.qStart = Date.now();
      renderMockCard();
      window.scrollTo(0, 0);
    };
    $('#hintBtn').addEventListener('click', hint);
    $('#nextBtn').addEventListener('click', next);
    $('#quitMock').addEventListener('click', finishMock);
    keyHandler = e => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'h' || e.key === 'H') { e.preventDefault(); hint(); }
      else if (e.key === 'Enter') { e.preventDefault(); next(); }
    };
    document.addEventListener('keydown', keyHandler);
  }

  function renderMockReview() {
    const gradedAll = mock.ids.every(id => mock.graded[id] !== undefined);
    const score = gradedAll ? mock.ids.reduce((a, id, i) => a + mock.graded[id] - 0.25 * Math.min(2, mock.per[i].hints), 0) / (3 * mock.ids.length) : null;
    const verdict = s => s >= 0.8 ? 'Outstanding. That would impress any panel.' : s >= 0.6 ? 'Strong. Polish the problems you dropped and you are in offer territory.' : s >= 0.4 ? 'Promising. Drill your failures, then try another mock.' : 'Early days. Run daily supervisions for a week and come back.';
    app.innerHTML = `
      <section class="section">
        <div class="eyebrow">Mock interview review</div>
        <h1>${gradedAll ? `Score: ${Math.max(0, Math.round(score * 100))}%` : 'How did it go?'}</h1>
        <p class="muted">${gradedAll ? verdict(score) : `You used ${mmss(mock.used)} of ${mmss(mock.limit)}. Reveal each model answer, compare it with your working, and grade yourself. Nudges reduce your mock score, as they would weigh with an interviewer.`}</p>
        <div id="mockList"></div>
        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-primary" id="newMock">New mock interview</button>
          <a class="btn" href="#/home">Back to home</a>
        </div>
      </section>`;
    const list = $('#mockList');
    mock.ids.forEach((id, i) => {
      const q = BY_ID[id];
      const per = mock.per[i];
      const g = mock.graded[id];
      const wrap = document.createElement('div');
      wrap.className = 'card qcard';
      wrap.style.marginTop = '14px';
      wrap.innerHTML = `
        <div class="qmeta"><span class="pill">${esc(TOPIC[q.topic].name)}</span>${diffDots(q.diff)}<span class="pill">${mmss(per.secs)} · ${per.hints} nudge${per.hints === 1 ? '' : 's'}</span>${g !== undefined ? `<span class="pill ${status(id)}">Graded: ${GRADES[g].name}</span>` : ''}</div>
        <h2 class="qtitle">${esc(q.title)}</h2>
        <div class="qbody">${fmt(q.q)}</div>
        ${S.notes[id] ? `<div class="block follow" style="margin-top:14px"><span class="label">Your working</span><p style="white-space:pre-wrap">${esc(S.notes[id])}</p></div>` : ''}
        <details style="margin-top:14px" ${g === undefined ? '' : ''}><summary class="btn btn-small" style="list-style:none;display:inline-flex">Show model answer</summary>${solutionHTML(q)}</details>
        ${g === undefined ? gradeHTML({ hints: per.hints }) : ''}`;
      list.appendChild(wrap);
      $$('[data-grade]', wrap).forEach(b => b.addEventListener('click', () => {
        const gr = +b.dataset.grade;
        schedule(id, gr, per.secs, per.hints);
        mock.graded[id] = gr;
        renderMockReview();
      }));
    });
    math(app);
    $('#newMock').addEventListener('click', () => { mock = null; go('mock'); });
  }

  /* ───────────── Library ───────────── */

  const lib = { text: '', topic: '', diff: '', status: '' };

  function renderLibrary() {
    app.innerHTML = `
      <section class="section">
        <div class="eyebrow">Library</div>
        <h1>All ${QB.length} questions</h1>
        <p class="muted">Browse, search and practise any question on its own. Topics marked high likelihood come up most often in Cambridge Engineering interviews.</p>
        <div class="filters">
          <input type="search" id="fText" placeholder="Search questions…" value="${esc(lib.text)}" aria-label="Search">
          <select id="fTopic" aria-label="Topic"><option value="">All topics</option>${TOPICS.map(t => `<option value="${t.id}" ${lib.topic === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select>
          <select id="fDiff" aria-label="Difficulty"><option value="">Any difficulty</option>${[3, 4, 5].map(d => `<option value="${d}" ${lib.diff == d ? 'selected' : ''}>${DIFF_LABEL[d]}</option>`).join('')}</select>
          <select id="fStatus" aria-label="Status"><option value="">Any status</option>${Object.keys(STATUS_LABEL).map(s => `<option value="${s}" ${lib.status === s ? 'selected' : ''}>${STATUS_LABEL[s]}</option>`).join('')}</select>
        </div>
        <div class="qlist" id="qlist"></div>
      </section>`;
    const draw = () => {
      const txt = lib.text.toLowerCase();
      const rows = QB.filter(q =>
        (!lib.topic || q.topic === lib.topic) &&
        (!lib.diff || q.diff == lib.diff) &&
        (!lib.status || status(q.id) === lib.status) &&
        (!txt || (q.title + ' ' + q.q).toLowerCase().includes(txt)))
        .sort((a, b) => TOPICS.indexOf(TOPIC[a.topic]) - TOPICS.indexOf(TOPIC[b.topic]) || b.diff - a.diff);
      $('#qlist').innerHTML = rows.length ? rows.map(q => `
        <div class="qrow">
          <div>
            <h4>${esc(q.title)}</h4>
            <div class="sub"><span>${esc(TOPIC[q.topic].name)}</span>${diffDots(q.diff)}<span class="pill ${status(q.id)}">${STATUS_LABEL[status(q.id)]}</span>${card(q.id) ? `<span>next: ${card(q.id).due <= Date.now() ? 'due now' : new Date(card(q.id).due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>` : ''}</div>
          </div>
          <a class="btn btn-small" href="#/q/${q.id}">Practise</a>
        </div>`).join('') : `<div class="empty">No questions match those filters.</div>`;
    };
    draw();
    $('#fText').addEventListener('input', e => { lib.text = e.target.value; draw(); });
    $('#fTopic').addEventListener('change', e => { lib.topic = e.target.value; draw(); });
    $('#fDiff').addEventListener('change', e => { lib.diff = e.target.value; draw(); });
    $('#fStatus').addEventListener('change', e => { lib.status = e.target.value; draw(); });
  }

  /* ───────────── Method & settings ───────────── */

  function renderMethod() {
    app.innerHTML = `
      <section class="section prose">
        <div class="eyebrow">The method</div>
        <h1>How to use this to get the top score</h1>
        <p>Cambridge Engineering interviews aren't about knowing answers. They're about how you think when you meet a problem you've never seen: setting it up, reasoning aloud, taking a hint well, and checking your answer. This app trains exactly that, using the study techniques with the strongest evidence behind them.</p>

        <ol class="steps">
          <li><b>Attempt before you look (active recall).</b> Struggling with a problem first, even unsuccessfully, makes the solution stick far better than reading it. Give every problem a real go, roughly for the time shown.</li>
          <li><b>Think out loud, and write it down.</b> Use the working box as your whiteboard. Better still, say it out loud or have someone play the interviewer. Interviewers mark your reasoning, not just the final number.</li>
          <li><b>Take hints like interviewer nudges.</b> Hints are progressive, just like a real supervisor's prompts. Only take the next one when you're truly stuck. In the interview, using a nudge well is good. Here, needing one means the problem isn't mastered yet, so your best grade is capped.</li>
          <li><b>Compare, then grade honestly.</b> Read the model answer, the key insight, and the follow-up the interviewer would push you on. Then grade: <b>Again</b> (couldn't do it), <b>Hard</b> (with nudges), <b>Good</b> (solved it), <b>Easy</b> (solved it <i>and</i> the follow-up).</li>
          <li><b>Let spaced repetition schedule you.</b> Failed problems come back in the same session and again tomorrow. Solved problems come back after 1, 3, 8, 20… days. Spacing reviews just before you'd forget is the most efficient way to build long-term skill.</li>
          <li><b>Interleave topics.</b> Sessions mix topics on purpose. That's harder than doing ten of the same type, but it trains you to recognise which tool a problem needs, which is exactly the skill an interview tests.</li>
          <li><b>Do timed mocks every week.</b> Mocks build fluency under pressure and teach you to move on. Review every mock problem afterwards. That review is where most of the learning happens.</li>
        </ol>

        <h2>A plan that works</h2>
        <ul>
          <li><b>6+ weeks out:</b> one supervision a day (8 problems, about an hour). Go through every topic once.</li>
          <li><b>2–6 weeks out:</b> daily supervision, plus "Drill my failures" every other day. One mock a week.</li>
          <li><b>Final 2 weeks:</b> two mocks a week with someone playing interviewer. Keep reviews going daily. Re-read your personal statement and prepare to go two levels deeper on everything in it.</li>
          <li><b>Target:</b> 85%+ readiness and no "struggling" problems in high-likelihood topics.</li>
        </ul>

        <h2>On the day</h2>
        <ul>
          <li>Start talking within 20 seconds, even if it's "Let me draw this" or "I'll start with the simplest case".</li>
          <li>State your assumptions out loud: smooth, light, uniform, small angle, steady state.</li>
          <li>Sketch first: free-body diagrams, graphs, circuits.</li>
          <li>Check units, limiting cases ($\theta \to 0$, $m \to \infty$) and orders of magnitude.</li>
          <li>When given a hint, take it and run with it. Being teachable is exactly what they're testing.</li>
          <li>If you're stuck, say what you'd try and why. Silence is the only truly wrong answer.</li>
        </ul>

        <h2>Settings</h2>
        <div class="card settings">
          <div class="setting"><span>Questions per supervision</span>
            <select id="sSize">${[5, 8, 12, 16, 20].map(n => `<option ${S.settings.size === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
          <div class="setting"><span>Mock interview length</span>
            <select id="sMock">${[[20, 3], [30, 4], [45, 5], [60, 6]].map(([m, c]) => `<option value="${m}" ${S.settings.mockMins === m ? 'selected' : ''}>${m} min · ${c} problems</option>`).join('')}</select></div>
          <hr class="rule" style="margin:4px 0">
          <div class="setting"><span>Back up your progress (it's stored only in this browser)</span>
            <span class="btn-row"><button class="btn btn-small" id="exp">Export</button><label class="btn btn-small" style="cursor:pointer">Import<input type="file" id="imp" accept="application/json" hidden></label></span></div>
          <div class="setting"><span>Start again from scratch</span><button class="btn btn-small" id="reset" style="color:var(--again)">Reset all progress</button></div>
        </div>
      </section>`;
    math(app);
    $('#sSize').addEventListener('change', e => { S.settings.size = +e.target.value; save(); toast('Saved'); });
    $('#sMock').addEventListener('change', e => {
      const m = +e.target.value;
      S.settings.mockMins = m;
      S.settings.mockCount = { 20: 3, 30: 4, 45: 5, 60: 6 }[m];
      save(); toast('Saved');
    });
    $('#exp').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `supervision-progress-${today()}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    $('#imp').addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      f.text().then(txt => {
        const d = JSON.parse(txt);
        if (!d || typeof d.cards !== 'object') throw new Error('bad file');
        S = { ...defaults(), ...d, settings: { ...defaults().settings, ...(d.settings || {}) } };
        save(); toast('Progress imported'); renderMethod();
      }).catch(() => toast("That file couldn't be read."));
    });
    $('#reset').addEventListener('click', () => {
      if (confirm('Delete all progress, notes and settings? This cannot be undone.')) { S = defaults(); save(); toast('Progress reset'); go('home'); }
    });
  }

  /* ───────────── Theme ───────────── */

  const THEME_KEY = 'supervision.theme';
  function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
  try { applyTheme(localStorage.getItem(THEME_KEY)); } catch (e) { /* ignore */ }
  $('#themeToggle').addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
  });

  route();
})();
