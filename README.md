# occupysaas.com

The public site for **OccupySaaS** — clean-room, open-source, drop-in replacements for the SaaS giants.

Plain static HTML/CSS/JS, no build step.

```
index.html            the page
assets/css/site.css   styles (black / white / protest red)
assets/js/site.js     mobile nav + scroll reveal
assets/img/           logo, crowd silhouette, favicon, social card
```

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`, then set the
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
