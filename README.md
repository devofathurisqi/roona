# ROONA — VuyamaLabs reseller catalog

VuyamaLabs builds independent online catalogs for the Vuyama reseller community. This repository is ROONA's storefront. Each brand keeps its own selling prices, logo, contact destination, design, and browser storage. Shared supplier photography does not imply shared selling prices or contacts.

## Client revision — 29 October 2026

Viscose Gradasi is **Rp69,000**. Mukena Segenggam Lily, Mukena Armani Velvet, and Mukena Rayon Viscose were removed because the client confirmed no stock. The current catalog has **24 entries**. Old persisted cart and favorite entries for removed products are discarded by the existing catalog validation. Removed product routes resolve to the collection-not-found screen and are excluded from the prerender and sitemap.

## Color revision — 30 October 2026

The sixteen requested collections now expose **452 named color/motif choices**, including newly checked Drive charts for Airtech, Gana, Hayla, Lea, and Zea. See [the color audit](catalog/COLOR-AUDIT.md), [source mappings](catalog/color-coverage.json), and [revision notes](docs/REVISION-2026-10-30.md). Model photos and full charts remain accessible after switching shades. Existing saved variants retain their original labels and quantities.

## Production workflow

Repository: `https://github.com/devofathurisqi/roona.git`. The production branch is `prod`. Run `npm test` and `npm run build` before committing and pushing to `origin prod`. Push triggers the repository's existing hosting integration; independently verify deployment when claiming a live release. Never force-push or change another brand's repository.

## Agent handoff

Start by reading this README, `src/config.ts`, `src/data/products.json`, and `tests/commerce.test.mjs`. Price changes must update both the product's `retailPrice` / `pricingSource` / `pricingStatus` and `src/data/prices.json`; the public catalog consumes `products.json`. Preserve the existing editorial ROONA design for bounded client revisions. The supplied logo is in `public/assets/brand/`.

The catalog uses brand price, then verified Vuyama Ecer, then an explicit inquiry. Never infer selling prices from procurement costs. Supplier source: `https://drive.google.com/drive/folders/1RwtruDL86PYi3TVqILmxrZgZ_XGT1zPv`. Do not publish internal pricing documents. Only authentic and verified product photos belong in `public/assets/images/`. Availability, shipping, and payment are confirmed by the seller.

Commerce is in `src/commerce.ts`, persistence in `src/store.tsx`, routing in `src/App.tsx`. Product data drives category/search results, related products, route generation, and cart validation. Tests cover totals, exact selected variants, encoded WhatsApp order data, persistence sanitization, retired products, and the current client price. Builds include TypeScript, Vite, prerendered routes, asset/link checks, product schema, and private-data checks.

Independent React / TypeScript / Vite boutique storefront. Checkout: **085190952722**.

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:4174`. Verification: `npm test`, `npm run typecheck`, `npm run build`; production preview: `npm run preview`. Static output: `dist/`.

Brand/contact/storage: `src/config.ts`. Catalog: `src/data/products.json`. Client selling-price overrides: `src/data/prices.json`; verified Vuyama Ecer fallback: `src/data/retail-prices.json`. Precedence is client price → Ecer → inquiry. Supplier costs are absent. Unknown retail prices use `null`; known prices remain visible when photos need confirmation. Paris Jadul is the documented alias of Paris Legend, at Rp29,000, with legacy cart/favorite migration.

The current design is an editorial journal with a masthead, photographic spread, staggered product stories, numbered collection index, and distinct catalog/detail layouts. Revision verification: `../qa/revision/RESULTS.md`.

Set `SITE_URL` to the real production origin when building to generate canonical URLs and a sitemap. The build does not assume a domain. Full implementation, catalog evidence, pricing gaps, design decisions, tests, and launch instructions are in `../IMPLEMENTATION.md`.
