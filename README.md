# OSGeo Slovenija — urejanje vsebine

To je repozitorij spletne strani [osgeo.si](https://osgeo.si). Stran je **statična**, vsa vsebina pa živi v mapi [`content/`](./content) kot navadne Markdown datoteke. To pomeni, da **lahko vsak prispeva** — brez nameščanja kakršne koli programske opreme. Spreminjaš direktno na GitHubu, ob commitu se stran samodejno zgradi in objavi.

> 💡 **Še nisi delal/a z Markdownom ali GitHubom?** Brez panike — pri vsakem koraku spodaj je predloga, ki jo samo prilepiš in zamenjaš vrednosti.

## 🚀 Kako pride sprememba na osgeo.si

Vsak `commit` v vejo `main` (preko GitHub web UI ali `git push`) samodejno sproži **GitHub Actions** workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), ki:

1. Naredi gradnjo strani (`npm run build`),
2. Objavi rezultat na vejo `gh-pages`,
3. GitHub Pages pa servira to vejo pod domeno [osgeo.si](https://osgeo.si).

**Skupni čas od commita do objave ~2–3 min.** Status posameznega buildanja vidiš na zavihku [Actions](https://github.com/OSGeo-si/landing-page/actions). Če katero zgradbo poči (rdeč krogec), klikni nanjo za logiranje napake — najpogosteje je razlog napaka v YAML frontmatter datoteki (npr. manjkajoči narekovaji).

> ✅ **Ni možnosti, da z napačnim commitom prestrelimo produkcijo** — če gradnja ne uspe, stara verzija strani ostane objavljena. Lahko se varno učiš.

---

## 📚 Kazalo

- [Hitri pregled mape `content/`](#hitri-pregled-mape-content)
- [✍️ Dodajanje dogodka](#%EF%B8%8F-dodajanje-dogodka)
- [📰 Dodajanje novice](#-dodajanje-novice)
- [📸 Dodajanje galerije fotografij](#-dodajanje-galerije-fotografij)
- [📄 Urejanje obstoječe strani (O nas, GeoDev, …)](#-urejanje-obstoje%C4%8De-strani-o-nas-geodev-)
- [🗺️ Kako pridobiti koordinate](#%EF%B8%8F-kako-pridobiti-koordinate)
- [📝 Markdown — osnove](#-markdown--osnove)
- [🧪 Lokalni predogled (neobvezno)](#-lokalni-predogled-neobvezno)
- [💬 Potrebuješ pomoč?](#-potrebuje%C5%A1-pomo%C4%8D)
- [🛠️ Za razvijalce](#%EF%B8%8F-za-razvijalce)

---

## Hitri pregled mape `content/`

```
content/
├── events/                       # dogodki, razdeljeni po seriji
│   ├── geodev/                       # GeoDev meetupi
│   ├── osgeo-konferenca/             # letne konference
│   └── svizec/                       # Svizec — skupnostni dogodki
├── news/                         # bilten / novice
└── pages/                        # opisi sekcij (O nas, GeoDev, …)
```

Vse datoteke so `.md` (Markdown). Vsak dogodek/novica/stran je svoja datoteka. Slike za galerijo gredo v sosednjo mapo z **enakim imenom kot `.md` datoteka**.

---

## ✍️ Dodajanje dogodka

### 1. Izberi pravo mapo

| Serija | Kam dodaš |
| --- | --- |
| GeoDev meetup | [`content/events/geodev/`](./content/events/geodev) |
| Letna konferenca | [`content/events/osgeo-konferenca/`](./content/events/osgeo-konferenca) |
| Svizec | [`content/events/svizec/`](./content/events/svizec) |

### 2. Ustvari datoteko

- Na GitHubu odpri zgornjo mapo.
- Klikni **Add file → Create new file** (zgoraj desno).
- Poimenuj jo, npr. `geodev-15.md` (uporabi enak `-` slog kot drugi).

### 3. Prilepi to predlogo in zamenjaj vrednosti

```markdown
---
title: "GeoDev Meetup #15"
slug: geodev-15
date: 2026-02-12
time: "18:00"
location: "Mesto, ulica 1, Ljubljana"
lat: 46.0518
lng: 14.4727
eventUrl: "https://forms.gle/..."
tags: [geodev]
---

Pozdravljeni!

Vabljeni na petnajsti GeoDev meetup, ki bo …

## Program

**Predavanje 1 — Naslov predavanja**

Kratek opis predavanja.

_Ime Priimek, organizacija_

---

**Predavanje 2 — Naslov**

…

## Ostalo

Dogodek je brezplačen in odprt vsem. Pridruži se.
```

### Polja v glavi datoteke (med vrsticama `---`)

| Polje | Obvezno? | Primer / opis |
| --- | --- | --- |
| `title` | ✅ | Naslov dogodka |
| `slug` | ✅ | URL kos — `geodev-15` postane `/dogodki/geodev-15` |
| `date` | ✅ | `YYYY-MM-DD`, npr. `2026-02-12` |
| `end_date` | ne | Za večdnevne dogodke (`2026-02-13`) |
| `time` | ne | `"18:00"` — _v narekovajih_ |
| `location` | ✅ | Polni naslov |
| `lat`, `lng` | ne* | Koordinati (glej [spodaj](#%EF%B8%8F-kako-pridobiti-koordinate)) |
| `eventUrl` | ne | Povezava za prijavo (Luma, Google form, Mailchimp …). Na strani dogodka postane gumb **"Prijavi se na dogodek"** (odpre v novem zavihku). |
| `tags` | ✅ | `[geodev]`, `[osgeo-conference]` ali `[osgeo-svizec]` |

> \* Brez `lat`/`lng` se dogodek **ne pojavi na zemljevidu**, vse ostalo pa deluje normalno.

### 💡 Priporočilo: uporabi Luma za prijave

Za vsak nov dogodek priporočamo, da naredimo Luma dogodek na [lu.ma](https://lu.ma) (brezplačno, brez registracije za udeležence) in **njegov URL prilepimo v `eventUrl:`**. Luma poskrbi za:

- potrditveni e-mail,
- opomnike pred dogodkom,
- listo udeležencev,
- kapaciteto z waiting listo,
- dodajanje v koledar.

Tudi gumb "Dodaj v koledar" na strani dogodka deluje samodejno (generiran iz `date`, `time`, `end_date` v frontmatter), ne glede na to, kateri RSVP servis uporabimo.

### 4. Shrani

Spusti se na dno strani, vpiši kratek opis spremembe (npr. _Add GeoDev #15_) in klikni **Commit changes**. Po nekaj minutah je dogodek na strani.

---

## 📰 Dodajanje novice

Novice so kratka poročila o sodelovanju na hackathonih, konferencah, ali pomembne objave iz društva.

### 1. Odpri mapo [`content/news/`](./content/news)

### 2. Ustvari datoteko

Poimenuj jo s **predpono datuma** za vrstni red: `YYYY-MM-DD-kratek-opis.md`

Primer: `2026-05-16-geo-slovenija-hackathon.md`

### 3. Prilepi predlogo

```markdown
---
title: "Naslov novice"
slug: kratek-opis             # uporabljen v URL: /novice/kratek-opis
date: 2026-05-16
summary: "Kratek povzetek (1–2 stavka). Pokaže se na kartici novice."
tags: [hackathon, sodelovanje]
---

Pozdravljeni!

Tu napišeš celotno besedilo novice. Lahko uporabiš **krepko**, _ležeče_, [povezave](https://primer.si) in seznam:

- točka 1
- točka 2
- točka 3

## Podnaslov, če je daljši članek

Več besedila …
```

### Polja v glavi datoteke

| Polje | Obvezno? | Primer |
| --- | --- | --- |
| `title` | ✅ | Naslov |
| `slug` | ✅ | `geo-slovenija-hackathon` (kratek, brez šumnikov) |
| `date` | ✅ | `YYYY-MM-DD` |
| `summary` | priporočeno | 1–2 stavka, pokaže se v predogledu |
| `tags` | ne | Seznam: `[hackathon, ...]` |
| `cover` | ne | Ime cover slike v sosednji mapi, npr. `cover.jpg`. Če mapa vsebuje datoteko `cover.jpg`, se uporabi samodejno. |
| `externalUrl` | ne | Če je novica le povezava do članka drugje. Kartica klikne direktno na to povezavo brez odpiranja podstrani na osgeo.si. |

---

## 📸 Dodajanje galerije fotografij

Galerija je **opcijska**. Velja **enak postopek za dogodke in novice**:

1. Naredi mapo z **istim imenom kot `.md` datoteka** (brez končnice `.md`):

   ```
   content/events/geodev/
   ├─ geodev-12.md
   └─ geodev-12/                     ← ista mapa kot .md (brez končnice)
      ├─ 01-uvod.jpg
      ├─ 02-druzenje.jpg
      └─ 03-skupscina.jpg
   ```

2. Naloži slike (na GitHubu: **Add file → Upload files**).

### Konvencije

- **Vrstni red:** imena začni z `01-`, `02-`, … — to določa vrstni red v galeriji.
- **Opis (alt tekst):** preostanek imena postane opis slike za dostopnost. Primer: `02-druzenje-po-predavanjih.jpg` → "druzenje po predavanjih".
- **Formati:** `.jpg`, `.jpeg`, `.png`, `.webp`.
- **Velikost:** priporočena dolžina daljše stranice **~2400 px**. Večje slike po nepotrebnem upočasnijo stran.

### Posebnost za novice — _cover image_

Pri novicah lahko ena slika služi kot kartični _cover_ (naslovnica):

- Najlažje: poimenuj jo **`cover.jpg`** (ali `.png`/`.webp`) — sistem jo prepozna avtomatsko.
- Ali pa v glavo `.md` datoteke dodaj: `cover: ime-datoteke.jpg`.

Cover slika se prikaže kot velika slika na vrhu novice **in** kot sličica na kartici. Preostale slike iz mape gredo v galerijo.

### Lightbox

Klik na sliko v galeriji odpre polnozaslonski pregledovalnik:

- **Esc** zapre
- **← / →** za navigacijo med slikami

---

## 📄 Urejanje obstoječe strani (O nas, GeoDev, …)

Opisi posameznih sekcij so v mapi [`content/pages/`](./content/pages):

| Datoteka | Stran |
| --- | --- |
| `home.md` | naslovnica (uvodno besedilo) |
| `about.md` | O nas |
| `geodev.md` | uvod nad GeoDev arhivom |
| `osgeo-konferenca.md` | uvod nad arhivom konferenc |
| `svizec.md` | uvod nad Svizci |
| `teren.md` | Teren |
| `kje-tebe-karta-zuli.md` | Karta |

Klikni datoteko, klikni svinčnik (✏️) za urejanje, naredi spremembe, na dnu klikni **Commit changes**.

Posebnost glave datoteke `pages/*.md`:

```yaml
---
title: "Naslov strani"
tagline: "Kratek podnaslov pod naslovom (opcijsko)"
---
```

---

## 🗺️ Kako pridobiti koordinate

Najlažje preko **OpenStreetMap** ali Google Maps:

### OpenStreetMap

1. Odpri [openstreetmap.org](https://www.openstreetmap.org)
2. Poišči lokacijo
3. **Desni klik** → **Show address** (Pokaži naslov)
4. Koordinati sta v zgornjem desnem kotu: prva je `lat`, druga `lng`

### Google Maps

1. Odpri [google.com/maps](https://www.google.com/maps)
2. Poišči lokacijo
3. **Desni klik** na zemljevidu na pravo točko
4. Prikaže se par številk — najprej `lat`, potem `lng`
5. Klikni nanju in se skopirata v odložišče

**Primer za Ljubljano:** `lat: 46.0518`, `lng: 14.4727`

Štiri decimalke so več kot dovolj.

---

## 📝 Markdown — osnove

Telo datoteke (pod glavo `---`) je v Markdownu. Tu je hitri pregled:

```markdown
# Naslov (H1) — uporabi le enkrat (sicer pa naslov stran prevzame iz frontmatterja)

## Podnaslov (H2)
### Pod-podnaslov (H3)

**krepko**  ·  _ležeče_  ·  ~~prečrtano~~

[Povezava](https://primer.si)

- alineja
- še ena alineja
  - vgnezdena

1. oštevilčen seznam
2. druga točka

> Citat ali opomba

`inline koda` ali blok:

```python
print("hello")
```

![Opis slike](pot/do/slike.jpg)
```

> Več: [GitHub Markdown vodič](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

---

## 🧪 Lokalni predogled (neobvezno)

Če želiš pred objavo videti, kako bo sprememba izgledala na strani (npr. preveriti, ali se nova novica res prikaže pravilno z galerijo), lahko stran zaženeš lokalno na svojem računalniku.

**Predpogoj:** nameščen [Node.js](https://nodejs.org/) (vzemi LTS verzijo — 20 ali novejšo).

```bash
# 1. Kloniraj repozitorij
git clone git@github.com:OSGeo-si/landing-page.git
cd landing-page

# 2. Naloži odvisnosti (samo enkrat)
npm install

# 3. Zaženi lokalni strežnik
npm run dev
```

Terminal ti bo izpisal `Local: http://localhost:5173/` — odpri to povezavo v brskalniku.

Stran se **samodejno osveži ob vsaki spremembi datoteke** (`.md`, `.vue`, slika …). Idealno za testiranje nove novice ali dogodka pred commitom.

### Uporabne komande

| Komanda | Kaj naredi |
| --- | --- |
| `npm run dev` | lokalni strežnik z živim osveževanjem (`http://localhost:5173`) |
| `npm run build` | produkcijska gradnja v mapo `dist/` |
| `npm run preview` | predogled produkcijske gradnje (po `npm run build`) |

> ℹ️ Lokalno testiranje **ne** vpliva na produkcijsko stran — ta se posodobi šele, ko pushaš spremembe v `main` na GitHubu. Tudi če pri lokalnem testiranju kaj zlomiš, na osgeo.si tega nihče ne vidi.

---

## 💬 Potrebuješ pomoč?

- **E-pošta:** [osgeoslovenija@gmail.com](mailto:osgeoslovenija@gmail.com)
- **Discord:** [pridruži se skupnosti](https://discord.gg/XQGqrz8CgA)
- **Issue:** [odpri vprašanje na GitHubu](https://github.com/OSGeo-si/landing-page/issues/new) — vsa vprašanja so dobrodošla

---

## 🛠️ Za razvijalce

Stran je zgrajena z Vue 3 + Vite + Tailwind v4. Vsebina (markdown + slike) se z `import.meta.glob` zbira ob `build` času, zato je celotna spletna stran statična in se gosti na GitHub Pages.

```bash
npm install
npm run dev      # lokalni razvojni strežnik
npm run build    # produkcijska gradnja v ./dist
npm run preview  # pregled zgrajene strani
```

### Struktura kode

```
src/
├── components/        # SiteHeader, EventCard, EventMap, NewsCard, …
├── views/             # podstrani (HomePage, EventPage, NewsItemPage, …)
├── composables/       # useDarkMode
├── content.js         # branje markdowna (Vite glob) + frontmatter
├── style.css          # Tailwind v4 z OSGeo barvno paleto
├── router.js
└── main.js
content/               # vsa vsebina (glej zgoraj)
public/                # statične datoteke (PDF-i, favicon, sponsorji)
```

### Deploy

Push v `main` sproži workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), ki zgradi stran in jo objavi na `gh-pages` veji. Domena `osgeo.si` je nastavljena preko `CNAME` datoteke v korenu repozitorija.
