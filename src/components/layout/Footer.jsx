import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import Reveal from "../ui/Reveal";
import { LogoMark } from "../ui/Logo";

/* Brand marks aren't in lucide's icon set, so they're drawn here to match its weight. */
function InstagramIcon({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}


function TikTokIcon({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.5 2h-2.9v12.4a2.6 2.6 0 1 1-2-2.53V8.9a5.6 5.6 0 1 0 5 5.56V9.2a6.9 6.9 0 0 0 4 1.28V7.5a4 4 0 0 1-4.1-4Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { label: "Email", href: "mailto:studio@thewoodhive.com", Icon: Mail },
];

export default function Footer() {
  const navigate = useNavigate();

  const goToService = (hash) => {
    navigate("/services");
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <footer className="bg-brown-950">
      <Reveal className="mx-auto max-w-[1040px] px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            {/* Large logo mark, per the reference */}
            <LogoMark className="h-16 w-16" />
          </div>

          <div>
            <h4 className="mb-3.5 text-[13.5px] font-bold text-cream-50">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-[13.5px] text-cream-50/60">
              <li><Link to="/" className="transition-colors hover:text-orange-400">Home</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-orange-400">About</Link></li>
              <li><Link to="/gallery" className="transition-colors hover:text-orange-400">Portfolio Gallery</Link></li>
              <li><Link to="/faq" className="transition-colors hover:text-orange-400">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[13.5px] font-bold text-cream-50">Products &amp; Services</h4>
            <ul className="flex flex-col gap-2 text-[13.5px] text-cream-50/60">
              <li><button onClick={() => goToService("renovation")} className="text-left transition-colors hover:text-orange-400">Renovation &amp; Maintenance</button></li>
              <li><button onClick={() => goToService("products")} className="text-left transition-colors hover:text-orange-400">Wooden Products</button></li>
              <li><button onClick={() => goToService("rentals")} className="text-left transition-colors hover:text-orange-400">Rentals</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[13.5px] font-bold text-cream-50">Connect</h4>
            <ul className="flex flex-col gap-2 text-[13.5px] text-cream-50/60">
              <li>studio@thewoodhive.com</li>
              <li>+1 (555) 438-4483</li>
              <li>140 Timberline Way, Suite 400</li>
            </ul>
            <div className="mt-4 flex gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-cream-50/10 text-cream-50/70 transition-colors hover:bg-orange-500 hover:text-cream-50"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream-50/10 pt-5 text-xs text-cream-50/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} The Wood Hive. All rights reserved.</p>
          <p>Structural Intelligence &amp; Emotional Craftsmanship.</p>
        </div>
      </Reveal>
    </footer>
  );
}
