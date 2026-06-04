// Minimal pdf.js viewer for the resume. Uses the prebuilt pdfjs-dist
// "component" bundle from a pinned CDN so the site stays static / no-build.
//
// Load order matters: pdf.min.mjs sets `globalThis.pdfjsLib`, which
// pdf_viewer.mjs reads at evaluation time. ESM evaluates the first import
// fully before the second, so importing the library first is what wires it up.
import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/build/pdf.min.mjs";
import {
  EventBus,
  PDFLinkService,
  PDFViewer,
} from "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/web/pdf_viewer.mjs";

const { getDocument, GlobalWorkerOptions } = pdfjsLib;

GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/build/pdf.worker.min.mjs";

const PDF_URL = "/files/jatin-resume.pdf";

// Theme: tri-state choice (system | light | dark). The initial state is set
// before paint by an inline script in index.html; here we cycle + persist it,
// resolve "system" against the OS preference, and keep it live.
const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');
const toggle = document.querySelector(".theme-toggle");
const THEME_ORDER = ["system", "light", "dark"];
const prefersDark = matchMedia("(prefers-color-scheme: dark)");

function applyTheme(choice, persist) {
  const resolved =
    choice === "system" ? (prefersDark.matches ? "dark" : "light") : choice;
  root.dataset.themeChoice = choice;
  root.dataset.theme = resolved;
  if (themeColor) {
    themeColor.content = resolved === "dark" ? "#16130f" : "#ece8df";
  }
  if (toggle) {
    toggle.title = `Theme: ${choice}`;
    toggle.setAttribute("aria-label", `Theme: ${choice} (click to change)`);
  }
  if (persist) {
    try {
      localStorage.setItem("theme", choice);
    } catch {}
  }
}

// Follow the OS preference live while in "system" mode.
prefersDark.addEventListener("change", () => {
  if ((root.dataset.themeChoice || "system") === "system") {
    applyTheme("system", false);
  }
});

applyTheme(root.dataset.themeChoice || "system", false);
toggle?.addEventListener("click", () => {
  const cur = root.dataset.themeChoice || "system";
  applyTheme(THEME_ORDER[(THEME_ORDER.indexOf(cur) + 1) % 3], true);
});

const container = document.getElementById("viewerContainer");
const eventBus = new EventBus();

// Keep clickable hyperlinks (the resume uses LaTeX hyperref). No find
// controller, scripting, or XFA — none are needed for a static resume.
const linkService = new PDFLinkService({ eventBus });
linkService.externalLinkTarget = 2; // LinkTarget.BLANK
linkService.externalLinkRel = "noopener noreferrer";

const pdfViewer = new PDFViewer({
  container,
  viewer: document.getElementById("viewer"),
  eventBus,
  linkService,
});
linkService.setViewer(pdfViewer);

// At default ("100%") zoom the page is capped at 768px wide and centred; the
// container spans the full viewport so a zoomed-in page can pan. This fit scale
// is also the zoom floor — you can zoom in from it but never below it.
const MAX_PAGE_WIDTH = 768;
const SIDE_GUTTER = 16; // each side, when the viewport is narrower than the cap
let minScale = 0;
let fitScale = 0;
let unscaledWidth = 0; // the page's CSS width at scale 1 (constant per document)

function computeFit() {
  if (!unscaledWidth) {
    // Read the page's intrinsic CSS width straight from pdf.js (width / scale);
    // this is timing-independent, unlike measuring the DOM after a scale change.
    const pv = pdfViewer.getPageView?.(0);
    if (pv?.width && pv?.scale) {
      unscaledWidth = pv.width / pv.scale;
    }
  }
  if (!unscaledWidth) {
    return pdfViewer.currentScale || 1;
  }
  const target = Math.min(MAX_PAGE_WIDTH, container.clientWidth - 2 * SIDE_GUTTER);
  return target / unscaledWidth;
}

// (Re)fit to the capped width. `force` always applies it; otherwise it's only
// re-applied when the user hasn't manually zoomed away from the previous fit.
function refit(force) {
  if (!pdfViewer.pdfDocument) {
    return;
  }
  const wasAtFit = fitScale && Math.abs(pdfViewer.currentScale - fitScale) < 1e-3;
  fitScale = computeFit();
  minScale = fitScale;
  if (force || wasAtFit) {
    pdfViewer.currentScale = fitScale;
  }
}

eventBus.on("pagesinit", () => {
  refit(true);
  requestAnimationFrame(() => {
    container.scrollTop = 0;
  });
});

let resizeRaf = 0;
window.addEventListener("resize", () => {
  if (resizeRaf) {
    return;
  }
  resizeRaf = requestAnimationFrame(() => {
    resizeRaf = 0;
    refit(false);
  });
});

// ── Native zoom (re-render at scale), like web/viewer.html ─────────────────
// Ctrl/⌘ + wheel, trackpad pinch, keyboard (Ctrl/⌘ +/−/0) and touch pinch all
// drive pdfViewer.updateScale, which re-renders the page crisply (anchored at
// the cursor/pinch point) instead of the browser bitmap-scaling it.
const ZOOM_DELAY = 400; // ms: quick scaled preview, then a sharp re-render
const zoomAccum = { ticks: 0, factor: 1, touch: 1 };

// Single entry point so every gesture honours the fit-to-width floor.
function applyZoom({ steps = null, scaleFactor = null, origin }) {
  const zoomingOut =
    (steps !== null && steps < 0) || (scaleFactor !== null && scaleFactor < 1);
  if (zoomingOut && minScale && pdfViewer.currentScale <= minScale + 1e-3) {
    return; // already at the fit-to-width floor
  }
  pdfViewer.updateScale({ steps, scaleFactor, origin, drawingDelay: ZOOM_DELAY });
  if (minScale && pdfViewer.currentScale < minScale) {
    pdfViewer.currentScale = minScale; // clamp back up to the fit floor
  }
}

function accumulateTicks(ticks, key) {
  if ((zoomAccum[key] > 0 && ticks < 0) || (zoomAccum[key] < 0 && ticks > 0)) {
    zoomAccum[key] = 0;
  }
  zoomAccum[key] += ticks;
  const whole = Math.trunc(zoomAccum[key]);
  zoomAccum[key] -= whole;
  return whole;
}
function accumulateFactor(prevScale, factor, key) {
  if (factor === 1) {
    return 1;
  }
  if ((zoomAccum[key] > 1 && factor < 1) || (zoomAccum[key] < 1 && factor > 1)) {
    zoomAccum[key] = 1;
  }
  const next =
    Math.floor(prevScale * factor * zoomAccum[key] * 100) / (100 * prevScale);
  zoomAccum[key] = factor / next;
  return next;
}
function normalizeWheelDirection(evt) {
  let delta = Math.hypot(evt.deltaX, evt.deltaY);
  const angle = Math.atan2(evt.deltaY, evt.deltaX);
  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
  }
  return delta;
}

// Tell a real Ctrl press apart from a trackpad pinch (which fakes ctrlKey).
let isCtrlKeyDown = false;
addEventListener("keydown", e => {
  if (e.key === "Control") isCtrlKeyDown = true;
});
addEventListener("keyup", e => {
  if (e.key === "Control") isCtrlKeyDown = false;
});

addEventListener(
  "wheel",
  evt => {
    if (!pdfViewer.pdfDocument) {
      return;
    }
    const deltaMode = evt.deltaMode;
    let scaleFactor = Math.exp(-evt.deltaY / 100);
    const isPinch =
      evt.ctrlKey &&
      !isCtrlKeyDown &&
      deltaMode === WheelEvent.DOM_DELTA_PIXEL &&
      evt.deltaX === 0 &&
      Math.abs(scaleFactor - 1) < 0.05 &&
      evt.deltaZ === 0;

    if (!(isPinch || evt.ctrlKey || evt.metaKey)) {
      return; // plain scroll — let the container scroll normally
    }
    evt.preventDefault();
    const origin = [evt.clientX, evt.clientY];

    if (isPinch) {
      scaleFactor = accumulateFactor(pdfViewer.currentScale, scaleFactor, "factor");
      applyZoom({ scaleFactor, origin });
      return;
    }
    const delta = normalizeWheelDirection(evt);
    const ticks =
      deltaMode === WheelEvent.DOM_DELTA_PIXEL
        ? accumulateTicks(delta / 30, "ticks")
        : Math.abs(delta) >= 1
          ? Math.sign(delta)
          : accumulateTicks(delta, "ticks");
    if (ticks) {
      applyZoom({ steps: ticks, origin });
    }
  },
  { passive: false }
);

addEventListener("keydown", evt => {
  if (!(evt.ctrlKey || evt.metaKey) || evt.altKey || !pdfViewer.pdfDocument) {
    return;
  }
  switch (evt.key) {
    case "+":
    case "=":
      evt.preventDefault();
      applyZoom({ steps: 1 });
      break;
    case "-":
      evt.preventDefault();
      applyZoom({ steps: -1 });
      break;
    case "0":
      evt.preventDefault();
      refit(true);
      break;
  }
});

// Touch pinch (phones/tablets) → native zoom. TouchManager requires a signal.
if (pdfjsLib.TouchManager) {
  try {
    new pdfjsLib.TouchManager({
      container: window,
      signal: new AbortController().signal,
      onPinching: (origin, prevDistance, distance) => {
        if (!pdfViewer.pdfDocument) {
          return;
        }
        const scaleFactor = accumulateFactor(
          pdfViewer.currentScale,
          distance / prevDistance,
          "touch"
        );
        applyZoom({ scaleFactor, origin });
      },
      onPinchEnd: () => {
        zoomAccum.touch = 1;
      },
    });
  } catch {
    // Pinch is a progressive enhancement; ignore if the API shape changes.
  }
}

const loadingTask = getDocument({ url: PDF_URL });
const pdfDocument = await loadingTask.promise;
pdfViewer.setDocument(pdfDocument);
linkService.setDocument(pdfDocument, null);
