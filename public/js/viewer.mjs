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

// Theme toggle. The initial theme is set before paint by an inline script in
// index.html; here we just flip + persist it on click.
const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');
document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  if (themeColor) {
    themeColor.content = next === "dark" ? "#16130f" : "#ece8df";
  }
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

// PDFViewer doesn't auto-refit on resize, so re-apply page-width ourselves.
eventBus.on("pagesinit", () => {
  pdfViewer.currentScaleValue = "page-width";
  // Applying the scale scrolls the first page into view (past the header);
  // snap back to the top so the header is visible on load.
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
    if (pdfViewer.pdfDocument) {
      pdfViewer.currentScaleValue = "page-width";
    }
  });
});

const loadingTask = getDocument({ url: PDF_URL });
const pdfDocument = await loadingTask.promise;
pdfViewer.setDocument(pdfDocument);
linkService.setDocument(pdfDocument, null);
