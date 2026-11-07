const {
  THEMES,
  CUISINES,
  REGIONS,
  VIBES,
  PRICES,
  RESTAURANTS,
  UPDATES,
  UPDATE_CATEGORIES,
  makeSvgArt
} = window.SaboresData;

// Utilitários de escapamento e formatação
const esc = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const normalize = (str) =>
  String(str ?? "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("pt-BR");

const collator = new Intl.Collator("pt-BR", { sensitivity: "base" });

// Biblioteca de ícones SVG (mesmo traço limpo do Fliperama)
function icon(name) {
  const paths = {
    home: `<path d="m3 10.5 9-7.5 9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-4.5v-6h-6v6H4.5A1.5 1.5 0 0 1 3 19.5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>`,
    grid: `<rect x="3.5" y="3.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.9"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.9"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.9"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.9"/>`,
    heart: `<path d="M12 20.4 4.9 13.7a4.8 4.8 0 0 1 6.8-6.8L12 7.2l.3-.3a4.8 4.8 0 0 1 6.8 6.8z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>`,
    news: `<path d="M12 3l2.2 5.3L19.5 10l-5.3 2.2L12 17.5l-2.2-5.3L4.5 10l5.3-1.7zM18.5 16.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
    theme: `<rect x="3" y="4" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.9"/><rect class="theme-screen" x="5.5" y="6.5" width="13" height="8" rx="1"/><path d="M8 20h8M12 17v3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`,
    search: `<circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="m15.8 15.8 4.4 4.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`,
    expand: `<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
    settings: `<circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" fill="none" stroke="currentColor" stroke-width="1.75"/>`,
    map: `<path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 1 1 13 0C18.5 14.9 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><circle cx="12" cy="9.8" r="2.3" fill="none" stroke="currentColor" stroke-width="1.9"/>`,
    whatsapp: `<path d="M20.5 11.8a8.5 8.5 0 0 1-12.5 7.5L3.5 20.5l1.3-4.3a8.5 8.5 0 1 1 15.7-4.4z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M9.2 8.8c.2-.4.5-.4.8-.4h.6c.2 0 .5.1.6.4l.8 1.9c.1.2.1.5-.1.7l-.5.6c-.1.2-.2.3 0 .6.3.6 1 1.4 2 1.9.3.1.4.1.6-.1l.6-.7c.2-.2.4-.2.7-.1l1.8.9c.3.1.4.3.4.6 0 .6-.4 1.3-1 1.6-.6.3-1.4.4-2.5 0-2.5-.9-4.4-2.9-5.1-5-.4-1.1-.2-2 .3-2.9z" fill="currentColor"/>`,
    instagram: `<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>`,
    sparkle: `<path d="M12 3l2.2 5.3L19.5 10l-5.3 2.2L12 17.5l-2.2-5.3L4.5 10l5.3-1.7z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>`,
    thumb: `<path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zm2 9h7.3a2 2 0 0 0 1.9-1.5l1.5-6A2 2 0 0 0 17.8 10H13V5.5A2.5 2.5 0 0 0 10.5 3L9 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
    hide: `<path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A10.4 10.4 0 0 1 12 4.9c5.2 0 8.9 4.5 9.8 6.4.2.4.2.9 0 1.3a14 14 0 0 1-3.3 4.3M6.2 6.3A14.2 14.2 0 0 0 2.2 11.3c-.2.4-.2.9 0 1.3 1 1.9 4.6 6.5 9.8 6.5 1.9 0 3.6-.5 5.1-1.4" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/>`,
    arrow: `<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
    close: `<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`,
    check: `<path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    back: `<path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
    info: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    utensils: `<path d="M6 3v7a3 3 0 0 0 3 3v8M6 3v7M9 3v7M3 3v7a3 3 0 0 0 3 3M17 3c-2.5 3-3 7.5-3 11h3v7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
    clock: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M12 7v5l3.2 2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`,
    plus: `<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.sparkle}</svg>`;
}

// Estado persistente no navegador
const STORAGE_KEYS = {
  theme: "sabores.theme.v1",
  prefs: "sabores.prefs.v1",
  profile: "sabores.profile.v1",
  retired: "sabores.retired.v1",
  likes: "sabores.likes.v1",
  home: "sabores.home.v1",
  custom: "sabores.custom.v1"
};

function loadJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// Carrega catálogo base + sugestões adicionadas pelo usuário
function getCatalog() {
  const custom = loadJson(STORAGE_KEYS.custom, []);
  return [...custom, ...RESTAURANTS];
}

let catalog = getCatalog();
let lookup = new Map(catalog.map((r) => [r.id, r]));

function refreshCatalog() {
  catalog = getCatalog();
  lookup = new Map(catalog.map((r) => [r.id, r]));
}

let prefs = loadJson(STORAGE_KEYS.prefs, {
  favorites: [],
  recent: [],
  visits: {}
});

let profile = loadJson(STORAGE_KEYS.profile, null);
let retired = loadJson(STORAGE_KEYS.retired, []);
let likesState = loadJson(STORAGE_KEYS.likes, {
  visita: [],
  delivery: [],
  counts: {}
});

// Inicializa contadores base realistas de curtidas para cada restaurante
function getLikeCount(id, kind) {
  const r = lookup.get(id);
  const base = r ? Math.round(r.scoreCount * (kind === "visita" ? 0.18 : 0.11)) : 12;
  const userLiked = likesState[kind]?.includes(id) ? 1 : 0;
  return base + userLiked;
}

// Temas (Escuro Gourmet, Rústico da Serra, Bistrô Claro, Neon Bar)
function getThemeMeta(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

function nextThemeId(id) {
  const idx = THEMES.findIndex((t) => t.id === id);
  return THEMES[(idx + 1) % THEMES.length].id;
}

function themeButtonLabels(id) {
  const cur = getThemeMeta(id).name;
  const nxt = getThemeMeta(nextThemeId(id)).name;
  return {
    label: `Trocar estilo. Atual: ${cur}. Próximo: ${nxt}`,
    title: `Estilo: ${cur} · clique para ${nxt}`
  };
}

function applyTheme(id) {
  const meta = getThemeMeta(id);
  const root = document.documentElement;
  root.dataset.theme = meta.id;
  root.style.colorScheme = meta.scheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", meta.color);
  try {
    window.localStorage.setItem(STORAGE_KEYS.theme, meta.id);
  } catch {}
}

let currentTheme = (() => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEYS.theme);
    return THEMES.some((t) => t.id === saved) ? saved : "escuro";
  } catch {
    return "escuro";
  }
})();

// Classificação e etiquetas de gosto (usadas no Onboarding e no Motor "Para você")
function matchesStyle(item, styleId) {
  if (styleId in CUISINES) return item.cuisine === styleId;
  if (styleId in REGIONS) return item.region === styleId;
  if (styleId in VIBES) return item.vibes.includes(styleId);
  if (styleId in PRICES) return item.price === styleId;
  return false;
}

function styleLabel(styleId) {
  if (styleId in CUISINES) return CUISINES[styleId];
  if (styleId in REGIONS) return REGIONS[styleId].title;
  if (styleId in VIBES) return VIBES[styleId];
  if (styleId in PRICES) return PRICES[styleId];
  return styleId;
}

function reasonForStyle(styleId) {
  if (styleId in CUISINES) return `Porque você gosta de ${CUISINES[styleId]}`;
  if (styleId in REGIONS) return `Na região de ${REGIONS[styleId].title}`;
  if (styleId === "familia") return "Excelente para ir em família";
  if (styleId === "casal") return "Clima perfeito para ir a dois";
  if (styleId === "amigos") return "Ótimo para reunir os amigos";
  if (styleId === "natureza") return "Ao ar livre e em contato com a natureza";
  if (styleId === "delivery") return "Forte no delivery em Araçoiaba";
  if (styleId === "$") return "Bom, farto e econômico ($)";
  return `Combina com ${styleLabel(styleId)}`;
}

function getOnboardingGroups() {
  return [
    {
      id: "cuisine",
      title: "O que você mais gosta de comer?",
      options: Object.entries(CUISINES).map(([id, label]) => ({ id, label }))
    },
    {
      id: "region",
      title: "Quais regiões de Araçoiaba você mais frequenta?",
      options: Object.values(REGIONS).map((r) => ({ id: r.id, label: r.title }))
    },
    {
      id: "vibe",
      title: "Qual é o seu jeito de sair ou pedir?",
      options: Object.entries(VIBES).map(([id, label]) => ({ id, label }))
    }
  ];
}

// Motor de Recomendação ("Para você") idêntico à lógica do Fliperama
const WEIGHTS = {
  pick: 3.0,
  favorite: 3.2,
  like: 2.6,
  visited: 1.5,
  sameCuisine: 2.2,
  sameRegion: 1.1,
  sharedVibe: 0.9,
  seedScale: 3.8,
  style: 1.6,
  highScore: 1.3,
  curated: 0.8,
  repeatCuisine: 1.35,
  repeatRegion: 0.45
};

function similarity(a, b) {
  if (a.id === b.id) return 0;
  const sharedVibes = a.vibes.filter((v) => b.vibes.includes(v)).length;
  return (
    (a.cuisine === b.cuisine ? WEIGHTS.sameCuisine : 0) +
    (a.region === b.region ? WEIGHTS.sameRegion : 0) +
    Math.min(2, sharedVibes) * WEIGHTS.sharedVibe
  );
}

function collectSeeds() {
  const seeds = new Map();
  const retiredSet = new Set(retired);
  const add = (id, weight, verb) => {
    const item = lookup.get(id);
    if (!item || retiredSet.has(id)) return;
    const prev = seeds.get(id);
    if (!prev || weight > prev.weight) seeds.set(id, { item, weight, verb });
  };
  for (const id of profile?.games ?? []) add(id, WEIGHTS.pick, "curtiu");
  for (const id of prefs.favorites) add(id, WEIGHTS.favorite, "favoritou");
  for (const id of [...(likesState.visita ?? []), ...(likesState.delivery ?? [])]) {
    add(id, WEIGHTS.like, "recomendou");
  }
  for (const id of prefs.recent) add(id, WEIGHTS.visited, "visitou");
  return seeds;
}

function buildRecommendations(limit = 9) {
  const seeds = collectSeeds();
  const retiredSet = new Set(retired);
  const styles = profile?.styles ?? [];

  const candidates = catalog
    .filter((item) => !retiredSet.has(item.id))
    .map((item) => {
      const factors = [];

      for (const seed of seeds.values()) {
        if (seed.item.id === item.id) continue;
        const sim = similarity(item, seed.item);
        if (sim > 0) {
          factors.push({
            kind: "seed",
            points: (seed.weight * sim) / WEIGHTS.seedScale,
            text: `Porque você ${seed.verb} ${seed.item.title}`,
            seedId: seed.item.id
          });
        }
      }

      for (const st of styles) {
        if (matchesStyle(item, st)) {
          factors.push({
            kind: "style",
            points: WEIGHTS.style,
            text: reasonForStyle(st),
            style: st
          });
        }
      }

      if (item.score >= 4.7) {
        factors.push({
          kind: "popular",
          points: WEIGHTS.highScore * ((item.score - 4.3) / 0.6),
          text: `Nota ${item.score.toFixed(1).replace(".", ",")} em Araçoiaba (${item.scoreCount} avaliações)`
        });
      }

      if (item.curated) {
        factors.push({
          kind: "curated",
          points: WEIGHTS.curated,
          text: "Seleção EncontraAqui"
        });
      }

      const sortedFactors = [...factors].sort((a, b) => b.points - a.points);
      const topReason = sortedFactors[0] ?? {
        kind: "discover",
        points: 0.2,
        text: "Para descobrir em Araçoiaba"
      };

      const totalScore = factors.reduce((acc, f) => acc + f.points, 0) + (item.score - 4.4);
      return {
        item,
        factors,
        score: totalScore,
        reason: topReason
      };
    });

  const selected = [];
  const pool = [...candidates];

  while (selected.length < limit && pool.length > 0) {
    const effectiveScore = (cand) => {
      const sameCuisineCount = selected.filter((s) => s.item.cuisine === cand.item.cuisine).length;
      const sameRegionCount = selected.filter((s) => s.item.region === cand.item.region).length;
      return (
        cand.score -
        sameCuisineCount * WEIGHTS.repeatCuisine -
        sameRegionCount * WEIGHTS.repeatRegion
      );
    };

    let bestIdx = 0;
    let bestVal = effectiveScore(pool[0]);
    for (let i = 1; i < pool.length; i++) {
      const val = effectiveScore(pool[i]);
      if (val > bestVal + 1e-6) {
        bestIdx = i;
        bestVal = val;
      }
    }
    selected.push(pool.splice(bestIdx, 1)[0]);
  }

  return selected;
}

// Renderização de Estrelas e Notas (igual ao Fliperama)
function renderStarsInline(item, cls = "tile-score") {
  if (!item.score) return "";
  const formatted = item.score.toFixed(1).replace(".", ",");
  return `<span class="${cls}">★ ${formatted}</span>`;
}

function renderPanelScore(item) {
  if (!item.score) return "";
  const pct = Math.min(100, Math.max(0, Math.round((item.score / 5) * 100)));
  const formatted = item.score.toFixed(1).replace(".", ",");
  return `<p class="panel-score">
    <span class="stars" style="--fill:${pct}%" aria-hidden="true"></span>
    <strong>${formatted}</strong>
    <span>de 5 (${item.scoreCount} avaliações no <a href="${esc(item.mapsUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.scoreSource)}</a>)</span>
  </p>`;
}

// Imagens com fallback automático para Poster SVG caso sem internet
function getArt(item) {
  const fallbackCover = makeSvgArt(item, "cover");
  const fallbackShot = makeSvgArt(item, "shot");
  return {
    cover: item.coverPhoto || fallbackCover,
    fallbackCover,
    shot: item.shotPhoto || fallbackShot,
    fallbackShot,
    coverLabel: CUISINES[item.cuisine] || "Especialidade",
    shotLabel: item.dish
  };
}

function renderImg(src, fallback, alt, cls = "", eager = false) {
  return `<img${cls ? ` class="${esc(cls)}"` : ""} src="${esc(src)}" data-fallback="${esc(fallback)}" alt="${esc(alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async" />`;
}

function renderNiche(item, extraHtml = "", eager = false) {
  const art = getArt(item);
  return `<span class="niche" style="--niche: url(&quot;${esc(art.cover)}&quot;)">
    ${extraHtml}
    ${renderImg(art.cover, art.fallbackCover, `${item.title} · ${ item.subtitle }`, "", eager)}
  </span>`;
}

function renderSysChip(item) {
  return `<span class="chip sys">${esc(REGIONS[item.region]?.short || "Araçoiaba")}</span>`;
}

function renderRetireBtn(item, cls = "tile-retire", focusable = true) {
  const label = `Não mostrar em Para você: ${item.title}`;
  return `<button type="button" class="${cls}" data-retire="${esc(item.id)}" tabindex="${focusable ? "0" : "-1"}" aria-label="${esc(label)}" title="Não mostrar em Para você (X)">${icon("hide")}</button>`;
}

function renderTile(item, opts = {}) {
  const scoreHtml = renderStarsInline(item, "tile-score");
  const chipHtml = opts.chip === false ? "" : renderSysChip(item);
  const priceBadge = `<span class="chip vid" aria-hidden="true">${esc(item.price)} · ${esc(CUISINES[item.cuisine]?.split(" ")[0] || "")}</span>`;
  const btn = `<button type="button" class="tile" data-open="${esc(item.id)}" tabindex="${opts.focusable ? "0" : "-1"}" aria-label="${esc(`${item.title} · ${opts.line}`)}">
    ${renderNiche(item, chipHtml + priceBadge, opts.eager)}
    <span class="tile-text" aria-hidden="true">
      <span class="tile-title">${esc(item.title)}</span>
      <span class="tile-line${opts.reason ? " reason" : ""}">${esc(opts.line)}</span>
      ${scoreHtml}
    </span>
  </button>`;
  return opts.retire
    ? `<div class="tile-slot${opts.arrived ? " arrived" : ""}">${btn}${renderRetireBtn(item, "tile-retire", opts.focusable)}</div>`
    : btn;
}

function renderWhy(reason, seedItem) {
  if (!reason || reason.kind === "discover") return "";
  const text = esc(reason.text);
  const seedTitle = seedItem ? esc(seedItem.title) : "";
  const formatted =
    seedItem && text.endsWith(seedTitle)
      ? `${text.slice(0, -seedTitle.length)}<em>${seedTitle}</em>`
      : text;
  const thumb = seedItem
    ? renderImg(getArt(seedItem).cover, getArt(seedItem).fallbackCover, "", "why-thumb")
    : icon(reason.kind === "popular" ? "thumb" : "sparkle");
  return `<p class="why">${thumb}<span>${formatted}</span></p>`;
}

// Botões de Ação (Como chegar, WhatsApp, Cardápio/Instagram)
function renderPrimaryActions(item, compact = false) {
  const mapsBtn = `<a class="play-button" href="${esc(item.mapsUrl)}" target="_blank" rel="noopener noreferrer" data-visit="${esc(item.id)}">${icon("map")}<span>Como chegar</span></a>`;
  const waText = encodeURIComponent(
    `Olá! Vi o *${item.title}* no EncontraAqui de Araçoiaba da Serra e gostaria de saber mais sobre horários/cardápio.`
  );
  const waUrl = `https://wa.me/${item.phone}?text=${waText}`;
  const waBtn = `<a class="quick-button" href="${esc(waUrl)}" target="_blank" rel="noopener noreferrer" data-visit="${esc(item.id)}">${icon("whatsapp")}<span>${compact ? "WhatsApp" : "WhatsApp / Reserva"}</span></a>`;
  return `${mapsBtn}${waBtn}`;
}

// Renderização do Spotlight Hero (Em destaque 1 de 9)
function renderSpotlight(rec, state) {
  const { item, reason } = rec;
  const art = getArt(item);
  const isFav = prefs.favorites.includes(item.id);
  const isLong = item.title.length > 22 ? " long" : "";
  const seedItem = reason.seedId ? lookup.get(reason.seedId) : null;

  return `<section class="spotlight inline${state.arrived.includes(item.id) ? " arrived" : ""}" aria-labelledby="hero-title" data-hero="${esc(item.id)}" style="--game-accent:${esc(item.accent)}">
    <div class="hero-glow" aria-hidden="true" style="background-image:url(&quot;${esc(art.cover)}&quot;)"></div>
    <figure class="hero-shot">
      ${renderImg(art.shot, art.fallbackShot, `${item.dish} · ${item.title}`, "", true)}
      <figcaption class="chip">${icon("utensils")} ${esc(item.dish)}</figcaption>
    </figure>
    <div class="wrap hero-grid">
      <figure class="boxart">
        ${renderImg(art.cover, art.fallbackCover, item.title, "", true)}
        <figcaption class="caption">${esc(REGIONS[item.region]?.title || "Araçoiaba da Serra")}</figcaption>
      </figure>
      <div class="hero-text">
        <div class="hero-head">
          <p class="kicker">Em destaque <span>1 de ${state.recs.length}</span></p>
          <h3 id="hero-title" class="spot-title${isLong}">${esc(item.title)}</h3>
          <p class="meta">
            <span>${esc(REGIONS[item.region]?.title)}</span>
            <b aria-hidden="true">·</b>
            <span>${esc(CUISINES[item.cuisine])}</span>
            <b aria-hidden="true">·</b>
            <span>${esc(item.price)}</span>
            <b aria-hidden="true">·</b>
            ${renderStarsInline(item, "hero-score")}
          </p>
        </div>
        <div class="hero-rest">
          ${renderWhy(reason, seedItem)}
          <p class="lede hero-lede">${esc(item.description)}</p>
          <div class="actions">
            ${renderPrimaryActions(item)}
            <button class="icon-only fav-button${isFav ? " is-favorite" : ""}" type="button" data-favorite="${esc(item.id)}" aria-pressed="${isFav}" aria-label="${isFav ? "Remover dos" : "Adicionar aos"} favoritos: ${esc(item.title)}">${icon("heart")}</button>
            ${renderRetireBtn(item, "icon-only retire-button")}
            <button class="textlink" type="button" data-open="${esc(item.id)}">Detalhes ${icon("arrow")}</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// Seção "Meus lugares" (Recentes, Recomendados por você, Favoritos)
const MINE_LABELS = {
  recentes: "Visitados",
  curtidos: "Que você curtiu",
  favoritos: "Favoritos"
};

const MINE_SUBTITLES = {
  recentes: "Os últimos lugares que você abriu ou traçou rota",
  curtidos: "Lugares que você marcou com Vale a visita ou Delivery",
  favoritos: "Sua lista salva para o próximo passeio em Araçoiaba"
};

let activeMineTab = loadJson(STORAGE_KEYS.home, { mine: null })?.mine || null;

function getMineLists() {
  const recientes = prefs.recent.filter((id) => lookup.has(id));
  const curtidos = [
    ...new Set([...(likesState.visita ?? []), ...(likesState.delivery ?? [])])
  ].filter((id) => lookup.has(id));
  const favoritos = [...prefs.favorites].reverse().filter((id) => lookup.has(id));
  return { recentes: recientes, curtidos, favoritos };
}

function renderMineSection() {
  const lists = getMineLists();
  const availableTabs = Object.keys(MINE_LABELS).filter((k) => lists[k].length > 0);
  if (!availableTabs.length) return "";
  const tab = availableTabs.includes(activeMineTab) ? activeMineTab : availableTabs[0];
  activeMineTab = tab;

  const items = lists[tab].slice(0, 8).map((id) => lookup.get(id)).filter(Boolean);
  const cardsHtml = items
    .map((item, idx) => {
      const subline =
        tab === "favoritos"
          ? `${REGIONS[item.region]?.short} · ${item.dish}`
          : `${CUISINES[item.cuisine]} · ${item.distance}`;
      const badge = `<span class="mine-go" aria-hidden="true">${icon("map")}Rota</span>`;
      return `<div class="tile-slot mine-slot">
        <a class="tile mine-tile" href="${esc(item.mapsUrl)}" target="_blank" rel="noopener noreferrer" data-visit="${esc(item.id)}" tabindex="${idx === 0 ? "0" : "-1"}">
          ${renderNiche(item, renderSysChip(item) + badge, idx < 4)}
          <span class="tile-text" aria-hidden="true">
            <span class="tile-title">${esc(item.title)}</span>
            <span class="tile-line">${esc(subline)}</span>
            ${renderStarsInline(item, "tile-score")}
          </span>
        </a>
        <button type="button" class="tile-more" data-open="${esc(item.id)}" aria-label="Detalhes de ${esc(item.title)}" title="Detalhes">${icon("info")}</button>
      </div>`;
    })
    .join("");

  const tabsHtml =
    availableTabs.length > 1
      ? `<div class="mine-tabs" role="group" aria-label="Mostrar em Meus lugares">
          ${availableTabs
            .map(
              (t) =>
                `<button type="button" class="mine-tab" data-mine-tab="${t}" aria-pressed="${t === tab}">${MINE_LABELS[t]}</button>`
            )
            .join("")}
        </div>`
      : "";

  const moreFavs =
    tab === "favoritos" && lists.favoritos.length > 8
      ? `<a class="textlink section-more" href="#favoritos">Ver os ${lists.favoritos.length} favoritos ${icon("arrow")}</a>`
      : "";

  return `<section class="section mine" id="mine" aria-labelledby="mine-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="mine-title">Meus lugares</h2>
        <p>${MINE_SUBTITLES[tab]}</p>
        ${tabsHtml}
        ${moreFavs}
      </div>
      <div class="grid mine-grid" data-grid="mine">${cardsHtml}</div>
    </div>
  </section>`;
}

// Seção de Roteiros & Novidades na Home
const shortDateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
  timeZone: "UTC"
});

const fullDateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});

function renderNewsSection() {
  const top3 = UPDATES.slice(0, 3);
  const cards = top3
    .map((entry) => {
      const linked = entry.restaurantIds
        .map((id) => lookup.get(id))
        .filter(Boolean)
        .slice(0, 4);
      const thumbs = linked.length
        ? `<div class="news-games">
            ${linked
              .map(
                (r) =>
                  `<button type="button" class="news-game" data-open="${esc(r.id)}" aria-label="Ver ${esc(r.title)}" title="${esc(r.title)}">${renderImg(getArt(r).cover, getArt(r).fallbackCover, "")}</button>`
              )
              .join("")}
          </div>`
        : "";
      const d = new Date(`${entry.date}T12:00:00Z`);
      const catIcon =
        entry.category === "games" ? "utensils" : entry.category === "fixes" ? "check" : "sparkle";
      return `<article class="news-card" aria-labelledby="news-${esc(entry.id)}">
        <p class="news-meta">
          <span class="update-category category-${esc(entry.category)}">${icon(catIcon)}${esc(UPDATE_CATEGORIES[entry.category])}</span>
          <time datetime="${esc(entry.date)}">${esc(shortDateFmt.format(d))}</time>
        </p>
        <h3 id="news-${esc(entry.id)}">${esc(entry.title)}</h3>
        <p class="news-text">${esc(entry.description)}</p>
        ${thumbs}
      </article>`;
    })
    .join("");

  return `<section class="section news" id="news" aria-labelledby="news-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="news-title">Roteiros & Destaques</h2>
        <p>Sugestões para curtir Araçoiaba da Serra</p>
        <a class="textlink section-more" href="#atualizacoes">Ver todos ${icon("arrow")}</a>
      </div>
      <div class="news-list">${cards}</div>
    </div>
  </section>`;
}

// Seção "Para você" + CTA Final na Home
function renderForYouSection(state) {
  const [first, ...rest] = state.recs;
  const gridHtml = rest.length
    ? `<div class="wrap">
        <div class="grid home-grid" data-grid="home">
          ${rest
            .map((rec, i) =>
              renderTile(rec.item, {
                line: rec.reason.text,
                reason: true,
                focusable: i === 0,
                eager: i < 4,
                retire: true,
                arrived: state.arrived.includes(rec.item.id)
              })
            )
            .join("")}
        </div>
      </div>`
    : "";

  const bodyHtml = first
    ? `${renderSpotlight(first, state)}${gridHtml}`
    : retired.length
      ? `<div class="wrap empty">
          <p class="empty-title">Você ocultou todos os lugares de Para você.</p>
          <p>Restaure alguns em Ajustes ou explore o catálogo completo.</p>
          <div class="actions"><button class="secondary-button" type="button" data-action="settings">Ver ocultados</button></div>
        </div>`
      : `<div class="wrap empty"><p class="empty-title">Nenhuma recomendação por aqui.</p></div>`;

  const tastesList = (profile?.styles ?? []).map(styleLabel);
  const tasteCopy =
    profile?.status === "done" && tastesList.length
      ? `Seus gostos: ${esc(tastesList.join(", "))} · <button type="button" data-action="onboarding">Refazer</button>`
      : `Conte o que você gosta de comer e a home fica com a sua cara · <button type="button" data-action="onboarding">Escolher meus gostos</button>`;

  return `<section class="foryou" aria-labelledby="foryou-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="foryou-title">Para você</h2>
          <p>Recomendações em Araçoiaba da Serra pelo que você curte</p>
        </div>
      </div>
      ${bodyHtml}
    </section>
    <div class="all-cta">
      <div class="actions">
        <a class="all-button" href="#todos">Ver todos os ${catalog.length} lugares ${icon("arrow")}</a>
        <button class="secondary-button" type="button" data-action="surprise">${icon("sparkle")}<span>Escolher por mim hoje</span></button>
      </div>
      <p>${tasteCopy}</p>
    </div>`;
}

// Estado de Busca e Filtros em "Todos os lugares" (#todos) e "Favoritos" (#favoritos)
const FILTER_GROUPS = {
  cuisine: {
    label: "Culinária",
    tags: Object.entries(CUISINES).map(([id, label]) => ({ id, label, title: label }))
  },
  region: {
    label: "Bairro / Região",
    tags: Object.values(REGIONS).map((r) => ({ id: r.id, label: r.short, title: r.title }))
  },
  vibe: {
    label: "Ocasião",
    tags: Object.entries(VIBES).map(([id, label]) => ({ id, label, title: label }))
  },
  price: {
    label: "Faixa",
    tags: Object.entries(PRICES).map(([id, label]) => ({ id, label, title: label }))
  }
};

let rosterState = {
  query: "",
  tags: { cuisine: [], region: [], vibe: [], price: [] },
  favorites: false,
  sort: "selecao",
  filtersOpen: false
};

function matchesRosterItem(item, state, ignoreGroup = null) {
  if (state.favorites && !prefs.favorites.includes(item.id)) return false;
  if (state.query.trim()) {
    const q = normalize(state.query.trim());
    const haystack = normalize(
      `${item.title} ${item.subtitle} ${item.dish} ${item.address} ${CUISINES[item.cuisine]} ${REGIONS[item.region]?.title}`
    );
    if (!haystack.includes(q)) return false;
  }
  if (ignoreGroup !== "cuisine" && state.tags.cuisine.length > 0) {
    if (!state.tags.cuisine.includes(item.cuisine)) return false;
  }
  if (ignoreGroup !== "region" && state.tags.region.length > 0) {
    if (!state.tags.region.includes(item.region)) return false;
  }
  if (ignoreGroup !== "vibe" && state.tags.vibe.length > 0) {
    if (!state.tags.vibe.some((v) => item.vibes.includes(v))) return false;
  }
  if (ignoreGroup !== "price" && state.tags.price.length > 0) {
    if (!state.tags.price.includes(item.price)) return false;
  }
  return true;
}

function computeTagCounts() {
  const counts = new Map();
  for (const [groupKey, group] of Object.entries(FILTER_GROUPS)) {
    const baseItems = catalog.filter((item) => matchesRosterItem(item, rosterState, groupKey));
    for (const tag of group.tags) {
      let c = 0;
      for (const item of baseItems) {
        if (groupKey === "cuisine" && item.cuisine === tag.id) c++;
        else if (groupKey === "region" && item.region === tag.id) c++;
        else if (groupKey === "vibe" && item.vibes.includes(tag.id)) c++;
        else if (groupKey === "price" && item.price === tag.id) c++;
      }
      counts.set(`${groupKey}:${tag.id}`, c);
    }
  }
  return counts;
}

function getFilteredRoster() {
  const filtered = catalog.filter((item) => matchesRosterItem(item, rosterState));
  const sorted = [...filtered];
  if (rosterState.sort === "nota") {
    sorted.sort((a, b) => b.score - a.score || b.scoreCount - a.scoreCount);
  } else if (rosterState.sort === "avaliacoes") {
    sorted.sort((a, b) => b.scoreCount - a.scoreCount || b.score - a.score);
  } else if (rosterState.sort === "az") {
    sorted.sort((a, b) => collator.compare(a.title, b.title));
  } else if (rosterState.sort === "preco") {
    sorted.sort((a, b) => a.price.length - b.price.length || b.score - a.score);
  } else {
    sorted.sort((a, b) => Number(b.curated) - Number(a.curated) || b.score - a.score);
  }
  return sorted;
}

function activeFilterCount() {
  return (
    rosterState.tags.cuisine.length +
    rosterState.tags.region.length +
    rosterState.tags.vibe.length +
    rosterState.tags.price.length
  );
}

function renderRosterShell() {
  const counts = computeTagCounts();
  const fCount = activeFilterCount();
  const rows = [
    ["cuisine"],
    ["region", "price"],
    ["vibe"]
  ];

  const tagRowsHtml = rows
    .map(
      (rowGroups) =>
        `<div class="tag-row">
          ${rowGroups
            .map((gKey) => {
              const group = FILTER_GROUPS[gKey];
              const buttons = group.tags
                .map((t) => {
                  const key = `${gKey}:${t.id}`;
                  const active = rosterState.tags[gKey].includes(t.id);
                  const count = counts.get(key) ?? 0;
                  return `<button type="button" class="tag" data-tag="${esc(key)}" aria-pressed="${active}" title="${esc(t.title)}"${!active && count === 0 ? " disabled" : ""}>
                    ${esc(t.label)}<span class="tag-count" data-count>${count}</span>
                  </button>`;
                })
                .join("");
              return `<div class="tag-group" role="group" aria-labelledby="tags-${gKey}">
                <span class="tag-label" id="tags-${gKey}">${esc(group.label)}</span>
                <div class="tag-list">${buttons}</div>
              </div>`;
            })
            .join("")}
        </div>`
    )
    .join("");

  return `<section class="roster wrap" aria-labelledby="roster-title">
    <header class="roster-head">
      <h1 id="roster-title">${rosterState.favorites ? "Favoritos" : "Todos os lugares"} <span class="count" id="roster-count"></span></h1>
      <div class="roster-tools">
        <label class="search">
          ${icon("search")}
          <span class="sr-only">Buscar restaurante, prato ou bairro</span>
          <input id="search" type="search" placeholder="Buscar restaurante, prato (ex: tilápia, costela) ou bairro..." value="${esc(rosterState.query)}" autocomplete="off" />
          <kbd aria-hidden="true">/</kbd>
        </label>
        <button class="filter-toggle" type="button" data-action="toggle-filters" aria-expanded="${rosterState.filtersOpen}" aria-controls="roster-filters">
          ${icon("settings")}<span>Filtros${fCount ? ` (${fCount})` : ""}</span>
        </button>
      </div>
      <div class="filters${rosterState.filtersOpen ? " open" : ""}" id="roster-filters">
        <div class="tag-rows" id="roster-tags" aria-label="Filtrar por etiquetas">${tagRowsHtml}</div>
        <div class="roster-extras">
          <button class="pill-toggle" type="button" data-action="toggle-favorites" aria-pressed="${rosterState.favorites}">
            ${icon("heart")}<span>Favoritos</span>
          </button>
          <label class="pill-select sort">
            <span class="sort-label">Ordem</span>
            <select data-filter="sort">
              <option value="selecao"${rosterState.sort === "selecao" ? " selected" : ""}>Seleção EncontraAqui</option>
              <option value="nota"${rosterState.sort === "nota" ? " selected" : ""}>Maior nota (Google)</option>
              <option value="avaliacoes"${rosterState.sort === "avaliacoes" ? " selected" : ""}>Mais avaliados</option>
              <option value="preco"${rosterState.sort === "preco" ? " selected" : ""}>Menor preço ($)</option>
              <option value="az"${rosterState.sort === "az" ? " selected" : ""}>Nome: A–Z</option>
            </select>
          </label>
          <button class="pill-toggle" type="button" data-action="feedback">
            ${icon("plus")}<span>Indicar lugar</span>
          </button>
        </div>
      </div>
    </header>
    <p class="result-line" id="roster-status" role="status" aria-live="polite"></p>
    <div id="roster-results"></div>
  </section>`;
}

function updateRosterResults() {
  const items = getFilteredRoster();
  const counts = computeTagCounts();
  const hasFilters = !!rosterState.query.trim() || activeFilterCount() > 0;

  const countEl = document.querySelector("#roster-count");
  const statusEl = document.querySelector("#roster-status");
  const resultsEl = document.querySelector("#roster-results");
  if (!countEl || !statusEl || !resultsEl) return;

  countEl.textContent = String(items.length);

  const statusParts = [
    `${items.length} ${items.length === 1 ? "lugar encontrado" : "lugares encontrados"} em Araçoiaba da Serra`
  ];
  if (rosterState.query.trim()) statusParts.push(`“${esc(rosterState.query.trim())}”`);
  statusEl.innerHTML = `${statusParts.join(" · ")}${
    hasFilters
      ? ` <button type="button" class="textlink" data-action="reset">Limpar filtros ${icon("close")}</button>`
      : ""
  }`;

  if (!items.length) {
    resultsEl.innerHTML = `<div class="empty">
      ${icon(rosterState.favorites ? "heart" : "search")}
      <h2>${rosterState.favorites ? "Nenhum favorito salvo ainda." : "Nenhum lugar encontrado."}</h2>
      <p>${
        rosterState.favorites
          ? "Toque no coração de um restaurante para guardá-lo na sua lista."
          : "Tente buscar outra palavra, bairro ou limpe os filtros selecionados."
      }</p>
      <div class="actions">
        ${hasFilters ? `<button type="button" class="secondary-button" data-action="reset">Limpar filtros</button>` : ""}
        <button type="button" class="play-button" data-action="feedback">${icon("plus")}<span>Indicar um restaurante</span></button>
      </div>
    </div>`;
  } else {
    resultsEl.innerHTML = `<div class="grid roster-grid" data-grid="roster">
      ${items
        .map((item, idx) =>
          renderTile(item, {
            line: `${REGIONS[item.region]?.short} · ${item.dish}`,
            focusable: idx === 0,
            eager: idx < 12,
            chip: true
          })
        )
        .join("")}
    </div>`;
  }

  document.querySelectorAll("#roster-tags [data-tag]").forEach((btn) => {
    const [gKey, tId] = btn.dataset.tag.split(":");
    const active = rosterState.tags[gKey].includes(tId);
    const c = counts.get(btn.dataset.tag) ?? 0;
    btn.setAttribute("aria-pressed", String(active));
    btn.disabled = !active && c === 0;
    const badge = btn.querySelector("[data-count]");
    if (badge) badge.textContent = String(c);
  });

  const filterBtnSpan = document.querySelector('[data-action="toggle-filters"] span');
  const fCount = activeFilterCount();
  if (filterBtnSpan) filterBtnSpan.textContent = `Filtros${fCount ? ` (${fCount})` : ""}`;
}

// Modal de Detalhes / Mobile Sheet de cada Restaurante
function renderDetailContent(item, mode = "dialog", recReason = null) {
  const art = getArt(item);
  const isFav = prefs.favorites.includes(item.id);
  const likedVisita = likesState.visita?.includes(item.id);
  const likedDelivery = likesState.delivery?.includes(item.id);
  const closeTarget = mode === "sheet" ? "game-sheet" : "detail-dialog";
  const titleId = mode === "sheet" ? "sheet-title" : "dialog-title";
  const seedItem = recReason?.seedId ? lookup.get(recReason.seedId) : null;
  const vibeNames = item.vibes.map((v) => VIBES[v]).filter(Boolean);

  const gripHtml =
    mode === "sheet"
      ? `<div class="sheet-grip" data-sheet-grip><span></span></div>`
      : "";

  return `${gripHtml}
    <button class="dialog-close icon-button" data-close="${closeTarget}" aria-label="Fechar detalhes">${icon("close")}</button>
    <div class="panel" style="--game-accent:${esc(item.accent)}">
      <div class="panel-media">
        <figure class="cover-fig">
          ${renderImg(art.cover, art.fallbackCover, item.title, "", true)}
          <figcaption class="caption">${esc(REGIONS[item.region]?.title)}</figcaption>
        </figure>
        <figure class="shot-fig">
          <span class="shot-frame">
            ${renderImg(art.shot, art.fallbackShot, item.dish, "", true)}
          </span>
          <figcaption class="caption">Destaque: ${esc(item.dish)}</figcaption>
        </figure>
      </div>
      <div class="panel-info">
        <p class="kicker">${esc(REGIONS[item.region]?.title)} <span>${esc(item.price)} · ${esc(item.hours)}</span></p>
        <h2 id="${titleId}">${esc(item.title)}</h2>
        <p class="panel-genres">${esc(CUISINES[item.cuisine])} · ${esc(vibeNames.join(" · "))}</p>
        ${renderPanelScore(item)}
        ${recReason ? renderWhy(recReason, seedItem) : ""}
        <p class="lede">${esc(item.description)}</p>

        <div class="game-stats panel-stats">
          <div class="stat-pill">
            ${icon("utensils")}
            <div class="stat-copy">
              <span class="stat-value" title="${esc(item.dish)}">${esc(item.dish)}</span>
              <span class="stat-label">Prato Imperdível</span>
            </div>
          </div>
          <div class="stat-pill">
            ${icon("map")}
            <div class="stat-copy">
              <span class="stat-value" title="${esc(item.distance)}">${esc(item.distance)}</span>
              <span class="stat-label">Localização</span>
            </div>
          </div>
          <div class="stat-pill">
            ${icon("clock")}
            <div class="stat-copy">
              <span class="stat-value" title="${esc(item.hours)}">${esc(item.hours)}</span>
              <span class="stat-label">Funcionamento</span>
            </div>
          </div>
        </div>

        <div class="actions">
          ${renderPrimaryActions(item, mode === "sheet")}
          <a class="secondary-button" href="${esc(item.instagram)}" target="_blank" rel="noopener noreferrer" data-visit="${esc(item.id)}">
            ${icon("instagram")}<span>Instagram / Cardápio</span>
          </a>
          <button class="secondary-button fav-button${isFav ? " is-favorite" : ""}" type="button" data-favorite="${esc(item.id)}" aria-pressed="${isFav}">
            ${icon("heart")}<span>${isFav ? "Favoritado" : "Favoritar"}</span>
          </button>
        </div>

        <div class="like-pair panel-likes" role="group" aria-label="Avaliar este lugar">
          <button type="button" class="like-button${likedVisita ? " is-liked" : ""}" data-like="${esc(item.id)}" data-like-kind="visita" aria-pressed="${likedVisita}">
            ${icon("thumb")}
            <span>Vale a visita</span>
            <span class="like-count">${getLikeCount(item.id, "visita")}</span>
          </button>
          <button type="button" class="like-button${likedDelivery ? " is-liked" : ""}" data-like="${esc(item.id)}" data-like-kind="delivery" aria-pressed="${likedDelivery}">
            ${icon("sparkle")}
            <span>Indicaria para amigos</span>
            <span class="like-count">${getLikeCount(item.id, "delivery")}</span>
          </button>
        </div>

        <details class="tech" open>
          <summary>Endereço, estrutura e como chegar</summary>
          <p><strong>Endereço:</strong> ${esc(item.address)}</p>
          <p><strong>Estrutura:</strong> ${esc(item.amenities)}</p>
          <p>
            <a class="repo-link" href="${esc(item.mapsUrl)}" target="_blank" rel="noopener noreferrer">
              ${icon("map")} Abrir localização exata no Google Maps ${icon("arrow")}
            </a>
          </p>
        </details>
      </div>
    </div>`;
}

// Página de Novidades e Roteiros (#atualizacoes)
let activeUpdateFilter = "all";

function renderUpdatesShell() {
  const latestDate = UPDATES[0].date;
  const filterButtons = Object.entries(UPDATE_CATEGORIES)
    .map(([key, label]) => {
      const count =
        key === "all"
          ? UPDATES.length
          : UPDATES.filter((u) => u.category === key).length;
      return `<button type="button" data-update-filter="${key}" aria-pressed="${key === activeUpdateFilter}" class="${key === activeUpdateFilter ? "active" : ""}">
        ${esc(label)}<span>${count}</span>
      </button>`;
    })
    .join("");

  return `<header class="updates-heading">
      <div>
        <span class="overline">GUIA VIVO DE ARAÇOIABA DA SERRA</span>
        <h1 id="updates-title" tabindex="-1">Roteiros & Novidades<span>.</span></h1>
        <p>Roteiros de fim de semana, novos restaurantes catalogados e dicas gastronômicas para moradores, chácaras e visitantes da região.</p>
      </div>
      <div class="updates-latest">
        <span class="overline">ÚLTIMA ATUALIZAÇÃO</span>
        <time datetime="${esc(latestDate)}">${esc(fullDateFmt.format(new Date(`${latestDate}T12:00:00Z`)))}</time>
        <a href="#todos" class="textlink">Explorar os ${catalog.length} lugares ${icon("arrow")}</a>
      </div>
    </header>
    <div class="updates-toolbar">
      <div class="update-filters" role="group" aria-label="Filtrar roteiros">${filterButtons}</div>
      <p id="updates-count" role="status" aria-live="polite"></p>
    </div>
    <div id="updates-feed"></div>
    <div class="updates-end">
      <span>${icon("utensils")} Conhece um lugar novo em Araçoiaba da Serra?</span>
      <button type="button" class="secondary-button" data-action="feedback">${icon("plus")}<span>Indicar restaurante</span></button>
    </div>`;
}

function updateUpdatesFeed() {
  const filtered = UPDATES.filter(
    (u) => activeUpdateFilter === "all" || u.category === activeUpdateFilter
  );
  const dates = [...new Set(filtered.map((u) => u.date))];
  const feedEl = document.querySelector("#updates-feed");
  const countEl = document.querySelector("#updates-count");
  if (!feedEl || !countEl) return;

  countEl.textContent = `${filtered.length} ${filtered.length === 1 ? "publicação" : "publicações"}`;

  feedEl.innerHTML = dates
    .map((date) => {
      const entries = filtered.filter((u) => u.date === date);
      return `<section class="update-day" aria-labelledby="day-${date}">
        <h2 id="day-${date}" class="update-date">
          <time datetime="${date}">${esc(fullDateFmt.format(new Date(`${date}T12:00:00Z`)))}</time>
        </h2>
        <div class="update-entries">
          ${entries
            .map((entry) => {
              const linked = entry.restaurantIds
                .map((id) => lookup.get(id))
                .filter(Boolean);
              const catIcon =
                entry.category === "games"
                  ? "utensils"
                  : entry.category === "fixes"
                    ? "check"
                    : "sparkle";
              return `<article class="update-entry" aria-labelledby="update-${entry.id}">
                <span class="update-category category-${entry.category}">
                  ${icon(catIcon)}${esc(UPDATE_CATEGORIES[entry.category])}
                </span>
                <h3 id="update-${entry.id}">${esc(entry.title)}</h3>
                <p>${esc(entry.description)}</p>
                ${
                  linked.length
                    ? `<div class="update-games" aria-label="Restaurantes deste roteiro">
                        ${linked
                          .map(
                            (r) =>
                              `<button type="button" data-open="${esc(r.id)}">${esc(r.title)} ${icon("arrow")}</button>`
                          )
                          .join("")}
                      </div>`
                    : ""
                }
              </article>`;
            })
            .join("")}
        </div>
      </section>`;
    })
    .join("");
}

// Onboarding em 2 passos (Escolher lugares favoritos + estilos)
let obStep = 1;
let obPicks = new Set();
let obStyles = new Set();

function renderOnboardingCount(n) {
  if (n === 0) return "Escolha pelo menos 3 lugares";
  return `<b>${n}</b> ${n === 1 ? "escolhido" : "escolhidos"}${n < 3 ? ` · faltam ${3 - n}` : " · tudo pronto!"}`;
}

function renderOnboardingStep1() {
  const picksCatalog = catalog.filter((r) => r.onboardingPick).slice(0, 12);
  const grid = picksCatalog
    .map((item, idx) => {
      const pressed = obPicks.has(item.id);
      return `<button type="button" class="tile pick" data-pick="${esc(item.id)}" aria-pressed="${pressed}" tabindex="${idx === 0 ? "0" : "-1"}">
        ${renderNiche(item, `<span class="check" aria-hidden="true">${icon("check")}</span>`, idx < 8)}
        <span class="tile-text">
          <span class="tile-title">${esc(item.title)}</span>
          <span class="tile-line">${esc(CUISINES[item.cuisine])}</span>
        </span>
      </button>`;
    })
    .join("");

  return `<div class="ob">
    <div class="ob-top wrap">
      <span class="steps" role="img" aria-label="Passo 1 de 2"><i class="on"></i><i></i></span>
      <button type="button" class="textlink" data-ob="skip">Pular</button>
    </div>
    <div class="ob-body wrap">
      <p class="kicker">Bem-vindo ao EncontraAqui · Araçoiaba</p>
      <h2 id="onboarding-title">Quais destes lugares fazem seu estilo?</h2>
      <p class="lede">Toque em 3 ou mais que você já curte ou tem vontade de conhecer. Sua página inicial começa por eles.</p>
      <div class="pick-grid" data-grid="picks">${grid}</div>
    </div>
    <div class="ob-foot">
      <div class="wrap">
        <span class="count" id="pick-count" aria-live="polite">${renderOnboardingCount(obPicks.size)}</span>
        <button type="button" class="play-button" data-ob="next"><span>Continuar</span>${icon("arrow")}</button>
      </div>
    </div>
  </div>`;
}

function renderOnboardingStep2() {
  const groups = getOnboardingGroups();
  return `<div class="ob">
    <div class="ob-top wrap">
      <span class="steps" role="img" aria-label="Passo 2 de 2"><i class="on"></i><i class="on"></i></span>
      <button type="button" class="textlink" data-ob="skip">Pular</button>
    </div>
    <div class="ob-body wrap">
      <p class="kicker">Quase lá</p>
      <h2 id="onboarding-title">O que mais combina com a sua fome?</h2>
      <p class="lede">Marque quantos quiser (culinária, bairros e ocasiões). Dá para mudar depois em Ajustes.</p>
      <div class="groups">
        ${groups
          .map(
            (g) => `<fieldset class="group">
              <legend>${esc(g.title)}</legend>
              <div class="chips">
                ${g.options
                  .map(
                    (opt) =>
                      `<button type="button" class="tog" data-style="${esc(opt.id)}" aria-pressed="${obStyles.has(opt.id)}">${icon("check")}<span>${esc(opt.label)}</span></button>`
                  )
                  .join("")}
              </div>
            </fieldset>`
          )
          .join("")}
      </div>
    </div>
    <div class="ob-foot">
      <div class="wrap">
        <button type="button" class="textlink" data-ob="back">${icon("back")} Voltar</button>
        <button type="button" class="play-button" data-ob="done"><span>Montar meu guia</span>${icon("arrow")}</button>
      </div>
    </div>
  </div>`;
}

// Modal de Ajustes (#settings-dialog)
function renderRetiredBlock(note = "") {
  const retiredItems = retired.map((id) => lookup.get(id)).filter(Boolean);
  const listHtml = retiredItems.length
    ? `<ul class="retired-list">
        ${retiredItems
          .map(
            (item) => `<li>
              <span class="retired-thumb">${renderImg(getArt(item).cover, getArt(item).fallbackCover, "")}</span>
              <span class="retired-name">
                <strong>${esc(item.title)}</strong>
                <small>${esc(CUISINES[item.cuisine])} · ${esc(REGIONS[item.region]?.short)}</small>
              </span>
              <button class="secondary-button" type="button" data-unretire="${esc(item.id)}">Devolver</button>
            </li>`
          )
          .join("")}
      </ul>
      ${
        retiredItems.length > 1
          ? `<div class="setting-actions"><button class="text-button" type="button" data-action="unretire-all">Devolver todos</button></div>`
          : ""
      }`
    : `<p class="retired-empty">Nenhum restaurante ocultado. Na home, use ${icon("hide")} para tirar uma sugestão de <em>Para você</em>.</p>`;

  return `<section class="setting-block retired-block" id="retired-block" aria-labelledby="retired-title">
    <h3 id="retired-title" tabindex="-1">Ocultados de Para você <span class="retired-count">(${retiredItems.length})</span></h3>
    <p>Lugares que você pediu para não ver na home. Eles continuam em Todos os lugares, na busca e nos Favoritos.</p>
    ${listHtml}
    <p class="retired-note" role="status">${esc(note)}</p>
  </section>`;
}

function renderSettingsModal() {
  const themeMeta = getThemeMeta(currentTheme);
  return `<button class="dialog-close icon-button" data-close="settings-dialog" aria-label="Fechar ajustes">${icon("close")}</button>
    <span class="overline">PERSONALIZAÇÃO</span>
    <h2 id="settings-title">Ajustes<span>.</span></h2>

    <section class="setting-block">
      <h3>Seus gostos gastronômicos</h3>
      <p>Personalize os estilos de comida, bairros de Araçoiaba e ocasiões que abastecem a seção <em>Para você</em>.</p>
      <div class="setting-actions">
        <button class="secondary-button" type="button" data-action="onboarding">Escolher meus gostos</button>
        ${
          profile
            ? `<button class="text-button" type="button" data-action="forget-profile">Apagar preferências</button>`
            : ""
        }
      </div>
    </section>

    <section class="setting-block">
      <h3>Estilo visual da plataforma</h3>
      <p>Atual: <strong>${esc(themeMeta.name)}</strong> (${esc(themeMeta.blurb)}).</p>
      <div class="setting-actions">
        <button class="secondary-button" type="button" data-action="theme">${icon("theme")}<span>Alternar tema visual</span></button>
      </div>
    </section>

    ${renderRetiredBlock()}

    <section class="shortcuts">
      <h3>Atalhos de teclado</h3>
      <p><kbd>/</kbd> Buscar restaurante ou prato</p>
      <p><kbd>F</kbd> Favoritar lugar em destaque ou focado</p>
      <p><kbd>X</kbd> Ocultar lugar de Para você · <kbd>Ctrl+Z</kbd> Desfazer</p>
    </section>`;
}

// Modal de Indicar Novo Restaurante em Araçoiaba (#feedback-dialog)
function renderSuggestModal() {
  return `<div class="fb">
    <div class="fb-head">
      <div class="fb-titles">
        <span class="overline">COLABORE COM A REGIÃO</span>
        <h2 id="fb-title">Indicar um Restaurante</h2>
        <p class="fb-where">Conhece um lugar incrível em Araçoiaba da Serra ou região? Adicione agora ao seu guia.</p>
      </div>
      <button type="button" class="dialog-close icon-button" data-close="feedback-dialog" aria-label="Fechar">${icon("close")}</button>
    </div>
    <form id="suggest-form" class="fb-main" style="display:grid;gap:12px">
      <label class="fb-field">
        <span class="fb-label">Nome do Restaurante / Café / Bar *</span>
        <input type="text" name="title" required placeholder="Ex: Cantina da Serra, Pesqueiro..." />
      </label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <label class="fb-field">
          <span class="fb-label">Culinária *</span>
          <select name="cuisine">
            ${Object.entries(CUISINES)
              .map(([k, v]) => `<option value="${k}">${esc(v)}</option>`)
              .join("")}
          </select>
        </label>
        <label class="fb-field">
          <span class="fb-label">Região / Bairro *</span>
          <select name="region">
            ${Object.values(REGIONS)
              .map((r) => `<option value="${r.id}">${esc(r.title)}</option>`)
              .join("")}
          </select>
        </label>
      </div>
      <label class="fb-field">
        <span class="fb-label">Prato Imperdível / Especialidade *</span>
        <input type="text" name="dish" required placeholder="Ex: Costela no bafo, Pizza de burrata, Tilápia..." />
      </label>
      <label class="fb-field">
        <span class="fb-label">O que faz esse lugar especial?</span>
        <textarea name="description" placeholder="Conte sobre o ambiente, atendimento, preços ou horários..."></textarea>
      </label>
      <button type="submit" class="fb-send">${icon("plus")}<span>Adicionar ao Guia de Araçoiaba</span></button>
    </form>
  </div>`;
}

// Estrutura Principal do App (#app)
function renderAppShell() {
  const tLabels = themeButtonLabels(currentTheme);
  return `<div class="backdrop" aria-hidden="true"><i></i><i></i><i></i></div>
    <header class="appbar" id="appbar">
      <div class="wrap appbar-inner">
        <a class="wordmark" href="#inicio" aria-label="EncontraAqui, início">
          <i aria-hidden="true"></i>ENCONTRAAQUI <small>Araçoiaba</small>
        </a>
        <nav class="mainnav" aria-label="Principal">
          <a href="#inicio" data-nav="inicio">Início</a>
          <a href="#todos" data-nav="todos">Todos os lugares</a>
          <a href="#favoritos" data-nav="favoritos">Favoritos <span class="favorite-count" aria-label="favoritos"></span></a>
          <a href="#atualizacoes" data-nav="atualizacoes">Roteiros</a>
        </nav>
        <div class="bar-actions">
          <button class="round theme-button" type="button" data-action="theme" aria-label="${esc(tLabels.label)}" title="${esc(tLabels.title)}">${icon("theme")}</button>
          <a class="round" href="#todos" data-action="search" aria-label="Buscar restaurante" title="Buscar (/)">${icon("search")}</a>
          <button class="round fullscreen-button" type="button" data-action="fullscreen" aria-label="Entrar em tela cheia" title="Tela cheia">${icon("expand")}</button>
          <button class="round" type="button" data-action="settings" aria-label="Ajustes" title="Ajustes">${icon("settings")}</button>
        </div>
      </div>
    </header>
    <main id="main" tabindex="-1">
      <div id="view"></div>
      <section id="atualizacoes" class="updates-page" aria-labelledby="updates-title" hidden></section>
    </main>
    <nav class="tabbar" aria-label="Navegação">
      <a href="#inicio" data-nav="inicio">${icon("home")}<span>Início</span></a>
      <a href="#todos" data-nav="todos">${icon("grid")}<span>Lugares</span></a>
      <a href="#favoritos" data-nav="favoritos">${icon("heart")}<span>Favoritos</span></a>
      <a href="#atualizacoes" data-nav="atualizacoes">${icon("news")}<span>Roteiros</span></a>
    </nav>
    <dialog id="detail-dialog" class="detail-dialog" aria-labelledby="dialog-title"></dialog>
    <dialog id="settings-dialog" class="settings-dialog" aria-labelledby="settings-title"></dialog>
    <dialog id="game-sheet" class="game-sheet" aria-labelledby="sheet-title"></dialog>
    <dialog id="onboarding" class="onboarding" aria-labelledby="onboarding-title"></dialog>
    <dialog id="feedback-dialog" class="feedback-dialog" aria-labelledby="fb-title"></dialog>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>`;
}

// Inicialização e Controle de Views
applyTheme(currentTheme);
document.querySelector("#app").innerHTML = renderAppShell();
document.querySelector("#atualizacoes").innerHTML = renderUpdatesShell();

const detailDialog = document.querySelector("#detail-dialog");
const settingsDialog = document.querySelector("#settings-dialog");
const gameSheet = document.querySelector("#game-sheet");
const onboardingDialog = document.querySelector("#onboarding");
const feedbackDialog = document.querySelector("#feedback-dialog");
const allDialogs = [detailDialog, settingsDialog, gameSheet, onboardingDialog, feedbackDialog];
const toastEl = document.querySelector("#toast");

let currentView = "inicio";
let currentRecs = [];
let toastTimer = 0;
let undoAction = null;

function showToast(message, action = null) {
  window.clearTimeout(toastTimer);
  toastEl.replaceChildren(message);
  undoAction = action;
  if (action) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast-action";
    btn.dataset.action = "toast-action";
    btn.textContent = action.label;
    btn.title = action.title || action.label;
    toastEl.append(btn);
  }
  toastEl.classList.toggle("has-action", !!action);
  toastEl.classList.add("visible");
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove("visible", "has-action");
    undoAction = null;
  }, action ? 7500 : 3200);
}

function renderHome(opts = {}) {
  const prevIds = currentRecs.map((r) => r.item.id);
  currentRecs = buildRecommendations(9);
  const arrived = opts.still
    ? currentRecs
        .map((r) => r.item.id)
        .filter((id, idx) => (idx === 0 ? prevIds[0] !== id : !prevIds.includes(id)))
    : [];

  const viewEl = document.querySelector("#view");
  viewEl.classList.toggle("still", !!opts.still);
  viewEl.innerHTML = `<h1 class="sr-only">EncontraAqui · Araçoiaba da Serra</h1>
    ${renderMineSection()}
    ${renderNewsSection()}
    ${renderForYouSection({ recs: currentRecs, arrived })}`;
}

function updateNavIndicators() {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    if (el.dataset.nav === currentView) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  const favCount = prefs.favorites.filter((id) => lookup.has(id)).length;
  document.querySelectorAll(".favorite-count").forEach((el) => {
    el.textContent = favCount ? String(favCount) : "";
  });
  document.title =
    currentView === "atualizacoes"
      ? "Roteiros & Novidades · EncontraAqui"
      : currentView === "todos"
        ? "Todos os lugares · EncontraAqui Araçoiaba"
        : currentView === "favoritos"
          ? "Favoritos · EncontraAqui Araçoiaba"
          : "EncontraAqui · Onde comer em Araçoiaba da Serra";
}

function parseHashView() {
  const h = (window.location.hash || "#inicio").split("?")[0];
  if (h === "#todos") return "todos";
  if (h === "#favoritos") return "favoritos";
  if (h === "#atualizacoes") return "atualizacoes";
  return "inicio";
}

function route(scrollToTop = false) {
  currentView = parseHashView();
  const viewEl = document.querySelector("#view");
  const updatesEl = document.querySelector("#atualizacoes");
  viewEl.hidden = currentView === "atualizacoes";
  updatesEl.hidden = currentView !== "atualizacoes";

  if (currentView === "atualizacoes") {
    updateUpdatesFeed();
  } else if (currentView === "inicio") {
    renderHome();
  } else {
    rosterState.favorites = currentView === "favoritos";
    viewEl.innerHTML = renderRosterShell();
    updateRosterResults();
  }

  updateNavIndicators();
  if (scrollToTop) window.scrollTo({ top: 0, behavior: "instant" });
}

// Abertura de Detalhes (Modal no Desktop / Bottom Sheet no Mobile)
function openRestaurantDetail(id) {
  const item = lookup.get(id);
  if (!item) return;

  // Registra em Visitados Recentemente
  prefs.recent = [id, ...prefs.recent.filter((x) => x !== id)].slice(0, 16);
  saveJson(STORAGE_KEYS.prefs, prefs);

  const rec = currentRecs.find((r) => r.item.id === id) || null;
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const dialog = isMobile ? gameSheet : detailDialog;

  for (const d of [detailDialog, gameSheet]) {
    if (d.open) d.close();
  }

  dialog.innerHTML = renderDetailContent(
    item,
    isMobile ? "sheet" : "dialog",
    rec?.reason ?? null
  );
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function toggleFavorite(id) {
  const item = lookup.get(id);
  if (!item) return;
  const exists = prefs.favorites.includes(id);
  prefs.favorites = exists
    ? prefs.favorites.filter((x) => x !== id)
    : [...prefs.favorites, id];
  saveJson(STORAGE_KEYS.prefs, prefs);

  const wasRetired = !exists && retired.includes(id);
  if (wasRetired) {
    retired = retired.filter((x) => x !== id);
    saveJson(STORAGE_KEYS.retired, retired);
  }

  document.querySelectorAll(`[data-favorite="${CSS.escape(id)}"]`).forEach((btn) => {
    const nowFav = prefs.favorites.includes(id);
    btn.classList.toggle("is-favorite", nowFav);
    btn.setAttribute("aria-pressed", String(nowFav));
    const span = btn.querySelector("span");
    if (span) span.textContent = nowFav ? "Favoritado" : "Favoritar";
  });

  updateNavIndicators();
  if (currentView === "favoritos") updateRosterResults();
  if (currentView === "inicio") renderHome({ still: true });

  showToast(
    wasRetired
      ? `${item.title} foi favoritado e voltou para Para você.`
      : !exists
        ? `${item.title} salvo nos seus Favoritos.`
        : `${item.title} removido dos Favoritos.`
  );
}

function toggleLike(id, kind) {
  const item = lookup.get(id);
  if (!item) return;
  const list = likesState[kind] || [];
  const exists = list.includes(id);
  likesState[kind] = exists ? list.filter((x) => x !== id) : [...list, id];
  saveJson(STORAGE_KEYS.likes, likesState);

  for (const d of [detailDialog, gameSheet]) {
    if (d.open) {
      const btn = d.querySelector(`[data-like="${CSS.escape(id)}"][data-like-kind="${kind}"]`);
      if (btn) {
        const nowLiked = likesState[kind].includes(id);
        btn.classList.toggle("is-liked", nowLiked);
        btn.setAttribute("aria-pressed", String(nowLiked));
        const countEl = btn.querySelector(".like-count");
        if (countEl) countEl.textContent = String(getLikeCount(id, kind));
      }
    }
  }

  showToast(
    !exists
      ? kind === "visita"
        ? `Você recomendou a visita no ${item.title}!`
        : `Você indicou o ${item.title} para amigos!`
      : "Avaliação removida."
  );
}

function retireRestaurant(id) {
  const item = lookup.get(id);
  if (!item || retired.includes(id)) return;
  retired = [...retired, id];
  saveJson(STORAGE_KEYS.retired, retired);
  if (currentView === "inicio") renderHome({ still: true });

  showToast(`${item.title} não aparece mais em Para você.`, {
    label: "Desfazer",
    title: "Desfazer (Ctrl+Z)",
    run: () => {
      retired = retired.filter((x) => x !== id);
      saveJson(STORAGE_KEYS.retired, retired);
      if (currentView === "inicio") renderHome({ still: true });
      showToast(`${item.title} voltou para Para você.`);
    }
  });
}

function openOnboarding() {
  for (const d of allDialogs) {
    if (d.open && d !== onboardingDialog) d.close();
  }
  obStep = 1;
  obPicks = new Set(profile?.games ?? []);
  obStyles = new Set(profile?.styles ?? []);
  onboardingDialog.innerHTML = renderOnboardingStep1();
  if (!onboardingDialog.open) onboardingDialog.showModal();
  document.body.classList.add("dialog-open");
}

function finishOnboarding(skipped = false) {
  const hasAny = obPicks.size > 0 || obStyles.size > 0;
  profile = {
    status: skipped && !hasAny ? "skipped" : "done",
    games: [...obPicks],
    styles: [...obStyles],
    updatedAt: Date.now()
  };
  saveJson(STORAGE_KEYS.profile, profile);
  onboardingDialog.close();
  document.body.classList.remove("dialog-open");
  if (!skipped || hasAny) {
    showToast("Pronto! Seu guia de Araçoiaba foi montado com os seus gostos.");
  }
  if (window.location.hash !== "#inicio" && window.location.hash !== "") {
    window.location.hash = "#inicio";
  } else {
    route(true);
  }
}

function cycleTheme(btn) {
  const next = nextThemeId(currentTheme);
  const updateDom = () => {
    currentTheme = next;
    applyTheme(next);
    const labels = themeButtonLabels(next);
    document.querySelectorAll('[data-action="theme"]').forEach((b) => {
      b.setAttribute("aria-label", labels.label);
      b.title = labels.title;
    });
    if (settingsDialog.open) {
      settingsDialog.innerHTML = renderSettingsModal();
    }
  };

  if (btn) {
    const rect = btn.getBoundingClientRect();
    document.documentElement.style.setProperty("--reveal-x", `${Math.round(rect.left + rect.width / 2)}px`);
    document.documentElement.style.setProperty("--reveal-y", `${Math.round(rect.top + rect.height / 2)}px`);
  }

  if ("startViewTransition" in document && !allDialogs.some((d) => d.open)) {
    document.startViewTransition(updateDom);
  } else {
    updateDom();
  }

  const meta = getThemeMeta(next);
  showToast(`Estilo ${meta.name}: ${meta.blurb}.`);
}

// Fallback automático para imagens caso offline
document.addEventListener(
  "error",
  (e) => {
    const img = e.target;
    if (img instanceof HTMLImageElement && img.dataset.fallback && img.src !== img.dataset.fallback) {
      img.src = img.dataset.fallback;
    }
  },
  true
);

// Eventos de Input e Mudança de Ordenação
document.addEventListener("input", (e) => {
  const t = e.target;
  if (t.id === "search") {
    rosterState.query = t.value;
    updateRosterResults();
  }
});

document.addEventListener("change", (e) => {
  const t = e.target;
  if (t.dataset?.filter === "sort") {
    rosterState.sort = t.value;
    updateRosterResults();
  }
});

// Submissão do formulário de Indicar Restaurante
document.addEventListener("submit", (e) => {
  if (e.target.id !== "suggest-form") return;
  e.preventDefault();
  const fd = new FormData(e.target);
  const title = String(fd.get("title") || "").trim();
  const cuisine = String(fd.get("cuisine") || "caipira");
  const region = String(fd.get("region") || "centro");
  const dish = String(fd.get("dish") || "Especialidade da Casa").trim();
  const description =
    String(fd.get("description") || "").trim() ||
    `Indicação da comunidade em Araçoiaba da Serra (${REGIONS[region]?.title || "Centro"}). Especialidade: ${dish}.`;

  if (!title) return;
  const id = `custom-${normalize(title).replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
  const newItem = {
    id,
    title,
    subtitle: `${CUISINES[cuisine]} em ${REGIONS[region]?.title}`,
    cuisine,
    region,
    price: "$$",
    vibes: ["familia", "amigos"],
    score: 4.8,
    scoreCount: 15,
    scoreSource: "Comunidade Araçoiaba",
    accent: "#ff7445",
    dish,
    distance: REGIONS[region]?.title || "Araçoiaba da Serra",
    hours: "Consulte horários no Maps",
    address: `${REGIONS[region]?.title || "Centro"}, Araçoiaba da Serra - SP`,
    phone: "5515999999999",
    instagram: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + " Aracoiaba da Serra")}`,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + " Aracoiaba da Serra")}`,
    description,
    amenities: "Indicado pela comunidade · Araçoiaba da Serra",
    coverPhoto: "",
    shotPhoto: "",
    curated: true,
    onboardingPick: false
  };

  const customList = loadJson(STORAGE_KEYS.custom, []);
  customList.unshift(newItem);
  saveJson(STORAGE_KEYS.custom, customList);
  refreshCatalog();
  feedbackDialog.close();
  route();
  openRestaurantDetail(newItem.id);
  showToast(`${newItem.title} foi adicionado ao Guia de Araçoiaba!`);
});

// Delegação global de cliques
document.addEventListener("click", async (e) => {
  const el = e.target.closest("button, a");
  if (!el) return;
  const ds = el.dataset;

  if (el.classList.contains("skip-link")) {
    e.preventDefault();
    document.querySelector("#main")?.focus();
  } else if (ds.pick) {
    const id = ds.pick;
    if (obPicks.has(id)) obPicks.delete(id);
    else obPicks.add(id);
    el.setAttribute("aria-pressed", String(obPicks.has(id)));
    const countEl = document.querySelector("#pick-count");
    if (countEl) countEl.innerHTML = renderOnboardingCount(obPicks.size);
  } else if (ds.style) {
    const st = ds.style;
    if (obStyles.has(st)) obStyles.delete(st);
    else obStyles.add(st);
    el.setAttribute("aria-pressed", String(obStyles.has(st)));
  } else if (ds.ob === "next") {
    obStep = 2;
    onboardingDialog.innerHTML = renderOnboardingStep2();
    onboardingDialog.scrollTop = 0;
  } else if (ds.ob === "back") {
    obStep = 1;
    onboardingDialog.innerHTML = renderOnboardingStep1();
    onboardingDialog.scrollTop = 0;
  } else if (ds.ob === "done") {
    finishOnboarding(false);
  } else if (ds.ob === "skip") {
    finishOnboarding(true);
  } else if (ds.open) {
    openRestaurantDetail(ds.open);
  } else if (ds.favorite) {
    toggleFavorite(ds.favorite);
  } else if (ds.like && ds.likeKind) {
    toggleLike(ds.like, ds.likeKind);
  } else if (ds.retire) {
    retireRestaurant(ds.retire);
  } else if (ds.unretire) {
    const id = ds.unretire;
    const item = lookup.get(id);
    retired = retired.filter((x) => x !== id);
    saveJson(STORAGE_KEYS.retired, retired);
    const block = settingsDialog.querySelector("#retired-block");
    if (block) {
      block.outerHTML = renderRetiredBlock(
        item ? `${item.title} voltou para Para você.` : "Restaurado."
      );
    }
    if (currentView === "inicio") renderHome({ still: true });
  } else if (ds.action === "unretire-all") {
    retired = [];
    saveJson(STORAGE_KEYS.retired, retired);
    const block = settingsDialog.querySelector("#retired-block");
    if (block) block.outerHTML = renderRetiredBlock("Todos os lugares voltaram para Para você.");
    if (currentView === "inicio") renderHome({ still: true });
  } else if (ds.mineTab) {
    activeMineTab = ds.mineTab;
    saveJson(STORAGE_KEYS.home, { mine: activeMineTab });
    const mineEl = document.querySelector("#mine");
    if (mineEl) mineEl.outerHTML = renderMineSection();
  } else if (ds.updateFilter) {
    activeUpdateFilter = ds.updateFilter;
    document.querySelectorAll("[data-update-filter]").forEach((b) => {
      const on = b.dataset.updateFilter === activeUpdateFilter;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    updateUpdatesFeed();
  } else if (ds.tag) {
    const [gKey, tId] = ds.tag.split(":");
    const arr = rosterState.tags[gKey];
    rosterState.tags[gKey] = arr.includes(tId)
      ? arr.filter((x) => x !== tId)
      : [...arr, tId];
    updateRosterResults();
  } else if (ds.action === "toggle-filters") {
    rosterState.filtersOpen = !rosterState.filtersOpen;
    document.querySelector("#roster-filters")?.classList.toggle("open", rosterState.filtersOpen);
    el.setAttribute("aria-expanded", String(rosterState.filtersOpen));
  } else if (ds.action === "toggle-favorites") {
    window.location.hash = currentView === "favoritos" ? "#todos" : "#favoritos";
  } else if (ds.action === "reset") {
    rosterState.query = "";
    rosterState.tags = { cuisine: [], region: [], vibe: [], price: [] };
    const input = document.querySelector("#search");
    if (input) input.value = "";
    updateRosterResults();
  } else if (ds.action === "search") {
    e.preventDefault();
    if (currentView !== "todos") window.location.hash = "#todos";
    window.setTimeout(() => document.querySelector("#search")?.focus(), 20);
  } else if (ds.action === "surprise") {
    const pool = catalog.filter((r) => !retired.includes(r.id));
    const pick = pool[Math.floor(Math.random() * pool.length)] || catalog[0];
    openRestaurantDetail(pick.id);
    showToast(`Sorteado para hoje: ${pick.title}!`);
  } else if (ds.action === "theme") {
    cycleTheme(el);
  } else if (ds.action === "settings") {
    settingsDialog.innerHTML = renderSettingsModal();
    settingsDialog.showModal();
    document.body.classList.add("dialog-open");
  } else if (ds.action === "feedback") {
    feedbackDialog.innerHTML = renderSuggestModal();
    feedbackDialog.showModal();
    document.body.classList.add("dialog-open");
  } else if (ds.action === "onboarding") {
    openOnboarding();
  } else if (ds.action === "forget-profile") {
    window.localStorage.removeItem(STORAGE_KEYS.profile);
    profile = null;
    settingsDialog.close();
    showToast("Seus gostos foram apagados deste navegador.");
    route();
  } else if (ds.action === "fullscreen") {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      showToast("Tela cheia indisponível neste navegador.");
    }
  } else if (ds.action === "toast-action") {
    const fn = undoAction?.run;
    toastEl.classList.remove("visible", "has-action");
    undoAction = null;
    fn?.();
  } else if (ds.close) {
    document.querySelector(`#${ds.close}`)?.close();
  } else if (ds.visit) {
    prefs.recent = [ds.visit, ...prefs.recent.filter((x) => x !== ds.visit)].slice(0, 16);
    saveJson(STORAGE_KEYS.prefs, prefs);
  }
});

// Fechar modais ao clicar no backdrop
for (const d of allDialogs) {
  d.addEventListener("click", (e) => {
    if (e.target !== d || d === onboardingDialog) return;
    const rect = d.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      d.close();
    }
  });
  d.addEventListener("close", () => {
    if (!allDialogs.some((x) => x.open)) {
      document.body.classList.remove("dialog-open");
    }
  });
}

// Atalhos de teclado (/, F, X, Ctrl+Z, Escape)
document.addEventListener("keydown", (e) => {
  const target = e.target;
  const inInput = target.matches("input, textarea, select, [contenteditable='true']");

  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z" && !inInput && undoAction) {
    e.preventDefault();
    const fn = undoAction.run;
    toastEl.classList.remove("visible", "has-action");
    undoAction = null;
    fn();
    return;
  }

  if (e.key === "Escape" && target.id === "search") {
    if (target.value) {
      rosterState.query = "";
      target.value = "";
      updateRosterResults();
    } else {
      target.blur();
    }
    return;
  }

  if (inInput || allDialogs.some((d) => d.open)) return;

  if (e.key === "/") {
    e.preventDefault();
    if (currentView !== "todos" && currentView !== "favoritos") {
      window.location.hash = "#todos";
    }
    window.setTimeout(() => document.querySelector("#search")?.focus(), 20);
  } else if (e.key.toLowerCase() === "f") {
    const card = target.closest("[data-open]") || document.querySelector("[data-hero]");
    const id = card?.dataset.open || card?.dataset.hero;
    if (id) {
      e.preventDefault();
      toggleFavorite(id);
    }
  } else if (e.key.toLowerCase() === "x" || e.key === "Delete") {
    const slot = target.closest(".tile-slot")?.querySelector("[data-open]");
    const id = slot?.dataset.open || (currentView === "inicio" ? currentRecs[0]?.item.id : null);
    if (id && currentView === "inicio") {
      e.preventDefault();
      retireRestaurant(id);
    }
  }
});

window.addEventListener("hashchange", () => route(true));

// Inicializa rota e abre onboarding na primeira visita
route();
if (!profile && currentView === "inicio") {
  openOnboarding();
}
