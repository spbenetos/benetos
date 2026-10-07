# benetos.com

The website for Benetos, Althea and Benefits. Plain HTML and CSS with one small script: no framework and no build step. Any static host can serve it as it is.

## Pages

| Address | File | Used by |
|---|---|---|
| `/` | `index.html` | Home |
| `/althea/` | `althea/index.html` | Althea |
| `/althea-privacy` | `althea-privacy/index.html` | Althea app (paywall, Profile, subscription screens), App Store Connect privacy policy URL |
| `/althea-terms` | `althea-terms/index.html` | Althea app (paywall, Profile, subscription screens) |
| `/benefits/` | `benefits/index.html` | Benefits |
| `/benefits-privacy` | `benefits-privacy/index.html` | Benefits app (Settings › About), App Store Connect privacy policy URL |
| `/benefits-terms` | `benefits-terms/index.html` | Benefits app (Settings › About) |
| `/benefits-support` | `benefits-support/index.html` | App Store Connect support URL |
| anything else | `404.html` | Not-found page |

`althea-privacy.html` and the other `*.html` files beside the folders send old `.html` links to the clean addresses.

## Files

- `assets/css/site.css`: the Benetos design tokens and components. Each page also has a short `<style>` block of its own.
- `assets/js/site.js`: bloom hover on buttons, the Menu sheet, the product tabs and the venture arrows (about 4 KB).
- `assets/fonts/`: Commissioner (Latin and Greek).
- `assets/img/`: page images. Large ones also have a `-1200` copy for phones.
- `assets/og/`: the pictures shown when a page is shared in Messages, WhatsApp or social apps.
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`: browser and home-screen icons.
- `CNAME`: tells GitHub Pages the domain is benetos.com.
- `robots.txt`, `sitemap.xml`: for search engines.

## Publishing with GitHub Pages

1. GitHub Pages is free only for **public** repositories. The `benetos` repository is private, so either make it public (Settings › General › Danger Zone › Change visibility; it only holds this website) or keep it private and host it on Cloudflare Pages instead, which is also free.
2. In the `benetos` repository, choose **uploading an existing file**, drag in everything in this folder (the files and folders, not the folder itself) and commit to `main`.
3. Settings › Pages: under Source, choose **Deploy from a branch**, then `main` and `/ (root)`, and save. The custom domain field fills in as `benetos.com` from the `CNAME` file.
4. At your domain registrar, set these DNS records for benetos.com:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` record for `www`: `spbenetos.github.io`
5. When GitHub shows the domain as verified (it can take up to a day), tick **Enforce HTTPS**.
6. Open https://benetos.com/benefits-privacy and https://benetos.com/althea-privacy to check.

## Moving Althea's legal pages from althea.team

The Althea app still opens `althea.team/privacy-policy` and `althea.team/terms-of-use`. Until a new version is out, keep althea.team working. The folder `althea-team-redirects` (sent separately) replaces those two pages on althea.team with forwards to benetos.com, so both addresses lead to one copy.

In the Althea app (glptracker-ios), replace

- `https://althea.team/privacy-policy` with `https://benetos.com/althea-privacy`
- `https://althea.team/terms-of-use` with `https://benetos.com/althea-terms`

in `PaywallStepView.swift`, `ProfileView.swift`, `SubscriptionExpiredView.swift` and `SecondChanceOfferView.swift`. In App Store Connect, change Althea's Privacy Policy URL to `https://benetos.com/althea-privacy`.

## Changing a page

Edit the HTML file directly. The text is plain markup: headings, paragraphs and lists. When a privacy policy or terms page changes, update its "Last updated" date and the `datetime` on the `<time>` tag next to it.
