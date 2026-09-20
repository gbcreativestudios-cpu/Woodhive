import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "../ui/Logo";
import { SERVICES } from "../../data/services";
import { useInquiryModal } from "../../context/InquiryModalContext";

const linkClass = ({ isActive }) =>
  `text-sm transition-colors ${
    isActive ? "font-semibold text-gold-400" : "font-medium text-cream-50/90 hover:text-gold-400"
  }`;

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { openStartProject } = useInquiryModal();
  const { pathname } = useLocation();
  const onServicePage = pathname.startsWith("/services/");
  const servicesRef = useRef(null);

  // Click-outside closes the dropdown — needed because clicking the trigger
  // only ever opens it now (see onClick below), so something has to close it
  // for mouse users who click without moving away, and for touch/trackpad
  // users who have no hover-out to rely on.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-4 top-4 z-40 sm:inset-x-5 sm:top-5"
    >
      <div className="flex items-center justify-between rounded-[20px] border border-white/15 bg-[rgba(30,17,7,0.45)] px-4 py-3 backdrop-blur-lg sm:px-5">
        <Link to="/" onClick={closeAll}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          {/* Product & Services has no page of its own anymore — the label
              itself doesn't navigate. Only the dropdown items (each service's
              own page) are clickable. Hover opens it on desktop; the chevron
              button also toggles it by click for trackpad/touch-laptop use. */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen(true)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                onServicePage ? "font-semibold text-gold-400" : "font-medium text-cream-50/90 hover:text-gold-400"
              }`}
              aria-expanded={servicesOpen}
            >
              Product &amp; Services
              <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex">
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl bg-cream-50 shadow-xl shadow-black/25">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        onClick={closeAll}
                        className="block px-5 py-3 text-left text-[13.5px] text-brown-900 transition-colors hover:bg-sand-100 hover:text-orange-500"
                      >
                        {s.navLabel}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/gallery" className={linkClass}>
            Gallery
          </NavLink>
          <NavLink to="/faq" className={linkClass}>
            FAQ
          </NavLink>
        </nav>

        <button
          onClick={openStartProject}
          className="hidden items-center gap-1.5 rounded-lg bg-gold-400 px-5 py-2.5 text-[13.5px] font-bold text-ink-900 transition-colors hover:bg-orange-400 lg:inline-flex"
        >
          Reach out <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={() => {
            setMobileOpen((v) => !v);
            setMobileServicesOpen(false);
          }}
          className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/10 text-cream-50 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 overflow-hidden rounded-2xl bg-[rgba(30,17,7,0.9)] backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              <Link to="/" onClick={closeAll} className="px-2 py-2.5 text-sm text-cream-50">
                Home
              </Link>
              <Link to="/about" onClick={closeAll} className="px-2 py-2.5 text-sm text-cream-50">
                About
              </Link>

              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex items-center justify-between px-2 py-2.5 text-left text-sm text-cream-50"
                aria-expanded={mobileServicesOpen}
              >
                Product &amp; Services
                <motion.span
                  animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <ChevronDown className="h-[15px] w-[15px]" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-2 flex flex-col border-l border-cream-50/15 pl-3">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          onClick={closeAll}
                          className="px-2 py-2.5 text-left text-[13.5px] text-cream-50/75"
                        >
                          {s.navLabel}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/gallery" onClick={closeAll} className="px-2 py-2.5 text-sm text-cream-50">
                Gallery
              </Link>
              <Link to="/faq" onClick={closeAll} className="px-2 py-2.5 text-sm text-cream-50">
                FAQ
              </Link>

              <button
                onClick={() => {
                  closeAll();
                  openStartProject();
                }}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gold-400 px-5 py-3 text-[13.5px] font-bold text-ink-900"
              >
                Reach out <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
