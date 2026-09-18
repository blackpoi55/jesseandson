# Jesse & Son — website

The new website for **Jesse & Son**, the family-run bespoke tailor on Sukhumvit Soi 10, Bangkok.
It replaces the old jesseandson.com with a dark-luxury design, dark and light themes, and all of the
original content: products, fabrics, shoes, process, pricing, FAQ, reviews and all 68 journal articles.

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**, **Tailwind CSS 4**,
`motion` for animation and `next-themes` for the theme toggle.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Development server with hot reload   |
| `npm run build` | Production build (all pages static)  |
| `npm run start` | Serve the production build           |
| `npm run lint`  | ESLint                               |

## Environment

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SITE_URL`: the public URL, used for canonical links, the sitemap and Open Graph.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: the contact and appointment form sends
  email through [Resend](https://resend.com). Without a key, the form still works: it offers to send the
  message by email, WhatsApp or LINE, pre-filled with everything the visitor typed.

## Where things live

```
content/blog/            Journal articles (JSON, one file per post + _index.json)
public/media/            All photography, converted to WebP
src/app/                 Pages (one folder per route) + sitemap, robots, manifest, icon
src/app/api/contact/     Contact / appointment form endpoint
src/content/             Page copy & data: products, fabrics, shoes, process, pricing, FAQ, reviews…
src/components/          UI, layout (header, footer, menus), motion effects, brand graphics
src/lib/                 Site details (address, phone, LINE…), navigation, blog loader, helpers
```

To change the phone number, address, LINE or social links, edit `src/lib/site.ts`.
To edit prices, products or FAQ answers, edit the matching file in `src/content/`.

## 360° showroom

`/showroom` (and the teaser on the home page) shows a **live 3D** dress form wearing the suit, rendered in the
browser with Three.js: drag to turn (with inertia), drag vertically to tilt, double-click or +/- to zoom. The model
is built in code (`src/components/mannequin/model.ts`); Three.js loads only when the viewer is on the page.

If a device can't run WebGL, the viewer falls back to a 360° image sequence in
`public/media/360/<look>/01.webp` … `72.webp` (one frame every 5°, 4:5 portrait). The same folder's `01.webp`
is used as the loading poster and the look thumbnail. To show real photography instead:

1. Put the garment on the dress form on a turntable, camera on a tripod, even light, plain light background.
2. Shoot 72 photos (5° apart), or record one slow full turn on video and extract 72 frames.
3. Export as WebP (about 960×1200), name them `01.webp`–`72.webp`, replace the files, and use
   `<SpinViewer frames={spinFrames("<look>")} />` in `src/components/showroom.tsx` instead of `<Mannequin3D>`.

Looks, names and spec sheets are in `src/content/showroom.ts`.

## Old URLs

Old jesseandson.com addresses are redirected permanently to their new pages (see `next.config.ts`),
e.g. `/product/shoe` → `/products/shoes`, `/howitworks?id=2` → `/craftsmanship`,
`/inspiration` → `/lookbook`. Journal article URLs (`/blog/<slug>`) are unchanged.
