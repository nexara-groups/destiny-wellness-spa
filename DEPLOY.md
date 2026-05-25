# Cloudflare Pages Deployment

**Build command:** `npm run build`  
**Output directory:** `out`  
**Node version env var:** `NODE_VERSION=20`

Framework preset: `Next.js (Static HTML Export)` or `None`

After connecting repo in Cloudflare Pages dashboard, set these in Settings → Environment Variables:
- `NODE_VERSION` = `20`

Do not use the regular Next.js SSR/OpenNext preset for this project. The site is configured with `output: 'export'` in `next.config.ts`, so `next build` emits static files into `out`. If Cloudflare runs `npx opennextjs-cloudflare build`, deployment will fail because OpenNext expects server/standalone build artifacts that this static export intentionally does not create.

If you see an error like:

```text
ENOENT: no such file or directory, open '.next/standalone/.next/server/pages-manifest.json'
Running custom build `npx opennextjs-cloudflare build` failed
```

change the Cloudflare Pages build settings to:

- Framework preset: `Next.js (Static HTML Export)` or `None`
- Build command: `npm run build`
- Build output directory: `out`
