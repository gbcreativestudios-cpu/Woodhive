import { useParams, Navigate, Link } from "react-router-dom";
import Reveal, { RevealGroup, RevealItem } from "../components/ui/Reveal";
import PageHero from "../components/layout/PageHero";
import ClosingCTA from "../components/home/ClosingCTA";
import { SERVICES, SERVICES_BY_SLUG } from "../data/services";
import { WORKS } from "../data/gallery";
import { useInquiryModal } from "../context/InquiryModalContext";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES_BY_SLUG[slug];
  const { open } = useInquiryModal();

  if (!service) return <Navigate to="/" replace />;

  const works = WORKS.filter((w) => w.category === service.galleryCategory);
  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        subtitle={service.description}
        image={service.img}
        minH="min-h-[46vh]"
      />

      {/* Description + what's included */}
      <section className="mx-auto max-w-[760px] px-6 py-14 text-center">
        <Reveal>
          <ul className="inline-flex flex-col gap-2.5 text-left">
            {service.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-[#5b4636]">
                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Work done for this service */}
      {works.length > 0 && (
        <section className="bg-sand-100 px-6 py-16">
          <div className="mx-auto max-w-[1040px]">
            <Reveal>
              <p className="text-[13.5px] font-bold text-orange-500">Work we&rsquo;ve done</p>
              <h2 className="mt-2.5 font-display text-[clamp(24px,3vw,32px)] text-brown-900">
                {service.title} in practice
              </h2>
            </Reveal>
            <RevealGroup className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((w) => (
                <RevealItem key={w.title}>
                  <Link to="/gallery" className="group block">
                    <img
                      src={`https://picsum.photos/seed/${w.seed}/560/450`}
                      alt={w.title}
                      loading="lazy"
                      className="h-56 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <h3 className="mt-3 font-display text-[16px] text-brown-900">{w.title}</h3>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Service-specific CTA → pops this service's form */}
      <section className="px-6 py-16 text-center">
        <Reveal variant="scale" className="mx-auto max-w-lg">
          <h2 className="font-display text-[clamp(24px,3vw,32px)] text-brown-900">
            {service.ctaLabel}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#5b4636]">
            Tell us what you&rsquo;re working with and we&rsquo;ll come back with next steps.
          </p>
          <button
            onClick={() => open(service.slug)}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-orange-500 px-7 py-3.5 text-sm font-bold text-cream-50 transition-transform hover:scale-[1.02] hover:bg-orange-400"
          >
            Request {service.title}
          </button>
        </Reveal>
      </section>

      {/* Cross-links to the other two services */}
      <section className="border-t border-sand-100 px-6 py-14">
        <div className="mx-auto max-w-[1040px]">
          <p className="text-center text-[13px] font-semibold text-brown-900/50">
            Looking for something else?
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-lg border border-sand-100 px-5 py-2.5 text-[13.5px] font-semibold text-brown-900 transition-colors hover:border-orange-500 hover:text-orange-500"
              >
                {s.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        title="Have something else in mind?"
        body="Bring us the idea, the problem, or the space — we'll help you shape it."
        cta="Start a Conversation"
      />
    </>
  );
}
