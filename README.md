# occupysaas.com

Reclaiming the software ecosystem, one open-source project at a time.

The public site for **OccupySaaS**: clean-room, open-source, drop-in replacements for the SaaS giants.

Static HTML on GitHub Pages, with Tailwind CSS compiled ahead of time. No client-side framework.

```
index.html                  the page
src/input.css               Tailwind source and design tokens
assets/css/site.css         compiled styles (committed for local preview)
assets/js/site.js           theme toggle, mobile nav, GitHub stars, scroll reveal
assets/img/                 logo, crowd silhouette, favicon, social card
robots.txt                  crawl rules and sitemap pointer
sitemap.xml                 canonical URL list
manifest.webmanifest        install metadata
```

## Build styles

```sh
npm install
npm run build:css      # one-off, minified
npm run dev:css        # watch mode while editing
```

The Pages workflow rebuilds `assets/css/site.css` on every push, so CI never ships stale classes.

## Preview locally

```sh
npm run build:css
npm run serve
# open http://localhost:8000
```

## Publish on GitHub Pages

Settings -> Pages -> *Deploy from a branch* -> `main` / `/ (root)`, then set the
custom domain to `occupysaas.com` (the `CNAME` file in this repo already does this) and
tick *Enforce HTTPS* once the certificate is issued.

DNS at the registrar:

| Type  | Host  | Value                  |
|-------|-------|------------------------|
| A     | `@`   | `185.199.108.153`      |
| A     | `@`   | `185.199.109.153`      |
| A     | `@`   | `185.199.110.153`      |
| A     | `@`   | `185.199.111.153`      |
| AAAA  | `@`   | `2606:50c0:8000::153`  |
| AAAA  | `@`   | `2606:50c0:8001::153`  |
| AAAA  | `@`   | `2606:50c0:8002::153`  |
| AAAA  | `@`   | `2606:50c0:8003::153`  |
| CNAME | `www` | `occupysaas.github.io` |
