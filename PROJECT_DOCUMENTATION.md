# Tarteeb-e-Nuzul (ترتیبِ نزولی) — Comprehensive Project Documentation & Technical Roadmap

> **A Community Service Project by Maulana Syed Imon Rizvi**  
> *(ایک خدمتِ خلق پروجیکٹ — مولانا سید آئمن رضوی)*  
> **Live Production URL:** [https://nuzooli.vercel.app](https://nuzooli.vercel.app)  
> **Repository:** `Tarteeb-e-Nuzooli Project`  
> **Last Updated:** September 2026

---

## 1. Executive Summary & Scholarly Mission

**Tarteeb-e-Nuzul (ترتیبِ نزولی)** is an advanced, scholarly digital Quranic platform engineered to study, recite, and contemplate the Holy Quran in its **authentic chronological order of revelation (610–632 CE)** across the 23-year prophetic mission of the Holy Prophet Muhammad (ص).

While the canonical Mushaf order (*Tarteeb-e-Tilawat*) is arranged largely from longest to shortest surahs (as assembled under divine instruction), studying the Quran chronologically (*Tarteeb-e-Nuzul*) unlocks profound dimensions:
1. **Psychological & Pedagogical Transformation**: How the early believing community was formed step-by-step from spiritual awakening in Mecca to constitutional statehood in Medina.
2. **Contextual Intelligence (شانِ نزول)**: How revelations responded to concrete historical crises, inquiries by rabbis and polytheists, battlefield dilemmas, and social milestones.
3. **Gradual Legal Evolution (تدریجِ احکام)**: How divine laws (such as alcohol prohibition, prayer direction, fasting, charity, and defensive struggle) were introduced in gradual educational stages.
4. **The Arc of Reconnection (ربطِ مصحف)**: How multi-part, segmented surahs (e.g. *Surah Al-Alaq 96:1–5* revealed in 610 CE vs *96:6–19* revealed years later) finally reunited into their canonical form.

### Classical Theological Foundations
The chronological sequencing and situational commentaries implemented in this project are strictly rooted in classical Islamic scholarship, Quranic exegesis, and Shia *Ulum al-Qur'an* traditions:
- *Al-Tamhid fi Ulum al-Qur'an* (التمهيد في علوم القرآن) — Ayatollah Muhammad Hadi Ma'rifat
- *Tafsir al-Mizan* (تفسير الميزان) — Allamah Sayyid Muhammad Husayn Tabataba'i
- *Majma' al-Bayan fi Tafsir al-Qur'an* (مجمع البيان) — Allamah Shaykh Tabarsi
- Canonical Hadith records from the Ahl al-Bayt (ع) and early companions.

---

## 2. Technical Stack & Repository Structure

### Core Technologies
- **Frontend Framework**: React 18, TypeScript (Strict Mode enabled, zero lint/type errors)
- **Styling**: Tailwind CSS + Custom Vanilla CSS design tokens
- **Build Tool**: Vite 8 (Ultra-fast HMR and optimized production bundling)
- **Iconography**: Lucide React
- **Audio Architecture**: Custom HTML5 Audio API state engine with global React Context
- **Deployment**: Vercel Serverless Edge Network (`https://nuzooli.vercel.app`) with SPA routing rewrites (`vercel.json`)
- **Accessibility**: WCAG AAA compliant contrast, RTL (Right-to-Left) native layouts, and responsive fluid design for mobile, tablet, and ultra-wide screens.

### Repository Architecture
```text
Tarteeb-e-Nuzooli Project/
├── index.html                           # Root HTML with Google Fonts preloads
├── package.json                         # Dependencies & scripts
├── tsconfig.json                        # Strict TypeScript configuration
├── vite.config.ts                       # Vite bundler configuration
├── vercel.json                          # Vercel SPA rewrites config
├── PROJECT_DOCUMENTATION.md             # Single source of project truth & roadmap
├── public/
│   ├── favicon.ico
│   └── fonts/
└── src/
    ├── App.tsx                          # Root component with Header, Navigation & Tab Routers
    ├── main.tsx                         # React 18 createRoot mounting
    ├── index.css                        # Global Tailwind styles, custom scrolls & keyframes
    ├── context/
    │   └── QuranContext.tsx             # Global state: continuous audio, Qari, reader stream, theme
    ├── types/
    │   └── quran.ts                     # Core TypeScript interfaces for all events & metadata
    ├── data/
    │   ├── chronologicalOrder.ts        # 114 Surahs chronological mapping & metadata
    │   ├── chronologicalVersesData.ts   # Curated milestones & multi-part sister passages
    │   ├── gradualLegislationData.ts    # 5 legal progression tracks & 17 pedagogical stages
    │   ├── thematicEvolutionData.ts     # 8 core themes across 5 historical epochs
    │   ├── asbabCrisisData.ts           # 9 pivotal historical crises & situational intelligence
    │   └── geographicRevelationData.ts  # 16 revelation sites with coordinates & metadata
    └── components/
        ├── Header.tsx                   # Top navigation with branding & quick mode switcher
        ├── Navigation.tsx               # View tabs (Chronological Reader, Mushaf, Perspectives)
        ├── AudioPlayer/
        │   └── StickyAudioBar.tsx       # Bottom persistent audio player with controls & Qari picker
        ├── Reader/
        │   ├── ChronologicalPassageReader.tsx # Dual-stream reader with timeline & sister links
        │   └── MushafCanonicalReader.tsx     # Standard Mushaf catalog (Surahs 1-114)
        └── Perspectives/
            ├── PerspectivesView.tsx           # Multi-perspective dashboard router
            ├── ArcOfReconnectionView.tsx      # Dual-rail chord reconnection diagram
            ├── AsbabCrisisNavigator.tsx       # Situational intelligence & crisis explorer
            ├── ThematicEvolutionHeatmap.tsx   # 8-theme x 5-epoch 2D density matrix
            ├── GeographicRevelationMap.tsx    # 16-site sacred cartographic terrain
            ├── GradualLegislationView.tsx     # 5-track legal evolution progression
            ├── SurahXRayMatrixView.tsx        # Complete vs segmented descent x-ray
            └── PassageFlowView.tsx            # Multi-part passage timeline
```

---

## 3. Implemented Features & Core Analytical Modules

### 📖 3.1. Dual-Stream Chronological Passage Reader
File: `src/components/Reader/ChronologicalPassageReader.tsx`
- **Stream 1: ۳۶ کلیدی تاریخی مقطوعات (36 Curated Milestones)**:
  - Focuses on the defining turning points of prophetic history (Cave Hira, Public Preaching, Boycott in Shi'b Abi Talib, Hijrah, Badr, Uhud, Khandaq, Hudaybiyyah, Mubahalah, and Ghadir Khumm).
  - Highlights segmented revelations where single surahs descended over multiple years.
- **Stream 2: مکمل ۱۱۴ سورتیں تدریجی ترتیب (Complete 114 Surahs & 6,236 Verses)**:
  - Streams every verse and surah in strict chronological revelation rank from #1 (*Al-Alaq*) to #114 (*An-Nasr*).
- **Multi-Translation Engine**:
  - Urdu: Allamah Zeeshan Haider Jawadi, Ayatollah Muhammad Hussain Najafi, Maulana Fateh Muhammad Jalandhary.
  - English: Ali Quli Qara'i, The Clear Quran (Dr. Mustafa Khattab), Saheeh International.
- **Sister Passages Linking**: Interactive cross-reference cards allowing instantaneous jumps between separated sections of the same surah across different historical periods.
- **Visual 23-Year Progression Bar**: Real-time progress bar marking current position in prophetic history.

---

### 🎧 3.2. Continuous Smart Audio Recitation Engine
File: `src/context/QuranContext.tsx` & `src/components/AudioPlayer/StickyAudioBar.tsx`
- **Continuous Auto-Advance (مسلسل خودکار تلاوت)**:
  - As soon as an Ayah finishes playing, the audio engine automatically advances and recites the next Ayah in chronological sequence, crossing passage boundaries and surah boundaries without user intervention.
- **Comprehensive Playback Controls**:
  - Play, Pause, Stop, Previous Ayah (`SkipBack`), Next Ayah (`SkipForward`).
- **World-Renowned Qaris**:
  - Sheikh Mishary Rashid Alafasy
  - Sheikh Abdul Basit Abdul Samad
  - Sheikh Mahmoud Khalil Al-Husary
  - Sheikh Muhammad Siddiq Al-Minshawi
- **Luminous Active Ayah Highlighting**:
  - The reciting verse receives an emerald glowing halo and auto-scrolls smoothly into user focus.

---

### 🧭 3.3. Multi-Perspective Analytics Engine
File: `src/components/Perspectives/PerspectivesView.tsx`

#### 1. The "Arc of Reconnection" Suite (محرابِ ربطِ مصحف — تقابلی نظام)
File: `src/components/Perspectives/ArcOfReconnectionView.tsx`
An advanced 4-way comparative analytical suite allowing multi-dimensional contemplation of the Quran's chronological descent versus canonical assembly:
- **Chart 1: ۲۳ سالہ زمانی و مقطوعات ٹائم لائن (23-Year Historical Timeline Arc)**:
  - Top Rail spans the 23 prophetic years (610–632 CE / 13 BH to 11 AH).
  - Bottom Rail displays canonical Mushaf order (#1 to #114).
  - Supports multi-part converging arcs: segmented surahs (e.g. *Surah Aal-e-Imran*, *Surah Al-Baqarah*, *Surah Al-Ma'idah*, *Surah Al-Muzzammil*) branch out across their authentic historical dates with tiered collision-avoidance callout badges and dotted leader lines connecting to their exact Medinan and Meccan points.
- **Chart 2: ۱۱۴ سورتوں کا خالص تقابلی ربط (Pure 1-to-1 Order Mapping Arc)**:
  - Top Rail displays strict Chronological Revelation Rank (1 to 114: #1 Al-Alaq to #114 An-Nasr).
  - Bottom Rail displays canonical Mushaf order (1 to 114: #1 Al-Fatihah to #114 An-Nas).
  - Provides pure 1-to-1 chord mapping showing direct permutation links between where a surah was revealed and where it resides in the canonical Mushaf.
- **Chart 3: فاصلاتی تغیّر کا طیف (The Delta Displacement Spectrum $\Delta$)**:
  - Quantifies the historical displacement ($\Delta = |\text{Nuzul} - \text{Mushaf}|$) for all 114 chapters.
  - **Zero-Delta Anchors ($\Delta = 0$)**: Celebrates the 3 extraordinary surahs whose chronological rank perfectly matches their canonical Mushaf rank:
    1. *Surah Sad (ص)*: Nuzul #38 ➔ Mushaf #38 ($\Delta = 0$)
    2. *Surah Nuh (نوح)*: Nuzul #71 ➔ Mushaf #71 ($\Delta = 0$)
    3. *Surah Al-Infitar (الانفطار)*: Nuzul #82 ➔ Mushaf #82 ($\Delta = 0$)
  - **Minimal Shifts**: Highlights near-anchors such as *Al-Inshiqaq* ($\Delta=1$), *An-Naba* ($\Delta=2$), *An-Nazi'at* ($\Delta=2$), *Al-Bayyinah* ($\Delta=2$), *Al-Fatihah* ($\Delta=4$), and *An-Nasr* ($\Delta=4$).
  - **Maximum Leapers**: Details massive structural transitions such as *Al-Ma'idah* ($\Delta=107$), *Al-Masad* ($\Delta=105$), *At-Tawbah* ($\Delta=104$), and *Al-Alaq* ($\Delta=95$).
- **Mode 4: تمام تقابلی چارٹس اکٹھے (All Comparative Views Stacked)**: Renders all three charts seamlessly in vertical sequence for exhaustive study.

#### 2. Asbab-un-Nuzul & Crisis Navigator (اسبابِ نزول و تاریخی بحران)
File: `src/components/Perspectives/AsbabCrisisNavigator.tsx` | Data: `src/data/asbabCrisisData.ts`
- Interactive situational intelligence timeline tracing **9 pivotal historical crises**:
  1. **Mount Safa Proclamation & Public Rejection (613 CE)** $\rightarrow$ *Surah Al-Masad (111:1–3)*
  2. **The 3 Riddles of the Rabbis of Yathrib (616 CE)** $\rightarrow$ *Surah Al-Kahf & Al-Isra (17:85)*
  3. **The 3-Year Siege of Shi'b Abi Talib (617–620 CE)** $\rightarrow$ *Surah Hud (11:115) & Yusuf*
  4. **The Day of Criterion at Badr (2 AH / 624 CE)** $\rightarrow$ *Surah Al-Anfal (8:1)*
  5. **Uhud Trauma & Rumor of Prophetic Demise (3 AH / 625 CE)** $\rightarrow$ *Surah Ali 'Imran (3:144)*
  6. **The Slander Crisis & Protection of Dignity (5 AH / 627 CE)** $\rightarrow$ *Surah An-Nur (24:15)*
  7. **Hudaybiyyah Concessions: "Is this a Manifest Victory?" (6 AH / 628 CE)** $\rightarrow$ *Surah Al-Fath (48:1)*
  8. **Christian Delegation of Najran & Event of Mubahalah (9 AH / 631 CE)** $\rightarrow$ *Surah Ali 'Imran (3:61)*
  9. **Ghadir Khumm Ultimatum & Completion of Religion (10 AH / 632 CE)** $\rightarrow$ *Surah Al-Ma'idah (5:67 & 5:3)*
- **3-Phase Situational Anatomy**:
  - *Crisis Trigger (بحرانی سبب)*: Historical provocation in Urdu & English.
  - *Divine Intervention (الٰہی ردعمل و نزولِ وحی)*: Revelatory response and theological pivot.
  - *Timeless Wisdom (حکمتِ نزول و دائمی درس)*: Civilizational lessons.
- Includes multi-category filter tags, instant search bar, scripture spotlight with Jawadi translation, inline Qari audio playback, and 1-click reader jump.

#### 3. Thematic Evolution Heatmap (تطوّرِ مضامین — ۲۳ سالہ موضوعاتی سفر)
File: `src/components/Perspectives/ThematicEvolutionHeatmap.tsx` | Data: `src/data/thematicEvolutionData.ts`
- 2D density matrix mapping **8 core themes** across **5 chronological epochs**:
  1. Tawhid & Monotheism (توحید و معرفتِ الٰہی)
  2. Akhirah & Resurrection (آخرت و حساب و کتاب)
  3. Prophetic Narratives & Warnings (قصص الانبیاء و عبرتیں)
  4. Tazkiyah & Moral Discipline (تزکیۂ نفس و اخلاق)
  5. Social Justice & Rights of Oppressed (سماجی انصاف و حقوقِ مستضعفین)
  6. Shariah, Contracts & Civic Legislation (احکامِ شرعی، معاملات و حدود)
  7. Defense, Sovereignty & War Ethics (دفاع، جہاد اور اصولِ امن)
  8. Wilayah, Leadership & Covenant Completion (ولایت، امامت اور اکمالِ دین)
- Interactive cell modal with density ratings (0% to 100%), historical commentary, scripture evidence, and audio recitation.

#### 4. Geographic Revelation Map (سفرنامۂ وحی — جغرافیائی نقشہ)
File: `src/components/Perspectives/GeographicRevelationMap.tsx` | Data: `src/data/geographicRevelationData.ts`
- Sacred cartographic terrain of Western Arabia (Hijaz) covering **16 pivotal revelation sites**:
  1. Cave of Hira (`#10B981` Emerald)
  2. Dar al-Arqam (`#F59E0B` Amber)
  3. Shi'b Abi Talib (`#EF4444` Crimson)
  4. Cave of Thawr (`#8B5CF6` Violet)
  5. Masjid Quba (`#06B6D4` Cyan)
  6. Masjid an-Nabawi (`#3B82F6` Blue)
  7. Plains of Badr (`#EC4899` Pink)
  8. Mount Uhud (`#F97316` Orange)
  9. Battle of Khandaq (`#14B8A6` Teal)
  10. Al-Hudaybiyyah (`#6366F1` Indigo)
  11. Khaybar Oasis (`#A855F7` Purple)
  12. The Holy Ka'bah (`#D97706` Gold)
  13. Tabuk Northern Frontier (`#0284C7` Sky)
  14. Site of Mubahalah (`#059669` Forest)
  15. Plains of Arafat (`#E11D48` Rose)
  16. Ghadir Khumm (`#84CC16` Lime)
- **Key Architectural Solutions Implemented**:
  - **16 Distinct Signature Colors**: Every site has its own dedicated color.
  - **Zero-Collision HTML Callout Badges**: Eliminated SVG font baseline drift by using native HTML pill badges with leader connector lines from the pins.
  - **Enlarged 16 Sites Cards Grid**: Complete, un-truncated Urdu titles (no more single words like "غار" or "مسجد"), English subtitles, order badges `#1` to `#16`, CE year badges, and active glowing borders.

#### 5. Gradual Legislation Tracker (تدریجِ احکام — The Pedagogy of Divine Law)
File: `src/components/Perspectives/GradualLegislationView.tsx` | Data: `src/data/gradualLegislationData.ts`
- 5 foundational legal pathways covering 17 pedagogical stages:
  1. The 4 Stages of Alcohol Prohibition (15-year pedagogical transition)
  2. Shift of the Qiblah (Jerusalem $\rightarrow$ Ka'bah)
  3. Evolution of Fasting (Abrahamic precedent $\rightarrow$ Fidyah option $\rightarrow$ Universal Ramadan)
  4. Defense, Just Warfare & Peace Ethics (Forbearance $\rightarrow$ Self-defense $\rightarrow$ Code of conduct)
  5. Charity, Infaq & State Zakat (Moral empathy $\rightarrow$ Institutionalized 8 categories)

#### 6. Surah X-Ray Matrix (ایکس رے ڈیش بورڈ)
File: `src/components/Perspectives/SurahXRayMatrixView.tsx`
- Complete descent (نزولِ کلی) vs Segmented multi-part descent (نزولِ تدریجی).

#### 7. Passage Flow Timeline (نزولی تسلسل و مقطوعات)
File: `src/components/Perspectives/PassageFlowView.tsx`
- Visual sister passages linking multi-part revelations across years.

---

## 4. Key Architectural Learnings & Design Decisions

1. **SVG vs. HTML Coordinate Overlays for Non-Latin Typography**:
   - Complex Nastaliq and Arabic Uthmani fonts undergo rendering drift in standard SVG `<text>` elements across browsers.
   - **Best Practice**: Render spatial geography and vectors in SVG, but overlay typography callouts as HTML elements with CSS percentage positioning (`left: ${(x + dx)/W * 100}%`, `top: ${(y + dy)/H * 100}%`, `transform: translate(-50%, -50%)`).
2. **Title Truncation in Localized UI**:
   - Never use `.split(' ')[0]` on Urdu or Arabic names (e.g. `غارِ حرا` becomes `غار`, `مسجدِ قبا` becomes `مسجد`). Always maintain dedicated `shortNameUrdu` and `shortNameEnglish` fields in data models.
3. **Continuous Audio State Transitions**:
   - Audio state must be hosted at the top context level (`QuranContext.tsx`) rather than inside localized readers, ensuring smooth audio playback when switching between Perspectives, Readers, and Catalog views.
4. **Vercel SPA Client-Side Routing**:
   - `vercel.json` rewrite rule `{ "source": "/(.*)", "destination": "/index.html" }` must remain active so deep links and manual browser refreshes don't return 404 errors.

---

## 5. Prioritized Roadmap & Technical Blueprints for Future Work

The following features represent the planned pipeline. Each item includes its architectural blueprint for straightforward future implementation:

```
+-----------------------------------------------------------------------------------+
|                            FUTURE FEATURES PIPELINE                                |
+-----------------------------------------------------------------------------------+
| 1. Word-by-Word Synchronized Recitation & Tajweed Player (تلاوت بر الفاظ)          |
|    └─ Real-time word highlighting, Tajweed color rules, tap-to-translate          |
+-----------------------------------------------------------------------------------+
| 2. The Divine Interlocutors & Audience Matrix (مخاطبینِ قرآن — The Discourse)       |
|    └─ يا أيها الناس vs يا أيها الذين آمنوا vs أهل الكتاب vs المنافقون analytics   |
+-----------------------------------------------------------------------------------+
| 3. The Divine Names (Asma-ul-Husna) Chronological Emergence (اسماءِ حسنیٰ کا سفر)  |
|    └─ 99 Names of Allah traced by chronological revelation order                  |
+-----------------------------------------------------------------------------------+
| 4. Progressive Web App (PWA) Offline Recitation Engine (مکمل آف لائن دستیابی)      |
|    └─ Service Worker caching of full text, translations, and audio chunks         |
+-----------------------------------------------------------------------------------+
| 5. Audio Playback Speed & Sleep Timer (رفتار اور سلیپ ٹائمر)                       |
|    └─ 0.75x to 1.5x speed options with auto-fade sleep timers                     |
+-----------------------------------------------------------------------------------+
| 6. Personal Study Journal & Reflection Notes (ذاتی نوٹس اور مطالعہ)               |
|    └─ LocalStorage/IndexedDB private notes with Markdown/PDF export               |
+-----------------------------------------------------------------------------------+
```

### 🌟 Feature 1: Word-by-Word Synchronized Recitation & Tajweed Player (تلاوت بر الفاظ)
- **Objective**: As a Qari recites an Ayah, the current word is highlighted with a gold halo in real-time. Tapping any word opens a detailed popover with its root, morphological grammar, and Urdu/English translation.
- **Data Source**: Quran.com API v4 word-level timestamps (`https://api.quran.com/api/v4/verses/by_key/{surah}:{ayah}?words=true&word_fields=text_uthmani,audio_url`).
- **Proposed Data Model (`src/types/tajweed.ts`)**:
```typescript
export interface QuranWord {
  id: number;
  position: number;
  audioUrl?: string;
  charTypeName: 'word' | 'end';
  textUthmani: string;
  translationUrdu: string;
  translationEnglish: string;
  transliteration: string;
  rootWord?: string;
  tajweedClass?: 'ghunnah' | 'ikhfa' | 'idgham' | 'qalqalah' | 'madd';
  timestampMs?: { start: number; end: number };
}
```
- **Component File**: `src/components/Reader/WordByWordAyah.tsx`

---

### 👥 Feature 2: The Divine Interlocutors & Audience Matrix (مخاطبینِ قرآن — The Divine Discourse)
- **Objective**: An analytical perspective visualizing how the Quran shifted its tone and divine address over 23 years:
  1. *یا ایها الناس* (O Humanity): 20 occurrences in early Mecca laying universal moral foundations.
  2. *یا ایها الذین آمنوا* (O You Who Believe): 89 occurrences, strictly post-Hijrah in Medina, formulating civic law and fraternity.
  3. *یا اهل الکتاب* (O People of the Book): 24 occurrences, dialoguing with Jews and Christians in Medina.
  4. *المنافقون* (The Hypocrites): Psychological deconstruction in Medina.
  5. *یا ایها النبی / المزمل / المدثر* (Direct Prophetic Addresses): Consolation, nocturnal prayers, and leadership mandates.
- **Component File**: `src/components/Perspectives/AudienceMatrixView.tsx`
- **Data File**: `src/data/audienceMatrixData.ts`

---

### 🕊️ Feature 3: The Divine Names (Asma-ul-Husna) Chronological Emergence (اسماءِ حسنیٰ کا نزولی سفر)
- **Objective**: An interactive timeline and constellation tracking when each of the 99 Names of Allah was first revealed:
  - *Ar-Rabb* (The Sustainer) in Surah Al-Alaq (Revelation #1)
  - *Al-Qalam / Al-Akram* (The Most Generous)
  - The historical controversy of *Ar-Rahman* (The All-Compassionate) which the polytheists rejected in Mid-Mecca.
  - Statehood and governance attributes (*Al-Aziz*, *Al-Hakim*, *Al-Malik*) in Medina.
  - Culminating in *Al-Wali* and *Al-Mawla* (The Guardian & Protector).
- **Component File**: `src/components/Perspectives/AsmaUlHusnaChronology.tsx`
- **Data File**: `src/data/asmaUlHusnaChronologyData.ts`

---

### 📱 Feature 4: Progressive Web App (PWA) Offline Engine (مکمل آف لائن دستیابی)
- **Objective**: Enable full offline operation without internet connectivity.
- **Implementation**:
  - Add `vite-plugin-pwa` to `vite.config.ts`.
  - Create Service Worker cache strategies:
    - `CacheFirst` for static Quranic JSON and fonts.
    - `StaleWhileRevalidate` for application assets.
    - IndexedDB for caching recited MP3 audio files on demand.
  - Web App Manifest (`manifest.json`) for Android/iOS home-screen installation.

---

### ⏱️ Feature 5: Audio Playback Speed & Sleep Timer (رفتار اور سلیپ ٹائمر)
- **Objective**: Add `0.75x`, `1.0x`, `1.25x`, `1.5x` playback rate controls to the HTML5 audio element, and a 15/30/60 minute auto-fade sleep timer.
- **Component**: Update `src/components/AudioPlayer/StickyAudioBar.tsx` and `src/context/QuranContext.tsx`.

---

### 📝 Feature 6: Personal Study Journal & Reflection Notes (ذاتی نوٹس اور تدبّر)
- **Objective**: Provide a private study drawer on any Ayah where users can record personal reflections (تدبّر).
- **Storage**: Browser `localStorage` / `IndexedDB` with export to PDF or Markdown.
- **Component**: `src/components/Reader/AyahReflectionDrawer.tsx`.

---

## 6. Verification & Quality Assurance Protocols

Whenever introducing changes:
1. **Compilation Check**: Run `npm run build` to ensure 0 TypeScript errors and clean bundling.
2. **Audio Sync Check**: Test continuous recitation to verify seamless auto-advance across surahs.
3. **RTL & Font Integrity**: Verify that Arabic and Urdu text never suffers clipping or overlap on mobile and desktop viewports.
4. **Vercel Edge Deployment**: Verify live deployment at `https://nuzooli.vercel.app`.

---

*This document is the permanent single source of truth for the Tarteeb-e-Nuzooli platform.*
