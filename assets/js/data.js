/* =========================================================
   Shared data: specialties, doctors, slots, icons + doctor card template.
   Loaded before main.js on every page that shows doctors.
   Prices are in USD and converted per country by SHIFA.formatPrice().
   ========================================================= */
(function () {
  "use strict";
  const IC = {
    clinic: '<svg class="doc-type" viewBox="0 0 56 56" fill="none" aria-hidden="true"><rect x="8" y="16" width="40" height="34" rx="5" stroke="currentColor" stroke-width="4"/><path d="M20 16V10a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6" stroke="currentColor" stroke-width="4"/><path d="M28 25v16M20 33h16" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
    star: '<svg class="ic-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3.2" fill="currentColor"/></svg>',
    money: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M3 12.2V4a1 1 0 0 1 1-1h8.2a1 1 0 0 1 .7.3l8.4 8.4a1.5 1.5 0 0 1 0 2.1l-7.5 7.5a1.5 1.5 0 0 1-2.1 0L3.3 12.9a1 1 0 0 1-.3-.7Z"/><circle cx="8" cy="8" r="1.8" fill="currentColor"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
  };

  const SPECS = {
    heart: { ar: "القلب والأوعية الدموية", en: "Cardiology" },
    peds: { ar: "طب الأطفال", en: "Pediatrics" },
    ortho: { ar: "العظام", en: "Orthopedics" },
    derm: { ar: "الجلدية والتجميل", en: "Dermatology" },
    obgyn: { ar: "النساء والتوليد", en: "Obstetrics & Gynecology" },
    internal: { ar: "الباطنة", en: "Internal Medicine" },
    dental: { ar: "الأسنان", en: "Dentistry" },
    neuro: { ar: "المخ والأعصاب", en: "Neurology" },
    ent: { ar: "الأنف والأذن والحنجرة", en: "ENT" },
    eye: { ar: "الرمد", en: "Ophthalmology" },
    psych: { ar: "الطب النفسي", en: "Psychiatry" },
    uro: { ar: "المسالك البولية", en: "Urology" }
  };

  // Team size and one-line description per department (departments page)
  const SPEC_INFO = {
    heart: { team: 14, ar: "قسطرة القلب وتركيب الدعامات ورسم القلب بالمجهود ومتابعة ضغط الدم.", en: "Cardiac catheterization, stents, stress ECG and blood pressure care." },
    peds: { team: 12, ar: "متابعة نمو الطفل وحديثي الولادة والتطعيمات وحضانات مجهزة.", en: "Child growth checks, newborn care, vaccinations and a fully equipped NICU." },
    ortho: { team: 10, ar: "تغيير المفاصل وجراحات العمود الفقري وإصابات الملاعب بالمنظار.", en: "Joint replacement, spine surgery and arthroscopic sports-injury repair." },
    derm: { team: 8, ar: "علاج حب الشباب والأكزيما وتساقط الشعر وجلسات الليزر.", en: "Acne, eczema and hair-loss treatment, plus laser sessions." },
    obgyn: { team: 11, ar: "متابعة الحمل والولادة الطبيعية والقيصرية وعلاج تأخر الإنجاب.", en: "Pregnancy follow-up, natural and C-section delivery, fertility care." },
    internal: { team: 16, ar: "تشخيص أمراض السكر والضغط والجهاز الهضمي ومتابعة الحالات المزمنة.", en: "Diabetes, hypertension and digestive care, with chronic-condition follow-up." },
    dental: { team: 9, ar: "حشو وعلاج العصب والتقويم والزراعة وتجميل الأسنان.", en: "Fillings, root canals, braces, implants and cosmetic dentistry." },
    neuro: { team: 7, ar: "علاج الصداع النصفي والصرع والجلطات ورسم المخ والأعصاب.", en: "Migraine, epilepsy and stroke care, with EEG and nerve studies." },
    ent: { team: 6, ar: "الجيوب الأنفية واللوز وقياس السمع وجراحات الأنف بالمنظار.", en: "Sinus and tonsil care, hearing tests and endoscopic nasal surgery." },
    eye: { team: 8, ar: "فحص النظر وتصحيحه بالليزر وجراحات المياه البيضاء والجلوكوما.", en: "Eye exams, laser vision correction, cataract and glaucoma surgery." },
    psych: { team: 5, ar: "جلسات فردية لعلاج القلق والاكتئاب واضطرابات النوم في خصوصية تامة.", en: "Private one-to-one care for anxiety, depression and sleep disorders." },
    uro: { team: 6, ar: "تفتيت حصوات الكلى وعلاج البروستاتا بالمنظار والتقنيات الحديثة.", en: "Kidney stone lithotripsy and endoscopic prostate treatment." }
  };
  const g = (inner) => `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">${inner}</svg>`;
  const SW = 'stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"';
  const SPEC_ICONS = {
    heart: g(`<path d="M24 41C10 31 5 24 5 16.5 5 10.6 9.6 6 15.3 6c3.8 0 6.6 2 8.7 4.9C26.1 8 28.9 6 32.7 6 38.4 6 43 10.6 43 16.5 43 24 38 31 24 41Z" fill="currentColor"/><path d="M11 21h7l3-6 5 12 3-6h8" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`),
    peds: g(`<circle cx="24" cy="26" r="15" fill="currentColor"/><path d="M24 11c0-4 4-5 6-3" ${SW}/><circle cx="19" cy="24" r="2" fill="#fff"/><circle cx="29" cy="24" r="2" fill="#fff"/><path d="M19 31c3 3 7 3 10 0" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`),
    ortho: g(`<g transform="rotate(-45 24 24)" fill="currentColor"><rect x="13" y="20" width="22" height="8" rx="2"/><circle cx="12" cy="19" r="5.5"/><circle cx="12" cy="29" r="5.5"/><circle cx="36" cy="19" r="5.5"/><circle cx="36" cy="29" r="5.5"/></g>`),
    derm: g(`<path d="M22 6C16 15 11 21 11 28a11 11 0 0 0 22 0c0-7-5-13-11-22Z" fill="currentColor"/><path d="M38 6v8M34 10h8M40 22v5M37.5 24.5h5" ${SW}/><path d="M17 29a5 5 0 0 0 5 5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`),
    obgyn: g(`<circle cx="24" cy="17" r="11" ${SW}/><path d="M24 28v14M17 35h14" ${SW}/><path d="M24 22.5c-4-2.6-6-4.5-6-7 0-1.7 1.3-3 3-3 1.3 0 2.3.7 3 1.8.7-1.1 1.7-1.8 3-1.8 1.7 0 3 1.3 3 3 0 2.5-2 4.4-6 7Z" fill="currentColor"/>`),
    internal: g(`<path d="M12 6v12a8 8 0 0 0 16 0V6" ${SW}/><path d="M20 26v6a9 9 0 0 0 18 0v-4" ${SW}/><circle cx="38" cy="23" r="5" fill="currentColor"/>`),
    dental: g(`<path d="M16 7c-5 0-8 4-7 10 1 5 2 8 3 14 .5 3 1 7 3.5 7s2.5-4 3-8c.4-3 1-5 2.5-5s2.1 2 2.5 5c.5 4 .5 8 3 8s3-4 3.5-7c1-6 2-9 3-14 1-6-2-10-7-10-3 0-4 1.5-6 1.5S19 7 16 7Z" fill="currentColor"/>`),
    neuro: g(`<path d="M23 8c-4-3-10-1-11 4-4 1-6 6-3 10-2 4 0 9 5 10 1 5 6 7 9 5V8Z" fill="currentColor"/><path d="M25 8c4-3 10-1 11 4 4 1 6 6 3 10 2 4 0 9-5 10-1 5-6 7-9 5V8Z" fill="currentColor" opacity=".6"/><path d="M15 17c3 0 4 2 4 4M14 27c3 0 5-1 6-3M33 17c-3 0-4 2-4 4M34 27c-3 0-5-1-6-3" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`),
    ent: g(`<path d="M14 19a11 11 0 1 1 22 0c0 5-3 7-6 9.5S27 33 27 36a6 6 0 0 1-11 3" ${SW}/><path d="M20 19a5 5 0 0 1 10 0c0 3-3 3-3 6" ${SW}/>`),
    eye: g(`<path d="M3 24s7.5-13 21-13 21 13 21 13-7.5 13-21 13S3 24 3 24Z" ${SW}/><circle cx="24" cy="24" r="7.5" fill="currentColor"/><circle cx="26.5" cy="21.5" r="2.2" fill="#fff"/>`),
    psych: g(`<path d="M27 42v-7h5a3 3 0 0 0 3-3v-5l4-1-4-7c0-9-7-14-15-14S6 11 6 20c0 6 3 10 7 13v9" fill="currentColor"/><path d="M21 25c-4.5-3-7-5.2-7-8a3.3 3.3 0 0 1 3.4-3.3c1.5 0 2.7.8 3.6 2 .9-1.2 2.1-2 3.6-2A3.3 3.3 0 0 1 28 17c0 2.8-2.5 5-7 8Z" fill="#fff"/>`),
    uro: g(`<path d="M18 8c-7 0-11 7-11 15s4 15 11 15c4 0 6-3 6-6 0-4-4-5-4-9s4-5 4-9c0-4-3-6-6-6Z" fill="currentColor"/><path d="M30 8c7 0 11 7 11 15s-4 15-11 15c-4 0-6-3-6-6 0-4 4-5 4-9s-4-5-4-9c0-4 3-6 6-6Z" fill="currentColor" opacity=".6"/>`)
  };

  // Date and time behind each SLOTS entry (day offset from "today" = Thu 12 Nov 2026, 24h time)
  const TODAY = new Date(2026, 10, 12);
  const SLOT_DT = [[0, "17:10"], [1, "14:00"], [2, "19:00"], [0, "20:30"], [1, "11:00"], [3, "10:00"], [4, "18:00"]];

  // slot: index of the earliest slot in SLOTS; times: other open times shown under "Choose another time"
  const DOCTORS = [
    { id: "karim", spec: "heart", fee: 8, rating: 4.9, views: 1240, slot: 0, times: [1, 3, 4],
      ar: { n: "د. كريم منصور", s: "استشاري أمراض القلب", b: "استشاري القلب والقسطرة التداخلية، خبرة 18 سنة في علاج أمراض الشرايين." },
      en: { n: "Dr. Karim Mansour", s: "Cardiology Consultant", b: "Interventional cardiology consultant with 18 years treating coronary disease." } },
    { id: "salma", spec: "peds", fee: 6, rating: 4.8, views: 980, slot: 1, times: [3, 4, 5],
      ar: { n: "د. سلمى عادل", s: "استشاري طب الأطفال", b: "متخصصة في متابعة نمو الأطفال وحديثي الولادة والتطعيمات." },
      en: { n: "Dr. Salma Adel", s: "Pediatrics Consultant", b: "Specialist in child growth, newborn care and vaccinations." } },
    { id: "yousef", spec: "ortho", fee: 7, rating: 4.9, views: 1530, slot: 2, times: [4, 5, 6],
      ar: { n: "د. يوسف حمدي", s: "استشاري جراحة العظام", b: "جراحة المفاصل والعمود الفقري وإصابات الملاعب بالمنظار." },
      en: { n: "Dr. Youssef Hamdy", s: "Orthopedic Surgery Consultant", b: "Joint, spine and arthroscopic sports-injury surgery." } },
    { id: "nour", spec: "derm", fee: 6, rating: 4.7, views: 860, slot: 0, times: [1, 2, 5],
      ar: { n: "د. نور الشريف", s: "أخصائي الجلدية والتجميل", b: "علاج مشاكل البشرة والشعر وجلسات الليزر والتجميل غير الجراحي." },
      en: { n: "Dr. Nour El-Sherif", s: "Dermatology Specialist", b: "Skin and hair treatment, laser sessions and non-surgical aesthetics." } },
    { id: "hala", spec: "obgyn", fee: 8, rating: 5.0, views: 2110, slot: 1, times: [3, 5, 6],
      ar: { n: "د. هالة فتحي", s: "استشاري النساء والتوليد", b: "متابعة الحمل والولادة الطبيعية والقيصرية وعلاج تأخر الإنجاب." },
      en: { n: "Dr. Hala Fathy", s: "OB-GYN Consultant", b: "Pregnancy follow-up, natural and C-section delivery, fertility care." } },
    { id: "mona", spec: "internal", fee: 6, rating: 4.8, views: 1075, slot: 2, times: [4, 5, 6],
      ar: { n: "د. منى رجب", s: "استشاري الباطنة", b: "تشخيص وعلاج أمراض الباطنة والسكر والضغط ومتابعة الحالات المزمنة." },
      en: { n: "Dr. Mona Ragab", s: "Internal Medicine Consultant", b: "Diagnosis and care for diabetes, hypertension and chronic conditions." } },
    { id: "ahmed", spec: "neuro", fee: 9, rating: 4.9, views: 1420, slot: 1, times: [3, 4, 6],
      ar: { n: "د. أحمد السيد", s: "استشاري المخ والأعصاب", b: "علاج الصداع النصفي والصرع والجلطات ومتابعة أمراض الأعصاب الطرفية." },
      en: { n: "Dr. Ahmed El-Sayed", s: "Neurology Consultant", b: "Migraine, epilepsy and stroke care, plus peripheral nerve disorders." } },
    { id: "omar", spec: "dental", fee: 5, rating: 4.8, views: 1190, slot: 0, times: [1, 2, 4],
      ar: { n: "د. عمر خالد", s: "أخصائي طب وتجميل الأسنان", b: "حشو العصب والتركيبات وزراعة الأسنان وابتسامة هوليود." },
      en: { n: "Dr. Omar Khaled", s: "Cosmetic Dentistry Specialist", b: "Root canals, crowns, dental implants and smile makeovers." } },
    { id: "reem", spec: "ent", fee: 6, rating: 4.7, views: 740, slot: 2, times: [3, 5, 6],
      ar: { n: "د. ريم حسن", s: "أخصائي الأنف والأذن والحنجرة", b: "علاج الجيوب الأنفية واللوز وضعف السمع ومشاكل الأحبال الصوتية." },
      en: { n: "Dr. Reem Hassan", s: "ENT Specialist", b: "Sinus, tonsil, hearing-loss and vocal-cord problems." } },
    { id: "dina", spec: "eye", fee: 6, rating: 4.9, views: 1310, slot: 1, times: [2, 4, 5],
      ar: { n: "د. دينا مصطفى", s: "استشاري طب وجراحة العيون", b: "تصحيح النظر بالليزر وجراحات المياه البيضاء ومتابعة الجلوكوما." },
      en: { n: "Dr. Dina Mostafa", s: "Ophthalmology Consultant", b: "Laser vision correction, cataract surgery and glaucoma care." } },
    { id: "mariam", spec: "psych", fee: 10, rating: 5.0, views: 890, slot: 0, times: [3, 4, 6],
      ar: { n: "د. مريم إبراهيم", s: "استشاري الطب النفسي", b: "علاج القلق والاكتئاب واضطرابات النوم بجلسات فردية في خصوصية تامة." },
      en: { n: "Dr. Mariam Ibrahim", s: "Psychiatry Consultant", b: "Private one-to-one care for anxiety, depression and sleep disorders." } },
    { id: "sami", spec: "uro", fee: 7, rating: 4.8, views: 1020, slot: 2, times: [1, 4, 5],
      ar: { n: "د. سامي عبد الله", s: "استشاري المسالك البولية", b: "علاج حصوات الكلى والبروستاتا بالمنظار والتقنيات الحديثة." },
      en: { n: "Dr. Sami Abdallah", s: "Urology Consultant", b: "Endoscopic treatment of kidney stones and prostate conditions." } }
  ];

  const SLOTS = {
    ar: ["النهارده الساعة 05:10 م", "بكرة الساعة 02:00 م", "السبت 14/11 الساعة 07:00 م", "النهارده الساعة 08:30 م",
         "بكرة الساعة 11:00 ص", "الأحد 15/11 الساعة 10:00 ص", "الاثنين 16/11 الساعة 06:00 م"],
    en: ["Today at 05:10 PM", "Tomorrow at 02:00 PM", "Sat 14/11 at 07:00 PM", "Today at 08:30 PM",
         "Tomorrow at 11:00 AM", "Sun 15/11 at 10:00 AM", "Mon 16/11 at 06:00 PM"]
  };

  const STR = {
    ar: { "doc.fee": "سعر الكشف", "doc.call": "اتصل للحجز", "doc.note": "تقدر تحجز كشف في العيادة أو استشارة أونلاين",
          "doc.more": "اختار ميعاد تاني", "doc.views": "زيارة", "doc.book": "احجز", "doc.times": "مواعيد متاحة تانية" },
    en: { "doc.fee": "Consultation fee", "doc.call": "Call to book", "doc.note": "Book an in-clinic visit or an online consultation",
          "doc.more": "Choose another time", "doc.views": "visits", "doc.book": "Book", "doc.times": "Other open times" }
  };
  window.SHIFA_I18N = window.SHIFA_I18N || { ar: {}, en: {} };
  Object.assign(window.SHIFA_I18N.ar, STR.ar);
  Object.assign(window.SHIFA_I18N.en, STR.en);

  function doctorCard(d) {
    const S = window.SHIFA, L = S.state.lang, t = S.t;
    const book = (i) => `booking.html?doctor=${d.id}&slot=${i}`;
    const btnSlot = (s) => (L === "en" && /^(Today|Tomorrow)/.test(s)) ? s[0].toLowerCase() + s.slice(1) : s;
    return `
      <article class="doc-card" data-doc="${d.id}">
        <div class="doc-top">
          <div class="doc-head"><div class="doc-photo"><img src="assets/img/dr-${d.id}.jpg" alt="${d[L].n}"></div>${IC.clinic}</div>
          <h3 class="doc-name">${d[L].n}</h3>
          <p class="doc-spec">${d[L].s}</p>
          <p class="doc-bio">${d[L].b}</p>
        </div>
        <div class="doc-stats">
          <span>${IC.star}${d.rating.toFixed(1)}</span>
          <span>${IC.eye}${d.views.toLocaleString("en-US")} ${t("doc.views")}</span>
        </div>
        <div class="doc-info">
          <div>${IC.money}<small>${t("doc.fee")}</small><b>${S.formatPrice(d.fee)}</b></div>
          <div>${IC.phone}<small>${t("doc.call")}</small><b>${S.COUNTRIES[S.state.country].phone}</b></div>
        </div>
        <div class="doc-bottom">
          <p class="doc-note">${t("doc.note")}</p>
          <a class="btn btn-cta" href="${book(d.slot)}">${t("doc.book")} ${btnSlot(SLOTS[L][d.slot])}</a>
          <button class="doc-more" type="button" aria-expanded="false">${t("doc.more")}${IC.chev}</button>
          <div class="doc-times" hidden>
            <small>${t("doc.times")}</small>
            <div>${d.times.map(i => `<a href="${book(i)}">${SLOTS[L][i]}</a>`).join("")}</div>
          </div>
        </div>
      </article>`;
  }

  // "Choose another time" expands the extra slots under the card
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".doc-more");
    if (!btn) return;
    const panel = btn.nextElementSibling;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });

  window.SHIFA_DATA = { IC, SPECS, SPEC_INFO, SPEC_ICONS, DOCTORS, SLOTS, SLOT_DT, TODAY, doctorCard };
})();
