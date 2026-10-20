# Initium website

Read `README.md` first, then `docs/design.md` (design rules), `docs/media.md` (image and video slots) and
`docs/deploy.md` (build, deploy, checks). Those files are the source of truth. Keep them up to date in the same commit
as the change they describe.

## Working rules
- Copy lives in `content/*.js`; never edit words inside a component. Tokens live in `app/tokens.css`; never hard-code
  a colour, size or duration.
- Build one component or page at a time. After each change run `npm run build` in a copy of the folder (never next to
  a running `npm run dev`), then `scripts/shots.py`, and look at the screenshots.
- Never commit original or master media. Convert and crop first (see `docs/media.md`).
- Comments and commit messages describe what the code does, never what was removed from a picture or why.
