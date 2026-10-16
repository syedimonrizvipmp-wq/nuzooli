# Research Framework & Computational Hermeneutics
## Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis and Legal Stratification

**Principal Investigator & Lead Architect:** Maulana Syed Imon Rizvi (مولانا سید آئمن رضوی)  
**System Repository:** [https://github.com/syedimonrizvipmp-wq/nuzooli](https://github.com/syedimonrizvipmp-wq/nuzooli)  
**Canonical Production Platform:** [https://nuzooli.vercel.app](https://nuzooli.vercel.app)  
**Dataset Version:** 2.0.0 (October 2026)  
**Licensing:** Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

---

## 1. Abstract & Executive Summary

Traditional Quranic studies predominantly engage with the text via its canonical recension order (*Tartīb al-Tilāwah* / *Tartīb al-Muṣḥaf*), an intentional theological synthesis finalized during the early Caliphate. While hermeneutically indispensable, reading exclusively through canonical arrangement obscures the **diachronic socio-historical pedagogy**, gradual legal maturation (*Tadrīj al-Aḥkām*), and dynamic situational responses (*Asbāb al-Nuzūl*) of the 23-year prophetic mission (610 CE – 632 CE).

**Project Nuzooli** bridges computational digital humanities and classical Islamic exegesis. By modeling revelation chronology as an interactive diachronic continuum, the platform provides scholars, researchers, and students with:
1. Algorithmic revelation mapping across 114 Surahs and granular passage-level units.
2. A formal mathematical metric for canonical structural displacement ($\Delta$).
3. Five stratified legal evolution tracks with classical exegetical provenance.
4. FAIR-compliant (Findable, Accessible, Interoperable, Reusable) dataset exports in CSV and JSON formats.

---

## 2. Theoretical Hermeneutical Model: Diachronic vs. Canonical

The platform formalizes a dual-axis reading architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE DUAL-AXIS PARADIGM                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   AXIS 1: Canonical Synchronic Recension (Tartīb al-Muṣḥaf)           │
│   [Surah 1: Al-Fatiha] ─────────────► [Surah 114: An-Nas]              │
│   • Literary cohesion, liturgical recitation, teleological synthesis   │
│                                                                        │
│   AXIS 2: Diachronic Historical Chronology (Tartīb al-Nuzūl)           │
│   [610 CE: Al-'Alaq] ───────────────► [632 CE: An-Nasr / Al-Ma'idah]   │
│   • Pedagogical maturation, legal stratification, situational context   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

The historical revelation sequence follows the rigorous scholarly consensus of the classical school of Ahl al-Bayt (a.s.), cross-referenced with foundational exegeses:
- **Ayatollah Muhammad Hadi Ma'rifat**, *Al-Tamhīd fī 'Ulūm al-Qur'ān* (Mu'assasat al-Nashr al-Islāmī, Qom).
- **Allāmah Muhammad Husayn Tabātabā'ī**, *Al-Mīzān fī Tafsīr al-Qur'ān* (Mu'assasat al-A'lamī, Beirut).
- **Shaykh Abū 'Alī al-Faḍl ibn al-Ḥasan al-Ṭabarsī**, *Majma' al-Bayān fī Tafsīr al-Qur'ān*.
- **'Alī ibn Aḥmad al-Wāḥidī**, *Asbāb al-Nuzūl* (Dār al-Ḥadīth, Cairo).

---

## 3. Mathematical Metric: Delta Displacement ($\Delta$)

To quantify the degree of organizational transposition between the historical revelation order and the canonical Ottoman codex, Project Nuzooli defines the **Delta Displacement Metric ($\Delta$)**:

$$\Delta_i = | R_i^{\text{Nuzūl}} - R_i^{\text{Muṣḥaf}} |$$

Where:
- $R_i^{\text{Nuzūl}} \in [1, 114]$ represents the discrete chronological order of revelation for Surah $i$.
- $R_i^{\text{Muṣḥaf}} \in [1, 114]$ represents the canonical recension position of Surah $i$.
- $\Delta_i \in [0, 113]$ quantifies the displacement distance.

### Hermeneutical Significance of High $\Delta$ Surahs:
1. **Surah al-'Alaq ($i = 96$):**  
   $R_{\text{Alaq}}^{\text{Nuzūl}} = 1$, $R_{\text{Alaq}}^{\text{Muṣḥaf}} = 96 \implies \mathbf{\Delta = 95}$.  
   The inaugural revelation of cave Ḥirā' sits toward the end of the codex, framing personal devotional reading.
2. **Surah al-Fātiḥah ($i = 1$):**  
   $R_{\text{Fatiha}}^{\text{Nuzūl}} = 5$, $R_{\text{Fatiha}}^{\text{Muṣḥaf}} = 1 \implies \mathbf{\Delta = 4}$.  
   Minimal displacement, serving as the prologue to both recitation and early collective prayer.
3. **Surah al-Baqarah ($i = 2$):**  
   $R_{\text{Baqarah}}^{\text{Nuzūl}} = 87$, $R_{\text{Baqarah}}^{\text{Muṣḥaf}} = 2 \implies \mathbf{\Delta = 85}$.  
   Revealed during early Medinan legislative founding, positioned immediately after the prologue due to its encyclopedic scope.

---

## 4. Stratified Legal Evolution (*Tadrīj al-Aḥkām*)

Islamic jurisprudence recognizes that statutory laws were not enacted instantaneously, but stratified across pedagogical stages. The platform tracks 5 primary legal evolutions across 15 distinct historical checkpoints:

| Pathway ID | Pathway Title (English / Arabic) | Total Stages | Revelation Span | Primary Classical Authority |
|---|---|---|---|---|
| `wine` | Gradual Prohibition of Intoxicants<br>(تحريم الخمر) | 4 | 615 CE – 628 CE | *Al-Tamhīd*, Vol. 2; *Al-Mīzān*, Vol. 2 & 6 |
| `defense` | Mandate of Armed Defense & Warfare<br>(تشريع الجهاد والدفاع) | 3 | 610 CE – 624 CE | *Al-Mīzān*, Vol. 2 & 9; *Asbāb al-Nuzūl* |
| `qiblah` | Orientation of Qiblah<br>(تحويل القبلة) | 2 | 610 CE – 624 CE | *Al-Mīzān*, Vol. 1; *Al-Tamhīd*, Vol. 1 |
| `fasting` | Mandate of Fasting & Ramadan<br>(تشريع الصيام) | 3 | 622 CE – 624 CE | *Al-Tamhīd*, Vol. 2; *Al-Mīzān*, Vol. 2 |
| `zakat` | Zakat, Infaq & Economic Purification<br>(الزكاة والإنفاق المالي) | 3 | 615 CE – 630 CE | *Al-Tamhīd*, Vol. 2; *Al-Mīzān*, Vol. 9 |

Each stage in the codebase (`src/data/gradualLegislationData.ts`) is explicitly annotated with `ScholarlyProvenance` including:
- Classical work title (*Kitāb*)
- Lead exegetical scholar
- Specific volume (*Jild*) and chapter (*Bāb*)
- Academic summary note in English and Urdu

---

## 5. FAIR Data Standards & Open Access

Project Nuzooli adheres strictly to the **FAIR Data Principles**:
- **Findable:** Granular, versioned datasets with persistent URI locators on GitHub and Vercel.
- **Accessible:** Zero paywall or authentication gating; accessible via one-click browser download or HTTP `curl`/`fetch`.
- **Interoperable:** Standard RFC 4180 CSV and schema-validated JSON with standardized ISO 8601 timestamps.
- **Reusable:** Released under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).

### Available Export Artifacts:
1. `nuzooli-chronology-matrix.csv`: Full 114-Surah matrix with $\Delta$ metric, revelation period, and verse tallies.
2. `nuzooli-chronology-matrix.json`: Machine-readable JSON matrix with provenance and scholarly methodology headers.
3. `gradual-legislation-tracks.json`: Complete 5-track legal stratification dataset with classical citations.

---

## 6. Academic Citation Standards

To cite this platform or its computational datasets in peer-reviewed journals, theses, or digital humanities publications:

### Chicago 17th Edition (Author-Date)
```text
Rizvi, Maulana Syed Imon. 2026. "Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis and Legal Stratification." Research Platform and Dataset v2.0.0. https://nuzooli.vercel.app.
```

### APA 7th Edition
```text
Rizvi, M. S. I. (2026). Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis and Legal Stratification (Version 2.0.0) [Data set & Computational framework]. https://nuzooli.vercel.app
```

### BibTeX
```bibtex
@software{rizvi_nuzooli_2026,
  author = {Rizvi, Maulana Syed Imon},
  title = {{Project Nuzooli: Diachronic Computational Framework for Chronological Quranic Exegesis and Legal Stratification}},
  year = {2026},
  version = {2.0.0},
  url = {https://nuzooli.vercel.app},
  repository = {https://github.com/syedimonrizvipmp-wq/nuzooli},
  keywords = {Quran, Digital Humanities, Tarteeb-e-Nuzul, Chronological Exegesis, Asbab al-Nuzul, Shia Hermeneutics}
}
```

---

## 7. Contact & Peer Collaboration

For peer review inquiries, theological cross-verification, or collaborative digital humanities initiatives:
- **Principal Investigator:** Maulana Syed Imon Rizvi
- **Repository:** `https://github.com/syedimonrizvipmp-wq/nuzooli`
- **Issue Tracker:** `https://github.com/syedimonrizvipmp-wq/nuzooli/issues`
