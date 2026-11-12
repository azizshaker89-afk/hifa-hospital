/* =========================================================
   مستشفى الشفاء التخصصي — shared layout, i18n, theme, country
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Storage (safe) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const params = new URLSearchParams(location.search);

  /* ---------- Countries & pricing ---------- */
  // Base prices are written in the HTML in USD (data-price="8"); each country converts and rounds to a clean number.
  // Simple inline SVG flags (emoji flags don't render on Windows)
  const F = (inner) => `<svg class="flag-img" viewBox="0 0 30 20" preserveAspectRatio="none">${inner}</svg>`;
  const FLAGS = {
    EG: F('<rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#CE1126"/><rect y="13.33" width="30" height="6.67" fill="#000"/><circle cx="15" cy="10" r="2" fill="#C09300"/>'),
    SA: F('<rect width="30" height="20" fill="#006C35"/><rect x="8" y="7" width="14" height="2.2" rx="1" fill="#fff"/><rect x="9" y="12" width="12" height="1.2" fill="#fff"/>'),
    AE: F('<rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#00732F"/><rect y="13.33" width="30" height="6.67" fill="#000"/><rect width="8" height="20" fill="#FF0000"/>'),
    KW: F('<rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#007A3D"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/><path d="M0 0l8 6.67v6.66L0 20z" fill="#000"/>'),
    JO: F('<rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#000"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/><path d="M0 0l14 10L0 20z" fill="#CE1126"/><circle cx="4.5" cy="10" r="1.3" fill="#fff"/>')
  };
  const COUNTRIES = {
    EG: { flag: "🇪🇬", ar: "مصر", en: "Egypt", cur: { ar: "جنيه", en: "EGP" }, rate: 50, step: 50, phone: "19555", dial: "+20" },
    SA: { flag: "🇸🇦", ar: "السعودية", en: "Saudi Arabia", cur: { ar: "ريال", en: "SAR" }, rate: 3.75, step: 5, phone: "920012345", dial: "+966" },
    AE: { flag: "🇦🇪", ar: "الإمارات", en: "UAE", cur: { ar: "درهم", en: "AED" }, rate: 3.67, step: 5, phone: "800 7444", dial: "+971" },
    KW: { flag: "🇰🇼", ar: "الكويت", en: "Kuwait", cur: { ar: "دينار", en: "KWD" }, rate: 0.31, step: 1, phone: "1844 444", dial: "+965" },
    JO: { flag: "🇯🇴", ar: "الأردن", en: "Jordan", cur: { ar: "دينار", en: "JOD" }, rate: 0.71, step: 1, phone: "06 500 7444", dial: "+962" }
  };

  /* ---------- Dictionary ---------- */
  const T = {
    ar: {
      "brand.name": "مستشفى <b>الشفاء</b> التخصصي",
      "brand.tag": "رعاية تبدأ من القلب",
      "nav.home": "الرئيسية", "nav.doctors": "الأطباء", "nav.departments": "الأقسام",
      "nav.about": "عن المستشفى", "nav.contact": "تواصل معنا",
      "cta.book": "احجز موعدك الآن", "cta.bookShort": "احجز الآن",
      "tool.lang": "العربية", "tool.theme": "تغيير المظهر",
      "footer.copy": "مستشفى الشفاء التخصصي © جميع الحقوق محفوظة 2026",
      "menu": "القائمة"
    },
    en: {
      "brand.name": "Al <b>Shifa</b> Specialized Hospital",
      "brand.tag": "Care that starts from the heart",
      "nav.home": "Home", "nav.doctors": "Doctors", "nav.departments": "Departments",
      "nav.about": "About Us", "nav.contact": "Contact Us",
      "cta.book": "Book Your Appointment", "cta.bookShort": "Book Now",
      "tool.lang": "English", "tool.theme": "Toggle theme",
      "footer.copy": "Al Shifa Specialized Hospital © All rights reserved 2026",
      "menu": "Menu"
    }
  };
  // Pages register their own strings: window.SHIFA_I18N = { ar: {...}, en: {...} }
  if (window.SHIFA_I18N) {
    Object.assign(T.ar, window.SHIFA_I18N.ar || {});
    Object.assign(T.en, window.SHIFA_I18N.en || {});
  }

  /* ---------- State ---------- */
  const sysDark = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  const state = {
    lang: params.get("lang") || store.get("shifa.lang") || "ar",
    theme: params.get("theme") || store.get("shifa.theme") || (sysDark ? "dark" : "light"),
    country: params.get("country") || store.get("shifa.country") || "EG"
  };
  if (!T[state.lang]) state.lang = "ar";
  if (!COUNTRIES[state.country]) state.country = "EG";

  /* ---------- Icons ---------- */
  const I = {
    globe: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.9a15.6 15.6 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8ZM12 4a13.9 13.9 0 0 1 1.9 4h-3.8A13.9 13.9 0 0 1 12 4ZM4.3 14a8 8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3Zm.8 2h2.9a15.6 15.6 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16ZM8 8H5.1a8 8 0 0 1 4.3-3.6A15.6 15.6 0 0 0 8 8Zm4 12a13.9 13.9 0 0 1-1.9-4h3.8A13.9 13.9 0 0 1 12 20Zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4Zm.3 5.6A15.6 15.6 0 0 0 16 16h2.9a8 8 0 0 1-4.3 3.6ZM16.3 14a16.5 16.5 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4Z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><path d="m6 9 6 6 6-6"/></svg>',
    moon: '<svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 10h18M9 15l2 2 4-4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 5.9c-.8.4-1.7.6-2.6.7a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1A4.5 4.5 0 0 0 11.8 9 12.8 12.8 0 0 1 2.5 4.3a4.5 4.5 0 0 0 1.4 6c-.7 0-1.4-.2-2-.6 0 2.2 1.5 4.1 3.6 4.5-.7.2-1.4.2-2 .1a4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 19.3 12.8 12.8 0 0 0 7.9 21.3c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.2c0-.8.2-1.3 1.4-1.3H17V2h-2.6C11.3 2 10 3.6 10 6.3V8H8v3h2v11h4V11h2.8l.4-3H14Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5Z"/></svg>'
  };
  window.SHIFA_ICONS = I;

  /* ---------- Layout templates ---------- */
  const page = document.body.dataset.page || "";
  const navItems = [
    ["home", "index.html"], ["doctors", "doctors.html"], ["departments", "departments.html"],
    ["about", "about.html"], ["contact", "contact.html"]
  ];
  const logoHTML = () => `
    <a class="logo" href="index.html" aria-label="home">
      <img src="assets/img/logo-icon.svg" alt="">
      <span class="logo-text"><span class="logo-name" data-i18n-html="brand.name"></span><span class="logo-tag" data-i18n="brand.tag"></span></span>
    </a>`;
  const navHTML = () => navItems.map(([k, href]) =>
    `<a href="${href}" class="${page === k ? "active" : ""}" data-i18n="nav.${k}"></a>`).join("");
  const countryMenu = () => Object.entries(COUNTRIES).map(([code, c]) =>
    `<button data-country="${code}">${FLAGS[code]}<span data-cname="${code}"></span></button>`).join("");

  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="container header-inner">
        ${logoHTML()}
        <nav class="main-nav">${navHTML()}</nav>
        <div class="header-tools">
          <div class="dropdown hide-tablet" data-dd="country">
            <button class="tool-btn" data-dd-toggle><span class="flag" data-current-flag></span>${I.chevron}</button>
            <div class="dropdown-menu">${countryMenu()}</div>
          </div>
          <div class="dropdown hide-tablet" data-dd="lang">
            <button class="tool-btn" data-dd-toggle>${I.globe}<span data-i18n="tool.lang"></span>${I.chevron}</button>
            <div class="dropdown-menu">
              <button data-lang="ar"><span class="flag">ع</span>العربية</button>
              <button data-lang="en"><span class="flag">En</span>English</button>
            </div>
          </div>
          <button class="tool-btn" data-theme-toggle data-i18n-aria="tool.theme">${I.moon}${I.sun}</button>
          <a class="btn btn-cta" href="booking.html">${I.calendar}<span class="cta-long" data-i18n="cta.book"></span><span class="cta-short" data-i18n="cta.bookShort"></span></a>
          <button class="tool-btn menu-toggle" data-drawer-open data-i18n-aria="menu">${I.menu}</button>
        </div>
      </div>`;
    const drawer = document.createElement("div");
    drawer.innerHTML = `
      <div class="drawer-backdrop" data-drawer-close></div>
      <aside class="drawer">
        <div class="drawer-head">${logoHTML()}<button class="tool-btn" data-drawer-close>${I.close}</button></div>
        <nav>${navHTML()}</nav>
        <div class="drawer-tools">
          <button class="tool-btn" data-lang-toggle>${I.globe}<span data-other-lang></span></button>
          <button class="tool-btn" data-theme-toggle>${I.moon}${I.sun}</button>
          <div class="dropdown" data-dd="country2">
            <button class="tool-btn" data-dd-toggle><span class="flag" data-current-flag></span><span data-current-cname></span>${I.chevron}</button>
            <div class="dropdown-menu" style="inset-inline-end:auto;inset-inline-start:0">${countryMenu()}</div>
          </div>
        </div>
        <a class="btn btn-cta btn-lg btn-block" href="booking.html">${I.calendar}<span data-i18n="cta.book"></span></a>
      </aside>`;
    document.body.appendChild(drawer);
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="socials">
          <a href="#" aria-label="LinkedIn">${I.linkedin}</a>
          <a href="#" aria-label="Instagram">${I.instagram}</a>
          <a href="#" aria-label="Facebook">${I.facebook}</a>
          <a href="#" aria-label="X">${I.twitter}</a>
        </div>
        <div class="footer-logo">${logoHTML()}</div>
        <p class="copyright" data-i18n="footer.copy"></p>
      </div>`;
  }

  /* ---------- Apply state ---------- */
  // USD base price -> clean local amount (rounded to the country's step)
  function localAmount(usd) {
    const c = COUNTRIES[state.country];
    return Math.max(c.step, Math.round((usd * c.rate) / c.step) * c.step);
  }
  // format an amount that is already in local currency
  function formatLocal(v) {
    const c = COUNTRIES[state.country];
    const n = (Math.round(v * 100) / 100).toLocaleString("en-US");
    return state.lang === "ar" ? `${n} ${c.cur.ar}` : `${c.cur.en} ${n}`;
  }
  const formatPrice = (usd) => formatLocal(localAmount(usd));
  window.SHIFA = { state, COUNTRIES, formatPrice, localAmount, formatLocal, t: (k) => (T[state.lang][k] ?? k) };

  function apply() {
    const L = T[state.lang];
    const root = document.documentElement;
    root.lang = state.lang;
    root.dir = state.lang === "ar" ? "rtl" : "ltr";
    root.dataset.theme = state.theme;
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = L[el.dataset.i18n]; if (v != null) el.textContent = v; });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { const v = L[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { const v = L[el.dataset.i18nPh]; if (v != null) el.placeholder = v; });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { const v = L[el.dataset.i18nAria]; if (v != null) el.setAttribute("aria-label", v); });
    document.querySelectorAll("[data-price]").forEach(el => { el.textContent = formatPrice(parseFloat(el.dataset.price)); });
    const c = COUNTRIES[state.country];
    document.querySelectorAll("[data-phone]").forEach(el => { el.textContent = c.phone; });
    document.querySelectorAll("[data-current-flag]").forEach(el => { el.innerHTML = FLAGS[state.country]; });
    document.querySelectorAll("[data-current-cname]").forEach(el => { el.textContent = c[state.lang]; });
    document.querySelectorAll("[data-cname]").forEach(el => { el.textContent = COUNTRIES[el.dataset.cname][state.lang]; });
    document.querySelectorAll("[data-country]").forEach(el => el.classList.toggle("selected", el.dataset.country === state.country));
    document.querySelectorAll("[data-lang]").forEach(el => el.classList.toggle("selected", el.dataset.lang === state.lang));
    document.querySelectorAll("[data-other-lang]").forEach(el => { el.textContent = state.lang === "ar" ? "English" : "العربية"; });
    const title = L["page.title"];
    document.title = (title ? title + " | " : "") + L["brand.name"].replace(/<\/?b>/g, "");
    document.dispatchEvent(new CustomEvent("shifa:apply", { detail: state }));
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-dd-toggle],[data-lang],[data-lang-toggle],[data-country],[data-theme-toggle],[data-drawer-open],[data-drawer-close]");
    if (!t) { document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open")); return; }
    if (t.hasAttribute("data-dd-toggle")) {
      const dd = t.closest(".dropdown");
      const wasOpen = dd.classList.contains("open");
      document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
      dd.classList.toggle("open", !wasOpen);
      return;
    }
    if (t.dataset.lang) { state.lang = t.dataset.lang; store.set("shifa.lang", state.lang); }
    if (t.hasAttribute("data-lang-toggle")) { state.lang = state.lang === "ar" ? "en" : "ar"; store.set("shifa.lang", state.lang); }
    if (t.dataset.country) { state.country = t.dataset.country; store.set("shifa.country", state.country); }
    if (t.hasAttribute("data-theme-toggle")) { state.theme = state.theme === "dark" ? "light" : "dark"; store.set("shifa.theme", state.theme); }
    if (t.hasAttribute("data-drawer-open")) document.body.classList.add("drawer-open");
    if (t.hasAttribute("data-drawer-close")) document.body.classList.remove("drawer-open");
    document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
    apply();
  });

  apply();
})();
