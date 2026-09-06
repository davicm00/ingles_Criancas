/* ============================================================
   TRILHA DE INGLÊS — lógica do app
   Vanilla JS, sem dependências externas (além das fontes do
   Google Fonts no HTML). Progresso salvo no localStorage do
   navegador, então funciona 100% offline depois de carregado.
   ============================================================ */

const STORAGE_KEY = "iec_profiles_v1";
const AVATARS = ["🦊", "🐻", "🐼", "🐸", "🦁", "🐨", "🐵", "🐯", "🐰", "🐱"];
const TOTAL_DAYS = CURRICULUM.length;

const app = document.getElementById("app");

/* ---------- Persistência ---------- */

function loadProfiles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function newProfile(name, avatar, mode) {
  return {
    id: "p_" + Date.now(),
    name,
    avatar,
    mode, // 'alfa' | '1ano'
    currentDay: 1,
    stars: 0,
    streak: 0,
    lastCompletionDate: null,
    history: {}, // wordId -> { seen: n, wrong: n }
    badges: [],
  };
}

function saveProfile(updated) {
  const profiles = loadProfiles();
  const idx = profiles.findIndex((p) => p.id === updated.id);
  if (idx >= 0) profiles[idx] = updated;
  saveProfiles(profiles);
}

/* ---------- Áudio (Web Speech API) ---------- */

let voices = [];
function loadVoices() {
  voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
}
if (window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.82;
  utter.pitch = 1.05;
  const voice = voices.find((v) => v.lang && v.lang.startsWith(lang.slice(0, 2)));
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

const speakEN = (text) => speak(text, "en-US");
const speakPT = (text) => speak(text, "pt-BR");

/* ---------- Utilidades ---------- */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.round((d2 - d1) / 86400000);
}

function el(html) {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstElementChild;
}

/* ---------- Roteamento simples ---------- */

let currentProfile = null;

function render(view) {
  app.innerHTML = "";
  app.appendChild(view);
  window.scrollTo(0, 0);
}

function goProfileSelect() {
  currentProfile = null;
  render(renderProfileSelect());
}

function goHome(profile) {
  currentProfile = profile;
  render(renderHome(profile));
}

/* ---------- Tela: seleção de perfil ---------- */

function renderProfileSelect() {
  const profiles = loadProfiles();
  const wrap = el(`
    <section class="screen select-screen">
      <div class="brand">
        <span class="brand-mark">🗺️</span>
        <h1>Trilha de Inglês</h1>
        <p class="tagline">Um pouquinho de inglês, todos os dias.</p>
      </div>
      <div class="profile-grid" id="profile-grid"></div>
    </section>
  `);
  const grid = wrap.querySelector("#profile-grid");

  profiles.forEach((p) => {
    const card = el(`
      <button class="profile-card">
        <span class="profile-avatar">${p.avatar}</span>
        <span class="profile-name">${p.name}</span>
        <span class="profile-meta">${p.mode === "alfa" ? "Alfabetização" : "1º Ano"} · Dia ${Math.min(p.currentDay, TOTAL_DAYS)}/${TOTAL_DAYS}</span>
      </button>
    `);
    card.addEventListener("click", () => goHome(p));
    grid.appendChild(card);
  });

  const addCard = el(`
    <button class="profile-card profile-card--add">
      <span class="profile-avatar">➕</span>
      <span class="profile-name">Novo perfil</span>
    </button>
  `);
  addCard.addEventListener("click", () => render(renderNewProfile()));
  grid.appendChild(addCard);

  return wrap;
}

function renderNewProfile() {
  const wrap = el(`
    <section class="screen setup-screen">
      <button class="back-btn" id="back">← Voltar</button>
      <h2>Criar novo perfil</h2>

      <label class="field-label">Nome da criança</label>
      <input type="text" id="name-input" class="text-input" placeholder="Ex: Ana" maxlength="20" />

      <label class="field-label">Escolha um avatar</label>
      <div class="avatar-grid" id="avatar-grid"></div>

      <label class="field-label">Fase</label>
      <div class="mode-grid">
        <button class="mode-card" data-mode="alfa">
          <strong>Alfabetização</strong>
          <span>Foco em ouvir, falar e associar figuras — sem precisar ler em inglês.</span>
        </button>
        <button class="mode-card" data-mode="1ano">
          <strong>1º Ano</strong>
          <span>Inclui leitura das palavras e frases curtas em inglês.</span>
        </button>
      </div>

      <button class="primary-btn" id="create-btn" disabled>Criar perfil</button>
    </section>
  `);

  wrap.querySelector("#back").addEventListener("click", goProfileSelect);

  let chosenAvatar = null;
  let chosenMode = null;
  const avatarGrid = wrap.querySelector("#avatar-grid");
  AVATARS.forEach((a) => {
    const btn = el(`<button class="avatar-option">${a}</button>`);
    btn.addEventListener("click", () => {
      avatarGrid.querySelectorAll(".avatar-option").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      chosenAvatar = a;
      checkReady();
    });
    avatarGrid.appendChild(btn);
  });

  wrap.querySelectorAll(".mode-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      wrap.querySelectorAll(".mode-card").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      chosenMode = btn.dataset.mode;
      checkReady();
    });
  });

  const nameInput = wrap.querySelector("#name-input");
  const createBtn = wrap.querySelector("#create-btn");
  nameInput.addEventListener("input", checkReady);

  function checkReady() {
    createBtn.disabled = !(nameInput.value.trim() && chosenAvatar && chosenMode);
  }

  createBtn.addEventListener("click", () => {
    const profiles = loadProfiles();
    const p = newProfile(nameInput.value.trim(), chosenAvatar, chosenMode);
    profiles.push(p);
    saveProfiles(profiles);
    goHome(p);
  });

  return wrap;
}

/* ---------- Tela: trilha (home do perfil) ---------- */

function renderHome(profile) {
  const wrap = el(`
    <section class="screen home-screen">
      <header class="home-header">
        <button class="icon-btn" id="switch-profile" title="Trocar perfil">↩️</button>
        <div class="home-title">
          <span class="home-avatar">${profile.avatar}</span>
          <div>
            <h2>${profile.name}</h2>
            <span class="mode-tag">${profile.mode === "alfa" ? "Alfabetização" : "1º Ano"}</span>
          </div>
        </div>
        <div class="stats">
          <span class="stat">⭐ ${profile.stars}</span>
          <span class="stat">🔥 ${profile.streak}</span>
        </div>
      </header>

      <div class="trail" id="trail"></div>
    </section>
  `);

  wrap.querySelector("#switch-profile").addEventListener("click", goProfileSelect);

  const trail = wrap.querySelector("#trail");
  CURRICULUM.forEach((d) => {
    const state = d.day < profile.currentDay ? "done" : d.day === profile.currentDay ? "active" : "locked";
    const icon = d.type === "review" ? "🧩" : "📖";
    const node = el(`
      <button class="trail-node trail-node--${state}">
        <span class="trail-node-icon">${state === "done" ? "✅" : state === "locked" ? "🔒" : icon}</span>
        <span class="trail-node-day">Dia ${d.day}</span>
        <span class="trail-node-theme">${d.theme}</span>
      </button>
    `);
    if (state !== "locked") {
      node.addEventListener("click", () => render(renderLessonIntro(profile, d, state === "done")));
    }
    trail.appendChild(node);
  });

  return wrap;
}

/* ---------- Tela: introdução do dia ---------- */

function renderLessonIntro(profile, day, isReplay) {
  const wrap = el(`
    <section class="screen intro-screen">
      <button class="back-btn" id="back">← Voltar para a trilha</button>
      <div class="intro-card">
        <span class="intro-icon">${day.type === "review" ? "🧩" : "📖"}</span>
        <h2>Dia ${day.day}: ${day.theme}</h2>
        <p>${
          day.type === "review"
            ? "Vamos relembrar palavras dos dias anteriores!"
            : "Hoje vamos aprender palavras novas em inglês."
        }</p>
        ${isReplay ? '<p class="replay-note">Modo prática — não conta pontos de avanço, só estrelas extras. ⭐</p>' : ""}
        <button class="primary-btn" id="start-btn">Começar</button>
      </div>
    </section>
  `);
  wrap.querySelector("#back").addEventListener("click", () => goHome(profile));
  wrap.querySelector("#start-btn").addEventListener("click", () => {
    startLessonSession(profile, day, isReplay);
  });
  return wrap;
}

/* ---------- Sessão de lição ---------- */

function startLessonSession(profile, day, isReplay) {
  const session = {
    profile,
    day,
    isReplay,
    starsEarned: 0,
    steps: buildSteps(profile, day),
    stepIndex: 0,
  };
  runStep(session);
}

function buildSteps(profile, day) {
  const steps = [];

  if (day.type === "lesson") {
    steps.push({ kind: "flashcards", words: day.words });

    const listenWords = sample(day.words, Math.min(4, day.words.length));
    steps.push({ kind: "listen-choose", words: listenWords, pool: day.words });

    if (profile.mode === "1ano") {
      const readWords = sample(day.words, Math.min(3, day.words.length));
      steps.push({ kind: "read-match", words: readWords, pool: day.words });
    }

    steps.push({ kind: "speak", words: sample(day.words, Math.min(2, day.words.length)) });

    if (profile.mode === "1ano" && day.phrase) {
      steps.push({ kind: "phrase", phrase: day.phrase });
    }
  } else {
    const pool = wordsUpToDay(day.day);
    const weighted = weightedSample(pool, profile.history, Math.min(8, pool.length));
    steps.push({ kind: "listen-choose", words: weighted.slice(0, Math.ceil(weighted.length / 2)), pool });
    if (profile.mode === "1ano") {
      steps.push({ kind: "read-match", words: weighted.slice(Math.ceil(weighted.length / 2)), pool });
    }
  }

  steps.push({ kind: "result" });
  return steps;
}

/* Prioriza palavras com mais erros no histórico da criança */
function weightedSample(pool, history, n) {
  const scored = pool.map((w) => ({
    w,
    score: (history[w.id]?.wrong || 0) * 3 + Math.random(),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n).map((s) => s.w);
}

function runStep(session) {
  const step = session.steps[session.stepIndex];
  if (!step) return;

  const advance = () => {
    session.stepIndex++;
    runStep(session);
  };

  switch (step.kind) {
    case "flashcards":
      render(renderFlashcards(session, step, advance));
      break;
    case "listen-choose":
      render(renderChoiceActivity(session, step, advance, "listen"));
      break;
    case "read-match":
      render(renderChoiceActivity(session, step, advance, "read"));
      break;
    case "speak":
      render(renderSpeak(session, step, advance));
      break;
    case "phrase":
      render(renderPhrase(session, step, advance));
      break;
    case "result":
      render(renderResult(session));
      break;
  }
}

/* ---------- Atividade: flashcards ---------- */

function renderFlashcards(session, step, onDone) {
  let i = 0;
  const wrap = el(`
    <section class="screen activity-screen">
      <div class="progress-dots" id="dots"></div>
      <div class="flash-card" id="flash-card">
        <span class="flash-emoji" id="flash-emoji"></span>
        <span class="flash-en" id="flash-en"></span>
        <span class="flash-pt" id="flash-pt"></span>
      </div>
      <button class="primary-btn" id="next-btn">Ouvir e continuar</button>
    </section>
  `);
  renderDots(wrap.querySelector("#dots"), step.words.length, 0);

  function show(idx) {
    const w = step.words[idx];
    wrap.querySelector("#flash-emoji").textContent = w.emoji;
    wrap.querySelector("#flash-en").textContent = w.en;
    wrap.querySelector("#flash-pt").textContent = w.pt;
    renderDots(wrap.querySelector("#dots"), step.words.length, idx);
    speakEN(w.en);
    setTimeout(() => speakPT(w.pt), 900);
  }

  wrap.querySelector("#next-btn").addEventListener("click", () => {
    i++;
    if (i >= step.words.length) {
      onDone();
    } else {
      show(i);
    }
  });

  show(0);
  return wrap;
}

function renderDots(container, total, activeIdx) {
  container.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i <= activeIdx ? " dot--active" : "");
    container.appendChild(dot);
  }
}

/* ---------- Atividade: escolha (ouvir ou ler) ---------- */

function renderChoiceActivity(session, step, onDone, mode) {
  let i = 0;
  const title = mode === "listen" ? "Ouça e escolha" : "Leia e combine";

  const wrap = el(`
    <section class="screen activity-screen">
      <h3 class="activity-title">${title}</h3>
      <div class="progress-dots" id="dots"></div>
      <div class="prompt-area" id="prompt-area"></div>
      <div class="options-grid" id="options"></div>
    </section>
  `);

  function buildRound(idx) {
    const target = step.words[idx];
    const distractorPool = step.pool.filter((w) => w.id !== target.id);
    const options = shuffle([target, ...sample(distractorPool, Math.min(2, distractorPool.length))]);

    const promptArea = wrap.querySelector("#prompt-area");
    if (mode === "listen") {
      promptArea.innerHTML = `<button class="listen-btn" id="listen-btn">🔊 Ouvir</button>`;
      promptArea.querySelector("#listen-btn").addEventListener("click", () => speakEN(target.en));
      speakEN(target.en);
    } else {
      promptArea.innerHTML = `<span class="prompt-word">${target.en}</span>`;
    }

    const optionsEl = wrap.querySelector("#options");
    optionsEl.innerHTML = "";
    options.forEach((opt) => {
      const btn = el(`<button class="option-btn"><span>${opt.emoji}</span></button>`);
      btn.addEventListener("click", () => handleAnswer(opt, target, btn, optionsEl));
      optionsEl.appendChild(btn);
    });

    renderDots(wrap.querySelector("#dots"), step.words.length, idx);
  }

  function handleAnswer(chosen, target, btn, optionsEl) {
    optionsEl.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));
    recordHistory(session.profile, target.id, chosen.id === target.id);

    if (chosen.id === target.id) {
      btn.classList.add("correct");
      session.starsEarned += 1;
      speakEN("Great job!");
    } else {
      btn.classList.add("wrong");
      const correctBtn = [...optionsEl.querySelectorAll(".option-btn")].find((b) => b.textContent.trim() === target.emoji);
      if (correctBtn) correctBtn.classList.add("correct");
    }

    setTimeout(() => {
      i++;
      if (i >= step.words.length) {
        onDone();
      } else {
        buildRound(i);
      }
    }, 1100);
  }

  buildRound(0);
  return wrap;
}

function recordHistory(profile, wordId, wasCorrect) {
  if (!profile.history[wordId]) profile.history[wordId] = { seen: 0, wrong: 0 };
  profile.history[wordId].seen++;
  if (!wasCorrect) profile.history[wordId].wrong++;
}

/* ---------- Atividade: fala comigo ---------- */

function renderSpeak(session, step, onDone) {
  let i = 0;
  const wrap = el(`
    <section class="screen activity-screen">
      <h3 class="activity-title">Fala comigo!</h3>
      <div class="speak-card" id="speak-card">
        <span class="flash-emoji" id="speak-emoji"></span>
        <span class="flash-en" id="speak-en"></span>
      </div>
      <button class="secondary-btn" id="hear-again">🔊 Ouvir de novo</button>
      <button class="primary-btn" id="said-btn">🎤 Eu falei!</button>
    </section>
  `);

  function show(idx) {
    const w = step.words[idx];
    wrap.querySelector("#speak-emoji").textContent = w.emoji;
    wrap.querySelector("#speak-en").textContent = w.en;
    speakEN(w.en);
  }

  wrap.querySelector("#hear-again").addEventListener("click", () => speakEN(step.words[i].en));
  wrap.querySelector("#said-btn").addEventListener("click", () => {
    session.starsEarned += 1;
    i++;
    if (i >= step.words.length) {
      onDone();
    } else {
      show(i);
    }
  });

  show(0);
  return wrap;
}

/* ---------- Atividade: frase do dia ---------- */

function renderPhrase(session, step, onDone) {
  const wrap = el(`
    <section class="screen activity-screen">
      <h3 class="activity-title">Frase do dia</h3>
      <div class="phrase-card">
        <span class="phrase-en">${step.phrase.en}</span>
        <span class="phrase-pt">${step.phrase.pt}</span>
      </div>
      <button class="secondary-btn" id="hear-btn">🔊 Ouvir a frase</button>
      <button class="primary-btn" id="said-btn">🎤 Eu repeti!</button>
    </section>
  `);
  const speakBoth = () => {
    speakEN(step.phrase.en);
    setTimeout(() => speakPT(step.phrase.pt), 1600);
  };
  wrap.querySelector("#hear-btn").addEventListener("click", speakBoth);
  wrap.querySelector("#said-btn").addEventListener("click", () => {
    session.starsEarned += 1;
    onDone();
  });
  speakBoth();
  return wrap;
}

/* ---------- Resultado / avanço de progresso ---------- */

function renderResult(session) {
  const { profile, day, isReplay } = session;
  profile.stars += session.starsEarned;

  let streakMsg = "";
  if (!isReplay && day.day === profile.currentDay) {
    const last = profile.lastCompletionDate;
    const today = todayStr();
    if (last === today) {
      // já tinha completado hoje (não deveria ocorrer, guarda de segurança)
    } else if (last && daysBetween(last, today) === 1) {
      profile.streak += 1;
    } else {
      profile.streak = 1;
    }
    profile.lastCompletionDate = today;
    profile.currentDay = Math.min(profile.currentDay + 1, TOTAL_DAYS + 1);

    if ([5, 10, 15, 20, 24].includes(day.day) && !profile.badges.includes(day.day)) {
      profile.badges.push(day.day);
      streakMsg = "🏅 Você ganhou uma nova conquista!";
    }
  }

  saveProfile(profile);

  const finished = profile.currentDay > TOTAL_DAYS;

  const wrap = el(`
    <section class="screen result-screen">
      <span class="result-emoji">🎉</span>
      <h2>Muito bem, ${profile.name}!</h2>
      <p class="result-stars">⭐ +${session.starsEarned} estrelas</p>
      ${streakMsg ? `<p class="result-badge">${streakMsg}</p>` : ""}
      ${
        finished
          ? "<p>Você completou toda a trilha! Que orgulho — hora de comemorar. 🥳</p>"
          : "<p>Volte amanhã para o próximo dia da trilha!</p>"
      }
      <button class="primary-btn" id="back-home">Voltar para a trilha</button>
    </section>
  `);
  wrap.querySelector("#back-home").addEventListener("click", () => goHome(profile));
  return wrap;
}

/* ---------- Início ---------- */

goProfileSelect();
