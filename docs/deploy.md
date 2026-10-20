# Build, publish and check

## Build
`npm run build` writes the whole site as plain files to `out/` (Next.js static export: no server, no API routes, no
runtime image optimisation). The two typefaces are downloaded at build time (`next/font`), so the build needs internet
access.

Never build in the folder where `npm run dev` is running: both use `.next/` and the preview breaks. To check a
production build locally:
```
rsync -a --exclude node_modules --exclude .next --exclude out ./ ../site-build/
cd ../site-build && npm ci && npm run build
python3 -m http.server 8000 --directory out      # http://localhost:8000
```

## Publish (GitHub Actions)
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml):
- **every pull request**: `npm ci` + `npm run build`. The build must pass before merging.
- **every push to `main`**: build, then publish `out/` to GitHub Pages. Live at https://initiumtechnologies.com within a
  few minutes (Actions tab shows progress).

Nothing built is committed: `main` holds source only. With this flow GitHub ignores any `CNAME` or `.nojekyll` file;
the custom domain lives in the repository's Pages settings.

### One-time switch (repository admin)
Until this is done, `main` still holds hand-built files and the workflow's publish step cannot run.
1. Merge the cleanup pull request into `new-site`.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Rename the branches: `main` → `pages-legacy` (keep a week, then delete), then `new-site` → `main`. GitHub moves
   the default branch and open pull requests with the rename.
4. The workflow runs on the new `main` and publishes. Check https://initiumtechnologies.com and the Actions tab.
5. Settings → Pages: the custom domain still reads initiumtechnologies.com with **Enforce HTTPS** ticked.
6. Protect `main`: Settings → Rules → New ruleset: block force pushes and deletions, require a pull request before
   merging (and a code-owner review, which `.github/CODEOWNERS` provides).

### Manual fallback
If Actions is unavailable, build as above, put `out/*` plus a `CNAME` file containing `initiumtechnologies.com` and an
empty `.nojekyll` on a branch, commit, push (never force-push), and point Settings → Pages → Source at that branch.
Switch back to GitHub Actions afterwards.

## Domain and DNS (at Wix)
- Apex `initiumtechnologies.com`: A records to GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153,
  185.199.111.153). `www`: CNAME to `initium-technologies.github.io`. GitHub redirects `www` to the apex and `http`
  to `https`; the certificate renews itself.
- Recommended once: verify the domain with GitHub (organisation Settings → Pages → Verified domains → add the TXT
  record at Wix). Then no other GitHub account can ever claim the domain.

## Checks before merging
- `npm run build` passes (CI runs it on the pull request).
- `python3 scripts/shots.py http://localhost:8000` against a built copy (needs Playwright: `pip install playwright &&
  playwright install chromium`), then look through `shots/`.
- Browser console on the home page, a product page and `/defense/orin/live/`: no errors and no Content Security
  Policy messages. The policy is a meta tag in `app/layout.jsx`; anything loaded from another origin needs a line there.
- New media follows [media.md](media.md).

## Satellite catalogue
`node scripts/update-satellites.mjs` downloads every active satellite's orbit from CelesTrak into
`public/data/satellites.tle` (CelesTrak allows one download per two hours; a 403 means wait). The script refuses to
write a file with fewer than 5,000 satellites, which is what a CelesTrak error page would produce. Commit the new file;
the globe computes positions live, so a few days' age is invisible at globe scale.
