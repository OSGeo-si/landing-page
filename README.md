# OSGeo Slovenija — osgeo.si

Spletna stran društva OSGeo Slovenija. Statična stran, zgrajena z **Vue 3 + Vite + Tailwind**. Vsa vsebina (dogodki, opisi strani) živi v mapi [`content/`](./content) kot Markdown — tako jo lahko prispevajo tudi tisti, ki ne pišejo kode.

## ✍️ Kako dodam dogodek (brez kode)

1. Na GitHubu odpri ustrezno mapo:
   - GeoDev meetupi → [`content/events/geodev/`](./content/events/geodev)
   - Letna konferenca → [`content/events/osgeo-konferenca/`](./content/events/osgeo-konferenca)
   - Svizec → [`content/events/svizec/`](./content/events/svizec)
2. Klikni **Add file → Create new file**.
3. Poimenuj datoteko npr. `geodev-15.md`.
4. Prilepi predlogo in spremeni polja:

   ```markdown
   ---
   title: "GeoDev Meetup #15"
   slug: geodev-15
   date: 2026-02-12
   time: "18:00"
   location: "Mesto, ulica"
   eventUrl: "https://forms.gle/..."   # ali pa pusti prazno, če imaš samo opis
   tags: [geodev]
   ---

   # GeoDev Meetup #15

   ## Program

   **Predavanje 1 — Naslov**
   Kratek opis predavanja.

   _Ime Priimek, organizacija_
   ```

5. Klikni **Commit changes**. Po pushu v `main` GitHub Actions sam zgradi stran in jo objavi na [osgeo.si](https://osgeo.si).

### Polja v frontmatter (med `---`)

| Polje | Obvezno | Primer |
| --- | --- | --- |
| `title` | da | `"GeoDev Meetup #14"` |
| `slug` | da | `geodev-14` (uporabljen v URL-ju `/dogodki/geodev-14`) |
| `date` | da | `2025-11-11` (ISO) |
| `end_date` | ne | `2025-10-23` (večdnevni dogodki) |
| `time` | ne | `"18:00"` |
| `location` | da | `"KID KIBLA, Maribor"` |
| `eventUrl` | ne | povezava do prijave (Google form, Mailchimp …) |
| `tags` | da | `[geodev]`, `[osgeo-conference]` ali `[osgeo-svizec]` |

Telo datoteke pod frontmatter-jem je opis dogodka v Markdown-u (vse, kar piše na podstrani dogodka).

## 📄 Urejanje vsebine drugih strani

Opisi posameznih sekcij (O društvu, GeoDev, Svizec, Teren, …) so v [`content/pages/`](./content/pages). Urediš naslov ali besedilo, narediš commit — sprememba se pokaže na strani.

## 🛠️ Razvoj

```bash
npm install
npm run dev      # lokalni razvojni strežnik
npm run build    # produkcijska gradnja v ./dist
npm run preview  # pregled zgrajene strani
```

### Struktura projekta

```
content/             # vsa vsebina — uredi tukaj brez kode
  events/<kategorija>/<slug>.md
  pages/<ime>.md
src/
  components/        # SiteHeader, SiteFooter, EventCard, PageHero, ...
  views/             # podstrani (Home, About, GeoDev, ...)
  content.js         # nalaganje markdowna ob buildu (Vite glob)
  style.css          # Tailwind v4 z OSGeo barvno paleto
  router.js
  main.js
public/              # statične datoteke (PDF-i, logoti sponzorjev)
```

## 🚀 Deploy

Push v `main` sproži workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), ki zgradi stran in jo objavi na `gh-pages` veji. Domena `osgeo.si` je nastavljena preko `CNAME` datoteke v korenu repozitorija.
