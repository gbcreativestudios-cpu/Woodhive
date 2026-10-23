import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/layout/Footer";
import { InquiryModalProvider } from "./context/InquiryModalContext";
import Home from "./pages/Home";
import About from "./pages/About";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import settings from "../content/settings/general.json";

/** Jump to top on route change so pages don't open mid-scroll. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* No standalone /services page — each service has its own
              portfolio + inquiry page instead. */}
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const favicon = document.querySelector('link[rel~="icon"]');
    if (favicon) favicon.href = settings.faviconImage || "/images/favicon.svg";

    const loader = document.getElementById("site-loader");
    if (!loader) return undefined;

    let fadeTimeout;
    let removeTimeout;
    let cancelled = false;
    Promise.resolve(window.woodhiveLoaderReady)
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;
        fadeTimeout = window.setTimeout(() => {
          loader.classList.add("is-loaded");
          removeTimeout = window.setTimeout(() => loader.remove(), 240);
        }, 120);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(removeTimeout);
    };
  }, []);

  return (
    <BrowserRouter>
      <InquiryModalProvider>
        <ScrollToTop />
        <AnimatedRoutes />
      </InquiryModalProvider>
    </BrowserRouter>
  );
}
