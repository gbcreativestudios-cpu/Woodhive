import PageHero from "../components/layout/PageHero";
import JumpNav from "../components/services/JumpNav";
import ServiceSection from "../components/services/ServiceSection";
import { IMG } from "../lib/images";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Product & Services"
        title="Three disciplines, one standard of craft"
        subtitle="Renovation and maintenance, custom wooden products, and event rentals — each with its own process, each built by the same team."
        image={IMG.servicesHero}
        minH="min-h-[50vh]"
      />
      <JumpNav />

      <ServiceSection
        id="renovation"
        eyebrow="Service 01"
        title="Renovation and Maintenance"
        description="Flexible renovation, repair, basement finishing and maintenance work for spaces that need structural improvement, fixing, or spatial elevation."
        points={[
          "Basement finishing and structural repair",
          "Built-in shelving, cabinetry, and trim work",
          "Ongoing maintenance contracts for commercial spaces",
        ]}
        img={IMG.renovation}
        formName="renovation-inquiry"
        formUpload
      />

      <ServiceSection
        id="products"
        eyebrow="Service 02"
        title="Wooden Products"
        description="Custom-built mobile carts, check-out stands, stage setups, acoustic panels, and other wood-driven creations engineered for your specific environment."
        points={[
          "Retail fixtures and mobile carts",
          "Acoustic panels and stage builds",
          "One-off furniture and product design",
        ]}
        img={IMG.products}
        formName="products-inquiry"
        withProducts
        reverse
      />

      <ServiceSection
        id="rentals"
        eyebrow="Service 03"
        title="Rentals"
        description="Museum-grade event structures, ceremonial arches, backdrops, and modular pieces available to rent for weddings and celebrations."
        points={[
          "Ceremonial arches and backdrops",
          "Modular staging and lounge structures",
          "Delivery, setup, and teardown included",
        ]}
        img={IMG.rentals}
        formName="rentals-inquiry"
      />
    </>
  );
}
