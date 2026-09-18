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

`/showroom` has two kinds of look:

- **Studio photographs** (`kind: "photo"`): a real suit shot on the dress form from every side and shown by
  `src/components/photo-spin.tsx`. Drag to turn, double-click or +/- to zoom. While it moves, it plays a full
  frame sequence (the photos plus in-between frames made with optical flow), so the spin stays smooth. When it
  stops, it always lands on an actual photograph and swaps in the sharp original.
- **Live 3D** (`kind: "3d"`): a dress form rendered in the browser with Three.js
  (`src/components/mannequin/`), also used for the teaser on the home page. If a device can't run WebGL it
  falls back to the image sequence in `public/media/360/<look>/01.webp` … `72.webp`, which also supplies the
  poster and thumbnail.

To add another photographed look:

1. Put the garment on the dress form, camera on a tripod (don't move it), even light, plain backdrop. Turn the
   form a little between shots and go all the way round once: 30–40 photos is enough. Keep people out of the
   frame.
2. Copy `scripts/spin360/studio-navy.json` to `<new-id>.json`. Set the crop, and list the photo numbers for one
   full turn in `sequence`. Leave out any repeats at the start or end. `patches` fixes a frame with something
   stray at its left edge.
3. Run `python scripts/spin360/build.py "<folder of JPGs>" scripts/spin360/<new-id>.json`. You need Python 3.10+
   with `numpy` and `opencv-python-headless`. It writes the frames to `public/media/360/<new-id>/` and the
   viewer data to `src/content/spins/<new-id>.json`.
4. Add a `kind: "photo"` look that imports that JSON in `src/content/showroom.ts`.

**Detail hotspots.** These are the + points on the photos that open a close-up and notes. Each one is set in
the config's `details`:

- `anchors`: one or two photos where the detail is clearly visible, with the point's position in the
  960×1280 working frame.
- `crop`: the box for the close-up.

The script follows each point to the neighbouring photos with optical flow, and stops where the point turns
out of view. To redo only this step, run it with `--details-only`. The text for each hotspot is in `hotspots`
in `src/content/showroom.ts`. The current copy is sample text and still needs checking against the real suit.

Looks, names and spec sheets are in `src/content/showroom.ts`.

## Old URLs

Old jesseandson.com addresses are redirected permanently to their new pages (see `next.config.ts`),
e.g. `/product/shoe` → `/products/shoes`, `/howitworks?id=2` → `/craftsmanship`,
`/inspiration` → `/lookbook`. Journal article URLs (`/blog/<slug>`) are unchanged.
