# Live Resume Preview

A live preview of my resume using [pdf.js](https://mozilla.github.io/pdf.js/), so it can be shared as a link instead of a raw PDF file.

It's a fully static, **no-build** site: a single `index.html` plus a small ES module that renders the résumé PDF with the prebuilt `pdf.js` viewer component loaded from a pinned CDN. All served files live in `public/`, which Vercel serves at the site root.

## Preview
![cover](https://github.com/user-attachments/assets/f8c8b4df-ddfe-446d-8f07-a28bba19fc56)

## Features

- **Responsive**: pages refit to the viewport on resize.
- **Selectable text & clickable links**: rendered by the `pdf.js` `PDFViewer` component.
- **Download**: one-click download of the source PDF.

## Project structure

`index.html` is at the repo root; everything else lives in `public/`. Vercel
serves the contents of `public/` at the site root, so `public/css/viewer.css`
is requested as `/css/viewer.css`, etc.

```
index.html             # page shell: <head> meta, header (avatar + download), viewer container
vercel.json            # static hosting config (no build; outputDirectory ".")
public/                # served at the site root (/)
  css/viewer.css       # styling (centered, capped width, page shadow)
  js/viewer.mjs        # imports pdf.js from the CDN and renders /files/jatin-resume.pdf
  images/profile.png   # avatar + social preview image
  files/jatin-resume.pdf
  favicon.ico, *.png   # favicon set (served at /)
  site.webmanifest     # PWA manifest
```

## Getting Started

There is no build step or dependency install. Because `index.html` is at the
root while assets live in `public/` (served at `/`), use `vercel dev` for a
faithful local preview:

```sh
npx vercel dev
```

Then open the printed URL.

## Updating the resume

The resume is compiled from LaTeX (`jatin-resume.tex`). Drop the compiled PDF in as `public/files/jatin-resume.pdf` and commit. The `Update Resume` GitHub Action can also fetch a PDF from FlowCV into `public/files/jatin-resume.pdf` via `workflow_dispatch`.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please reach out to [Jatin](mailto:heyjatinn@gmail.com).
