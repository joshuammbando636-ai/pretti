# 🎀 Preetie Decor — "Our Work" Section Blueprint

Detailed plan for a structured **Work / Portfolio** section, one level richer than the
existing [GalleryPage](src/components/Gallery/GalleryPage.tsx). Built on the project's real
stack: **React 19 + TypeScript + Vite, styled-components, react-router-dom v7,
react-helmet, lucide-react**, the design tokens in [theme.ts](src/styles/theme.ts), and the
WhatsApp CTA from [App.tsx](src/App.tsx).

---

## 0. Why this exists (vs. Gallery)

| | Gallery (current) | Work / Portfolio (new) |
| --- | --- | --- |
| Unit | A single photo + title | A **project**: multiple photos + story |
| Goal | "Look how pretty" | "Hire us — here's proof + outcome" |
| Filter | None | By event type (Wedding, Birthday, Corporate…) |
| Depth | Toggle reveals location/date | Detail page: services, venue, testimonial, gallery |
| SEO | One page | Per-project pages → long-tail local keywords |

Keep the Gallery as the quick visual feed. Work is the **conversion** surface.

---

## 1. Routing & File Plan

Follows the existing lazy-route pattern in [App.tsx](src/App.tsx#L8-L14).

```
src/components/Work/
  WorkPage.tsx          # /work  — grid + category filter
  WorkCard.tsx          # one project card
  WorkDetail.tsx        # /work/:slug — full case study
  WorkFilter.tsx        # category pill bar
src/data/
  projects.json         # source of truth (mirrors blogPosts.json pattern)
```

Routes to add inside the `<Layout />` route in [App.tsx](src/App.tsx#L75-L83):

```tsx
const WorkPage   = lazy(() => import('./components/Work/WorkPage'))
const WorkDetail = lazy(() => import('./components/Work/WorkDetail'))
// ...
<Route path="work" element={<WorkPage />} />
<Route path="work/:slug" element={<WorkDetail />} />
```

Add **"Work"** to the nav in [Navbar.tsx](src/components/Layout/Navbar.tsx) between
`Gallery` and `Blog`, and link it in [Footer.tsx](src/components/Layout/Footer.tsx).
Add both URL patterns to [public/sitemap.xml](public/sitemap.xml).

---

## 2. Data Model

Extend the slim `GalleryItem` you have today into a real project record. Put the
interface in [src/types/index.ts](src/types/index.ts) and the data in
`src/data/projects.json`.

```ts
export type EventCategory =
  | 'Wedding'
  | 'Bridal Shower'
  | 'Birthday'
  | 'Corporate / Grand Opening'
  | 'Confirmation'
  | 'Seasonal'; // Christmas, etc.

export interface Project {
  id: number;
  slug: string;            // 'masaki-garden-wedding-2024' → /work/:slug
  title: string;           // 'Garden Wedding at Masaki'
  category: EventCategory;
  featured: boolean;       // pin to top of grid
  cover: string;           // /images/...  hero/card image
  gallery: string[];       // detail-page image set
  location: string;        // 'Masaki, Dar es Salaam'
  date: string;            // 'June 2024'
  guestCount?: number;     // optional scale signal: 250
  summary: string;         // one line for the card
  story: string;           // 2–4 paragraphs for the detail page
  services: string[];      // ['Floral arch', 'Table styling', 'Lighting', 'Drapery']
  palette?: string[];      // hex chips: ['#b3002d', '#f9f1f3'] — reuse brand reds
  testimonial?: {
    quote: string;
    author: string;        // 'Asha & John'
  };
}
```

Why each field earns its place:
- `slug` → clean per-project SEO URLs (your Blog already does this in
  [App.tsx](src/App.tsx#L82)).
- `services` / `guestCount` → turns "nice photo" into "scope + scale" = trust.
- `testimonial` → social proof on the page that asks for the booking.
- `palette` → you can render literal color chips from the same brand tokens.

---

## 3. WorkPage — layout

Reuse the visual language already proven in
[GalleryPage](src/components/Gallery/GalleryPage.tsx): same `Section` padding,
`Title` with the dual-line flourish, `Card` lift-on-hover + `img` scale.

- **Header:** `Title` "Our Work" + `Subtitle` "Real events we styled across Dar es Salaam".
- **Filter bar (`WorkFilter`):** pill buttons — `All`, then each `EventCategory`.
  Active pill uses `theme.gradients.primary`; inactive uses `theme.colors.white` with a
  `theme.colors.grayLight` border. Filter is client-side `useState<EventCategory | 'All'>`.
- **Grid (`Container`):** `flex-wrap` / `gap: 30px`, `max-width: 1200px` — identical to
  Gallery so the two pages feel like one site.
- **Card (`WorkCard`):**
  - cover image (`object-fit: cover`, `height: 280px`, `loading="lazy"`)
  - category chip overlaid top-left (`theme.colors.primary`, `borderRadius.round`)
  - `h3` title (Playfair, `theme.colors.primaryLight`)
  - one-line `summary`
  - footer row: 📍 `location` · 📅 `date` (lucide `MapPin`, `Calendar` icons)
  - whole card is a `<Link to={'/work/' + slug}>`
- **Featured:** render `featured: true` first; optionally span them full-width as a
  larger "hero" card on desktop.
- **Empty state:** if a filter yields nothing, show a centered "No projects in this
  category yet — see them all" reset button.

---

## 4. WorkDetail — the case study page

Route `/work/:slug`; read `slug` via `useParams`, look up in `projects.json`, 404-style
fallback (redirect to `/work`) if missing.

Section order top→bottom:
1. **`<Helmet>`** — per-project title/description/keywords + the geo meta block copied
   from [GalleryPage](src/components/Gallery/GalleryPage.tsx#L243-L251). Title pattern:
   `"{title} | Preetie Decor — Event Decoration in {location}"`.
2. **Hero:** full-width `cover`, overlaid `title` + `category` + 📍/📅.
3. **At-a-glance bar:** Location · Date · Guests · Services count — small stat row.
4. **Story:** `story` paragraphs (Playfair `h2` "The Brief", Poppins body).
5. **Services rendered:** a tag/chip list from `services[]`.
6. **Palette:** color swatches from `palette[]` (small rounded squares + hex label).
7. **Gallery strip:** `gallery[]` in a responsive grid; click → lightbox (reuse the
   toggle-state idea from Gallery, or a simple modal).
8. **Testimonial:** quote card if present, brand gradient background.
9. **CTA block:** "Planning something similar?" → WhatsApp deep link (reuse the number
   `255672715657` / message pattern from [App.tsx](src/App.tsx#L66-L67)) **and** a link
   to `/contact`.
10. **More work:** 3 related cards from the same `category`.

---

## 5. Styling rules (stay on-brand)

Pull everything from [theme.ts](src/styles/theme.ts) — never hardcode a hex in a
component:
- Headings → `theme.fonts.heading` (Playfair Display); body → `theme.fonts.body` (Poppins).
- Primary actions / chips → `theme.colors.primary` `#b3002d`, hover `theme.colors.primaryHover`.
- Cards → `theme.shadows.card`, hover `theme.shadows.hover`, `borderRadius.large`.
- Section background → `theme.colors.light`; cards → `theme.colors.white`.
- Hover motion → `transform: translateY(-10px)` + `img scale(1.08)`, the same
  `cubic-bezier(0.4, 0, 0.2, 1)` transition already used in Gallery.
- Respect existing responsive font scaling done globally in [App.tsx](src/App.tsx#L51-L61);
  add `@media (max-width: theme.breakpoints.tablet)` card-width overrides like Gallery's.

---

## 6. Seed Content (use your real events)

You already have these in the Gallery — promote the strongest into full projects:

| Slug | Category | Pull from |
| --- | --- | --- |
| `elegant-wedding-dar` | Wedding | `chair.jpg` (#1) |
| `bridal-shower-masaki` | Bridal Shower | `brid.jpg` (#2) |
| `grand-opening-oysterbay` | Corporate / Grand Opening | `open.jpg` (#3) |
| `birthday-celebration-masaki` | Birthday | `boy.jpg` (#4) |
| `confirmation-event` | Confirmation | `ou.jpg` (#5) |
| `christmas-event-msasani` | Seasonal | `chr.jpg` (#6) |
| `wedding-collection-2026` | Wedding | `ww.jpeg`–`ww5.jpeg` (#7–10) → one multi-image project |

For each, you'll need to **author**: `summary`, `story`, `services`, optional
`guestCount`, `palette`, and ideally one real `testimonial`. That copy is the part that
turns the Gallery into a portfolio — budget an hour to write it well.

---

## 7. Accessibility & SEO

- Every image needs descriptive `alt` (e.g. `"Red-and-cream floral arch at a Masaki garden wedding"`), not just the title.
- Cards are `<Link>`s → keyboard reachable; keep the global focus ring from [App.tsx](src/App.tsx#L45-L48).
- Lightbox: trap focus, close on `Esc`, `aria-label` on the close button.
- Respect `prefers-reduced-motion` — gate the hover transforms.
- Per-project `<Helmet>` with local-intent keywords (`"wedding decoration Masaki"`,
  `"grand opening decor Oysterbay"`) — this is where the Work section beats the single
  Gallery page for search.
- The repo prerenders (`npm run prerender` → [scripts/prerender.js](scripts/prerender.js));
  make sure new `/work` + `/work/:slug` routes are included so they're crawlable.

---

## 8. Build order (suggested)

1. [ ] Add `Project` type + `EventCategory` to [types/index.ts](src/types/index.ts).
2. [ ] Create `src/data/projects.json` with the 6–7 seed projects (copy first, photos you have).
3. [ ] Build `WorkCard` (static), then `WorkPage` grid (no filter).
4. [ ] Add routes + nav/footer/sitemap links.
5. [ ] Add `WorkFilter` category pills.
6. [ ] Build `WorkDetail` (story → gallery → testimonial → CTA).
7. [ ] Wire WhatsApp + `/contact` CTAs.
8. [ ] Add lightbox + `prefers-reduced-motion`.
9. [ ] Write real copy + testimonials, verify `<Helmet>` per page.
10. [ ] `npm run build:all`, check prerender output for the new routes.

---

_Lead with weddings (your strongest, most-searched category), keep every project's
`summary` outcome-focused, and make the WhatsApp CTA reachable from every detail page._
