import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { applyTypography } from "./lib/typography";
import settings from "../content/settings/general.json";

applyTypography();

async function prepareLoaderLogo() {
  const loader = document.getElementById("site-loader");
  const mark = document.getElementById("site-loader-mark");
  if (loader) loader.style.backgroundColor = settings.loaderBackgroundColor || "#331603";
  const logoPath = settings.loaderLogoImage || settings.footerLogoImage;
  if (!mark || !logoPath) return;

  try {
    const isSvg = logoPath.toLowerCase().split("?")[0].endsWith(".svg");
    if (!isSvg) {
      const image = new Image();
      image.alt = "";
      image.src = logoPath;
      await image.decode();
      mark.replaceChildren(image);
      return;
    }

    const response = await fetch(logoPath);
    if (!response.ok) throw new Error("Loading logo could not be fetched");
    const source = await response.text();
    const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
    const svg = parsed.documentElement;
    if (svg.tagName.toLowerCase() !== "svg" || parsed.querySelector("parsererror")) {
      throw new Error("Loading logo is not a valid SVG");
    }

    svg.querySelectorAll("script, foreignObject, iframe, object, embed").forEach((node) => node.remove());
    [svg, ...svg.querySelectorAll("*")].forEach((node) => {
      [...node.attributes].forEach((attribute) => {
        const name = attribute.name.toLowerCase();
        const value = attribute.value.trim().toLowerCase();
        if (
          name.startsWith("on") ||
          ((name === "href" || name.endsWith(":href")) && value && !value.startsWith("#")) ||
          value.includes("javascript:")
        ) {
          node.removeAttribute(attribute.name);
        }
      });

      const fill = (node.getAttribute("fill") || "").replaceAll(" ", "").toLowerCase();
      if (
        node.id === "loader-accent" ||
        node.getAttribute("data-loader-accent") === "true" ||
        fill === "#d88b36"
      ) {
        node.classList.add("loader-orange-mark");
      }
    });

    svg.setAttribute("aria-hidden", "true");
    mark.replaceChildren(document.importNode(svg, true));
  } catch {
    // Keep the loader empty if its configured logo cannot be loaded.
  }
}

window.woodhiveLoaderReady = prepareLoaderLogo();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
