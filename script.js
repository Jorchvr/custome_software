/* ============================================
   LANGUAGE TOGGLE (EN default, ES optional)
   ============================================ */
const LANG_KEY = 'site-lang';

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach((el) => {
    const val = el.dataset[lang];
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll('[data-en-placeholder]').forEach((el) => {
    const val = el.dataset[lang + 'Placeholder'];
    if (val != null) el.placeholder = val;
  });
  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}

  // If chatbot has been initialized, re-seed greeting on language change
  if (window.__chatInited) resetChat();
}

document.querySelectorAll('.lang-switch button').forEach((b) => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

const savedLang = (() => {
  try { return localStorage.getItem(LANG_KEY); } catch (_) { return null; }
})() || 'en';
applyLang(savedLang);

function currentLang() {
  return document.documentElement.lang === 'es' ? 'es' : 'en';
}

/* ============================================
   HEADER SCROLL STATE
   ============================================ */
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================
   REVEAL ON SCROLL
   ============================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ============================================
   WHATSAPP FORM (opens WA chat with pre-filled message)
   ============================================ */
const WA_NUMBER = '528128641405';
const waForm = document.getElementById('waForm');

waForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const type = document.getElementById('f-type').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  if (!name || !type || !msg) {
    const alertMsg = currentLang() === 'es'
      ? 'Por favor llena todos los campos.'
      : 'Please fill in all fields.';
    alert(alertMsg);
    return;
  }
  const template = currentLang() === 'es'
    ? `Hola, soy ${name}.\n\nMe interesa: ${type}\n\n${msg}`
    : `Hi, I'm ${name}.\n\nI'm interested in: ${type}\n\n${msg}`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(template)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

/* ============================================
   CHATBOT — RULE-BASED, BILINGUAL
   Rich knowledge about our services + WhatsApp handoff.
   ============================================ */

const chatFab = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const quickRepliesEl = document.getElementById('quickReplies');

chatFab?.addEventListener('click', () => {
  document.body.classList.toggle('chatbot-open');
  if (document.body.classList.contains('chatbot-open') && !window.__chatInited) {
    initChat();
  }
});

const KB = {
  greeting: {
    en: [
      "Hi 👋 I'm the studio assistant. I can answer questions about our services, projects, pricing and delivery times.",
      "What would you like to know?",
    ],
    es: [
      "¡Hola! 👋 Soy el asistente del estudio. Puedo responder preguntas sobre nuestros servicios, proyectos, precios y tiempos de entrega.",
      "¿Qué te gustaría saber?",
    ],
  },
  quickReplies: {
    en: [
      { label: 'What do you build?', key: 'services' },
      { label: 'Gym systems', key: 'gym' },
      { label: 'Websites', key: 'web' },
      { label: 'How much?', key: 'price' },
      { label: 'How long?', key: 'time' },
      { label: 'Talk to a human', key: 'human' },
    ],
    es: [
      { label: '¿Qué construyen?', key: 'services' },
      { label: 'Sistemas de gym', key: 'gym' },
      { label: 'Sitios web', key: 'web' },
      { label: '¿Cuánto cuesta?', key: 'price' },
      { label: '¿Cuánto tarda?', key: 'time' },
      { label: 'Hablar con alguien', key: 'human' },
    ],
  },
};

// Intent patterns (matched against normalized text)
const INTENTS = [
  {
    key: 'services',
    patterns: [
      /\b(what|que|qué)\b.*\b(do|hacen|hacéis|ofrec|build|construye|construir|desarroll)/i,
      /\bservic(e|io)s?\b/i,
      /\b(what|que|qué)\b.*\b(build|construy)/i,
      /^(hi|hola|hello|hey|buenas|buenos|que onda)/i,
    ],
    reply: {
      en: "We build six main things: 1) Gym management systems, 2) Biometric access (fingerprint locks, turnstiles), 3) Point of sale, 4) Informational websites, 5) AI chatbots, and 6) Fully custom software. Want details on any of them?",
      es: "Construimos seis cosas principales: 1) Sistemas de gestión para gimnasios, 2) Acceso biométrico (chapas por huella, torniquetes), 3) Punto de venta, 4) Sitios web informativos, 5) Chatbots con IA, y 6) Software 100% a la medida. ¿De cuál quieres más detalles?",
    },
    next: 'services',
  },
  {
    key: 'gym',
    patterns: [/\bgym\b/i, /\bgim(nasio)?\b/i, /\bfitness\b/i, /\bfingerprint\b/i, /\bhuella\b/i, /\bbiomet/i, /\btornique/i, /\bmembresi/i, /\bmembership/i],
    reply: {
      en: "Our gym platform runs 5 real gyms today. It handles: fingerprint-controlled magnetic locks and turnstiles, full member and membership management, POS with inventory, and a daily cash-out panel that tracks cash / transfer / card / USD separately. It's live at 45 Life Fitness (Los Cabos), PowerGym Hunucmá & Kinchil (Yucatán) and Black Mamba Gym (Mérida).",
      es: "Nuestra plataforma de gym corre hoy en 5 gimnasios reales. Incluye: chapa magnética y torniquete por huella digital, gestión completa de miembros y membresías, POS con inventario y un panel de caja diario que separa efectivo / transferencia / tarjeta / USD. Está activa en 45 Life Fitness (Los Cabos), PowerGym Hunucmá y Kinchil (Yucatán) y Black Mamba Gym (Mérida).",
    },
    next: 'gym',
  },
  {
    key: 'web',
    patterns: [/\b(website|site|web|pagina|página|landing|portal)\b/i],
    reply: {
      en: "We build fast, modern, responsive sites — informational, corporate and real-estate portals. Every site can include an AI chatbot and a direct WhatsApp bridge. Examples: 45 Life Fitness (gym web), SAARQ Real Estate (Monterrey) and Óptima Solución (Mérida). Want to see them?",
      es: "Hacemos sitios rápidos, modernos y responsivos — informativos, corporativos y portales inmobiliarios. Cada sitio puede incluir un chatbot con IA y conexión directa a WhatsApp. Ejemplos: 45 Life Fitness (gym web), SAARQ Bienes Raíces (Monterrey) y Óptima Solución (Mérida). ¿Los quieres ver?",
    },
    next: 'web',
  },
  {
    key: 'chatbot',
    patterns: [/\bchatbot\b/i, /\bbot\b/i, /\bia\b/i, /\bai\b/i, /\bintelig/i],
    reply: {
      en: "Yes — we integrate AI chatbots into sites and WhatsApp. They greet visitors 24/7, qualify leads and hand off to a human when it matters. Two of our live projects use this: SAARQ Real Estate and Óptima Solución.",
      es: "Sí — integramos chatbots con IA en sitios y WhatsApp. Saludan a los visitantes 24/7, califican prospectos y pasan la conversación a una persona cuando importa. Dos proyectos activos usan esto: SAARQ Bienes Raíces y Óptima Solución.",
    },
    next: 'chatbot',
  },
  {
    key: 'pos',
    patterns: [/\bpos\b/i, /\bpoint of sale\b/i, /\bpunto de venta\b/i, /\bcaja\b/i, /\binventari/i, /\binventor/i],
    reply: {
      en: "Our POS includes: live inventory, multiple payment methods (cash, transfer, card, USD), fast product search, quick-sale tiles, and a daily cash-out panel. It's the same engine that runs the gym systems.",
      es: "Nuestro POS incluye: inventario en vivo, múltiples métodos de pago (efectivo, transferencia, tarjeta, USD), búsqueda rápida de productos, tiles de venta rápida y un panel de caja diario. Es el mismo motor que corre en los sistemas de gym.",
    },
    next: 'pos',
  },
  {
    key: 'price',
    patterns: [/\bprice|precio|cost|cuesta|cotiza|quote|budget|presupuesto|pagar|paga\b/i, /\bhow much|cuanto|cuánto\b/i],
    reply: {
      en: "Every project is custom, so pricing depends on scope. A single-page website starts around USD $600. A full gym system with biometric hardware starts around USD $2,500. We give you a fixed quote after a 15-minute WhatsApp chat — no surprises. Want to start there?",
      es: "Cada proyecto es a la medida, así que el precio depende del alcance. Un sitio web de una página parte de ~$12,000 MXN. Un sistema completo de gym con hardware biométrico parte de ~$50,000 MXN. Te damos un precio cerrado tras 15 minutos de WhatsApp — sin sorpresas. ¿Empezamos por ahí?",
    },
    next: 'price',
  },
  {
    key: 'time',
    patterns: [/\b(how long|tiempo|tarda|takes|duration|deliver|entrega|entregar|plazo)\b/i, /\bcuando|cuándo\b/i],
    reply: {
      en: "Delivery times: a website — 2 to 4 weeks. A full gym system with biometrics — 4 to 8 weeks depending on hardware. AI chatbot integration on top of an existing site — 1 to 2 weeks.",
      es: "Tiempos de entrega: sitio web — 2 a 4 semanas. Sistema completo de gym con biometría — 4 a 8 semanas según el hardware. Integrar chatbot con IA sobre un sitio existente — 1 a 2 semanas.",
    },
    next: 'time',
  },
  {
    key: 'location',
    patterns: [/\b(where|donde|dónde|ubicaci|located|based|zone|zona)\b/i, /\b(mexico|méxico)\b/i],
    reply: {
      en: "We work all over Mexico — remotely and on-site. We've shipped projects in Los Cabos (BCS), Hunucmá, Kinchil and Mérida (Yucatán), and Monterrey (Nuevo León).",
      es: "Trabajamos en todo México — remoto y presencial. Hemos entregado proyectos en Los Cabos (BCS), Hunucmá, Kinchil y Mérida (Yucatán), y Monterrey (Nuevo León).",
    },
    next: 'location',
  },
  {
    key: 'founders',
    patterns: [/\b(founder|fundador|equipo|team|who|quien|quién)\b/i, /\b(jorge|miguel|vargas|ramos)\b/i],
    reply: {
      en: "The studio is run by its two founders — Jorge Vargas and Miguel Ramos. When you hire us, you talk to them directly. No account managers, no middlemen.",
      es: "El estudio lo llevan sus dos fundadores — Jorge Vargas y Miguel Ramos. Cuando nos contratas, hablas con ellos directamente. Sin gerentes de cuenta, sin intermediarios.",
    },
    next: 'founders',
  },
  {
    key: 'contact',
    patterns: [/\b(contact|contacto|reach|escrib|contactar|whatsapp|whats|correo|email|mail)\b/i],
    reply: {
      en: "Fastest way: WhatsApp at +52 812 864 1405 — I can open a chat with our team right now.",
      es: "La forma más rápida: WhatsApp al +52 812 864 1405 — puedo abrir una conversación con el equipo ahora mismo.",
    },
    next: 'human',
  },
  {
    key: 'human',
    patterns: [/\b(human|persona|alguien|someone|talk|hablar|call|llam)/i],
    reply: {
      en: "Absolutely. Tap the button below to jump into WhatsApp with Jorge and Miguel.",
      es: "Claro. Toca el botón de abajo para saltar a WhatsApp con Jorge y Miguel.",
    },
    action: 'handoff',
    next: 'human',
  },
  {
    key: 'thanks',
    patterns: [/\b(thanks|thank you|gracias|ty)\b/i],
    reply: {
      en: "Anytime! Anything else you'd like to know?",
      es: "¡Con gusto! ¿Algo más que quieras saber?",
    },
    next: 'services',
  },
  {
    key: 'bye',
    patterns: [/\b(bye|adios|adiós|hasta luego|nos vemos)\b/i],
    reply: {
      en: "See you! When you're ready, we're one WhatsApp message away.",
      es: "¡Nos vemos! Cuando estés listo, estamos a un WhatsApp de distancia.",
    },
    next: 'services',
  },
];

const FALLBACK = {
  en: "I want to make sure I answer that right — let me connect you with Jorge or Miguel on WhatsApp. Tap below and you'll go straight to the chat.",
  es: "Quiero contestarte bien esa — mejor te conecto con Jorge o Miguel por WhatsApp. Toca abajo y llegarás directo al chat.",
};

function matchIntent(text) {
  const norm = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
  for (const intent of INTENTS) {
    for (const p of intent.patterns) {
      if (p.test(norm)) return intent;
    }
  }
  return null;
}

function bubble(text, kind = 'bot') {
  const el = document.createElement('div');
  el.className = 'msg msg-' + kind;
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return el;
}

function typing() {
  const el = document.createElement('div');
  el.className = 'msg msg-bot msg-typing';
  el.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return el;
}

function handoffBubble() {
  const lang = currentLang();
  const wrap = document.createElement('div');
  wrap.className = 'msg msg-bot';
  const p = document.createElement('div');
  p.textContent = lang === 'es'
    ? 'Continuar la conversación en WhatsApp:'
    : 'Continue the conversation on WhatsApp:';
  p.style.marginBottom = '0.6rem';
  const link = document.createElement('a');
  link.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola, vengo del asistente en su sitio web. Quiero saber más sobre sus servicios.'
      : "Hi, I'm coming from the chat on your website. I'd like to know more about your services."
  )}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'wa-btn';
  link.style.padding = '0.7rem 1.1rem';
  link.style.fontSize = '0.85rem';
  link.innerHTML =
    '<svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>' +
    (lang === 'es' ? '<span>Abrir WhatsApp</span>' : '<span>Open WhatsApp</span>');
  wrap.appendChild(p);
  wrap.appendChild(link);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderQuickReplies(list) {
  const lang = currentLang();
  const replies = list || KB.quickReplies[lang];
  quickRepliesEl.innerHTML = '';
  replies.forEach((r) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'quick-reply';
    b.textContent = r.label;
    b.addEventListener('click', () => {
      chatInput.value = r.label;
      handleUserInput(r.key);
    });
    quickRepliesEl.appendChild(b);
  });
}

async function handleUserInput(forcedIntentKey) {
  const text = chatInput.value.trim();
  if (!text) return;
  bubble(text, 'user');
  chatInput.value = '';
  const t = typing();
  await new Promise((r) => setTimeout(r, 550 + Math.random() * 400));
  t.remove();

  const lang = currentLang();
  let intent = forcedIntentKey ? INTENTS.find((i) => i.key === forcedIntentKey) : matchIntent(text);

  if (!intent) {
    bubble(FALLBACK[lang], 'bot');
    handoffBubble();
    return;
  }

  bubble(intent.reply[lang], 'bot');
  if (intent.action === 'handoff') handoffBubble();
  renderQuickReplies();
}

function resetChat() {
  chatMessages.innerHTML = '';
  const lang = currentLang();
  KB.greeting[lang].forEach((line, i) => {
    setTimeout(() => bubble(line, 'bot'), i * 350);
  });
  setTimeout(renderQuickReplies, KB.greeting[lang].length * 350 + 100);
}

function initChat() {
  window.__chatInited = true;
  resetChat();
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserInput();
  });
}

/* ============================================
   ACCESSIBILITY: close chat on Escape
   ============================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('chatbot-open')) {
    document.body.classList.remove('chatbot-open');
  }
});
