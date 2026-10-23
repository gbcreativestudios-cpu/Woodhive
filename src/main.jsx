import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { applyTypography } from "./lib/typography";
import settings from "../content/settings/general.json";

applyTypography();

async function prepareLoaderLogo() {
  const mark = document.getElementById("site-loader-mark");
  const logoPath = settings.loaderLogoImage || settings.footerLogoImage;
  if (!mark || !logoPath) return;

  try {
    const response = await fetch(logoPath);
    if (!response.ok) throw new Error("Loading logo could not be fetched");
    const source = await response.text();

    if (/<svg[\\s>]/i.test(source)) {
      const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
      const svg = parsed.documentElement;
      if (svg.tagName.toLowerCase() !== "svg" || parsed.querySelector("parsererror")) {
        throw new Error("Loading logo is not a valid SVG");
      }

      svg.querySelectorAll("script, foreignObject, iframe, object, embed").forEach((node) => node.remove());
      svg.querySelectorAll("*").forEach((node) => {
        [...node.attributes].forEach((attribute) => {
          const name = attribute.name.toLowerCase();
          const value = attribute.value.trim().toLowerCase();
          if (name.startsWith("on") || ((name === "href" || name.endsWith(":href")) && value && !value.startsWith("#")) || value.includes("javascript:")) {
            node.removeAttribute(attribute.name);
          }
        });

        const fill = (node.getAttribute("fill") || "").replace(/\\s/g, "").toLowerCase();
        if (
          node.id === "loader-accent" ||
          node.getAttribute("data-loader-accent") === "true" ||
          fill === "#d88b36"
        ) {
          node.classList.add("loader-orange-mark");
        }
      });

      const inlineSvg = document.importNode(svg, true);
      inlineSvg.setAttribute("aria-hidden", "true");
      mark.replaceChildren(inlineSvg);
      return;
    }

    const image = new Image();
    image.alt = "";
    image.src = logoPath;
    await image.decode();
    mark.replaceChildren(image);
  } catch {
    // The built-in favicon mark remains visible if an uploaded logo cannot load.
  }
}

window.woodhiveLoaderReady = prepareLoaderLogo();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
