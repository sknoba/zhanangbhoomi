/**
 * ZHANANGBHOOMI - Main Client-Side JavaScript
 * Sticky Header, Mobile Drawer, Bilingual Translation Engine (English & Hindi), Quote Rotator & Config Binding
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initActiveNavLink();
  initLanguageSwitcher();
  initInspirationalQuotes();
  initDynamicConfig();
  initContactFormHandler();
  initScrollReveal();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL TRANSITION
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu-wrapper');
  const backdrop = document.querySelector('.nav-backdrop');
  
  if (!toggleBtn || !navMenu) return;

  function openMenu() {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. ACTIVE NAVIGATION LINK HIGHLIGHTING
   ========================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ==========================================================================
   4. BILINGUAL LANGUAGE SWITCHER (ENGLISH & HINDI)
   ========================================================================== */
let currentLang = 'en';

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const savedLang = localStorage.getItem('zbhoomi_lang') || 'en';

  // Apply initial saved or default language
  setLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.dataset.lang;
      setLanguage(selectedLang);
    });
  });
}

function setLanguage(lang) {
  if (typeof TRANSLATIONS === 'undefined' || !TRANSLATIONS[lang]) return;

  currentLang = lang;
  localStorage.setItem('zbhoomi_lang', lang);
  document.documentElement.lang = lang;

  // Update button active state
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Translate all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = TRANSLATIONS[lang][key];
    if (translation) {
      el.innerHTML = translation;
    }
  });

  // Update quote rotator language
  if (typeof updateQuoteForLang === 'function') {
    updateQuoteForLang(lang);
  }
}

/* ==========================================================================
   5. INSPIRATIONAL QUOTE ROTATOR (ENGLISH & HINDI)
   ========================================================================== */
const INSPIRATIONAL_QUOTES = {
  en: [
    { quote: "Peace comes from within. Do not seek it without.", author: "Gautama Buddha" },
    { quote: "Mindfulness is the pathway to the Deathless; unmindfulness is the pathway to death.", author: "Dhammapada" },
    { quote: "Radiate boundless love towards the entire world — above, below, and across — unhindered, without ill will, without enmity.", author: "Metta Sutta" },
    { quote: "Quiet the mind, and the soul will speak.", author: "Buddhist Wisdom" },
    { quote: "Meditation brings wisdom; lack of meditation leaves ignorance.", author: "Dhammapada" }
  ],
  hi: [
    { quote: "शांति भीतर से आती है। इसे बाहर न खोजें।", author: "गौतम बुद्ध" },
    { quote: "सचेतनता (माइंडफुलनेस) अमरता का मार्ग है; असचेतनता मृत्यु का मार्ग है।", author: "धम्मपद" },
    { quote: "संपूर्ण विश्व के प्रति असीम प्रेम और करुणा का विस्तार करें — बिना किसी द्वेष के।", author: "मेत्त सुत्त" },
    { quote: "मन को शांत करें, और आत्मा बोलेगी।", author: "बौद्ध विचार" },
    { quote: "ध्यान से प्रज्ञा आती है; ध्यान के अभाव में अज्ञान बना रहता है।", author: "धम्मपद" }
  ]
};

let currentQuoteIndex = 0;
let quoteTimer = null;

function initInspirationalQuotes() {
  const quoteTextEl = document.getElementById('rotator-quote');
  const quoteAuthorEl = document.getElementById('rotator-author');
  const dotsContainer = document.getElementById('rotator-dots');

  if (!quoteTextEl || !quoteAuthorEl) return;

  function renderQuote(index) {
    const quotesList = INSPIRATIONAL_QUOTES[currentLang] || INSPIRATIONAL_QUOTES['en'];
    currentQuoteIndex = index % quotesList.length;
    const item = quotesList[currentQuoteIndex];

    quoteTextEl.style.opacity = '0';
    quoteAuthorEl.style.opacity = '0';

    setTimeout(() => {
      quoteTextEl.textContent = `"${item.quote}"`;
      quoteAuthorEl.textContent = `— ${item.author}`;
      quoteTextEl.style.opacity = '1';
      quoteAuthorEl.style.opacity = '1';

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.quote-dot');
        dots.forEach((dot, dIdx) => {
          dot.classList.toggle('active', dIdx === currentQuoteIndex);
        });
      }
    }, 300);
  }

  window.updateQuoteForLang = function(lang) {
    const quotesList = INSPIRATIONAL_QUOTES[lang] || INSPIRATIONAL_QUOTES['en'];
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      quotesList.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `quote-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Quote ${idx + 1}`);
        dot.addEventListener('click', () => renderQuote(idx));
        dotsContainer.appendChild(dot);
      });
    }
    renderQuote(currentQuoteIndex);
  };

  updateQuoteForLang(currentLang);

  if (quoteTimer) clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    const quotesList = INSPIRATIONAL_QUOTES[currentLang] || INSPIRATIONAL_QUOTES['en'];
    renderQuote((currentQuoteIndex + 1) % quotesList.length);
  }, 6000);
}

/* ==========================================================================
   6. DYNAMIC CONFIG BINDING
   ========================================================================== */
function initDynamicConfig() {
  if (typeof ZHANANG_CONFIG === 'undefined') return;

  const waLinks = document.querySelectorAll('.js-whatsapp-link');
  waLinks.forEach(link => {
    const text = encodeURIComponent(ZHANANG_CONFIG.whatsappMessage);
    link.href = `https://wa.me/${ZHANANG_CONFIG.whatsappNumber}?text=${text}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const phoneEls = document.querySelectorAll('.js-phone');
  phoneEls.forEach(el => {
    if (el.tagName === 'A') {
      el.href = `tel:${ZHANANG_CONFIG.phone.replace(/\s+/g, '')}`;
    }
    el.textContent = ZHANANG_CONFIG.phone;
  });

  const emailEls = document.querySelectorAll('.js-email');
  emailEls.forEach(el => {
    if (el.tagName === 'A') {
      el.href = `mailto:${ZHANANG_CONFIG.email}`;
    }
    el.textContent = ZHANANG_CONFIG.email;
  });

  const portalBtns = document.querySelectorAll('.js-portal-url');
  portalBtns.forEach(btn => {
    btn.href = ZHANANG_CONFIG.portalUrl;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  const mapLinks = document.querySelectorAll('.js-map-url');
  mapLinks.forEach(link => {
    link.href = ZHANANG_CONFIG.googleMapsDirectionsUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const addressEls = document.querySelectorAll('.js-address');
  addressEls.forEach(el => {
    el.textContent = ZHANANG_CONFIG.address;
  });
}

/* ==========================================================================
   7. CLIENT CONTACT FORM HANDLER
   ========================================================================== */
function initContactFormHandler() {
  const contactForm = document.getElementById('contact-inquiry-form');
  const formResponse = document.getElementById('form-response');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const phone = document.getElementById('form-phone')?.value.trim();
    const course = document.getElementById('form-course')?.value;
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      if (formResponse) {
        formResponse.className = 'form-alert alert-error';
        formResponse.textContent = currentLang === 'hi' 
          ? 'कृपया सभी आवश्यक फ़ील्ड (नाम, ईमेल, संदेश) भरें।' 
          : 'Please complete all required fields (Name, Email, Message).';
        formResponse.style.display = 'block';
      }
      return;
    }

    const subject = encodeURIComponent(`Inquiry from Website: ${course || 'General Meditation Course'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCourse Interest: ${course || 'General'}\n\nMessage:\n${message}`);

    if (formResponse) {
      formResponse.className = 'form-alert alert-success';
      formResponse.innerHTML = currentLang === 'hi' ? `
        <strong>धन्यवाद, ${escapeHtml(name)}!</strong><br>
        आपकी पूछताछ विवरण तैयार कर लिया गया है। आपका ईमेल क्लाइंट खोला जा रहा है...<br>
        <small>या सीधे WhatsApp पर <strong>${ZHANANG_CONFIG.phone}</strong> या ईमेल <strong>${ZHANANG_CONFIG.email}</strong> द्वारा संपर्क करें।</small>
      ` : `
        <strong>Thank you, ${escapeHtml(name)}!</strong><br>
        Your inquiry details have been prepared. Opening your default email client...<br>
        <small>Or contact us directly via WhatsApp at <strong>${ZHANANG_CONFIG.phone}</strong> or email <strong>${ZHANANG_CONFIG.email}</strong>.</small>
      `;
      formResponse.style.display = 'block';
    }

    setTimeout(() => {
      window.location.href = `mailto:${ZHANANG_CONFIG.enquiryEmail}?subject=${subject}&body=${body}`;
    }, 1200);
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

/* ==========================================================================
   8. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
