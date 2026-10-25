# ROONA

Independent React / TypeScript / Vite boutique storefront. Checkout: **085190952722**.

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:4174`. Verification: `npm test`, `npm run typecheck`, `npm run build`; production preview: `npm run preview`. Static output: `dist/`.

Brand/contact/storage: `src/config.ts`. Catalog: `src/data/products.json`. Client selling-price overrides: `src/data/prices.json`; verified Vuyama Ecer fallback: `src/data/retail-prices.json`. Precedence is client price → Ecer → inquiry. Supplier costs are absent. Unknown retail prices use `null`; known prices remain visible when photos need confirmation. Paris Jadul is the documented alias of Paris Legend, at Rp29,000, with legacy cart/favorite migration.

The current design is an editorial journal with a masthead, photographic spread, staggered product stories, numbered collection index, and distinct catalog/detail layouts. Revision verification: `../qa/revision/RESULTS.md`.

Set `SITE_URL` to the real production origin when building to generate canonical URLs and a sitemap. The build does not assume a domain. Full implementation, catalog evidence, pricing gaps, design decisions, tests, and launch instructions are in `../IMPLEMENTATION.md`.
