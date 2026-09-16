import { createContext, useContext, useState, useCallback } from "react";
import Modal from "../components/ui/Modal";
import InquiryForm from "../components/services/InquiryForm";
import StartProjectForm from "../components/home/StartProjectForm";
import { SERVICES_BY_SLUG } from "../data/services";

const InquiryModalContext = createContext(null);

/**
 * Any component can call useInquiryModal().open("renovation-and-maintenance")
 * or .openStartProject() to pop the matching form, without prop-drilling
 * open state through every page.
 */
export function InquiryModalProvider({ children }) {
  const [activeSlug, setActiveSlug] = useState(null); // service slug, or "start-a-project"

  const open = useCallback((slug) => setActiveSlug(slug), []);
  const openStartProject = useCallback(() => setActiveSlug("start-a-project"), []);
  const close = useCallback(() => setActiveSlug(null), []);

  const service = activeSlug && activeSlug !== "start-a-project" ? SERVICES_BY_SLUG[activeSlug] : null;

  return (
    <InquiryModalContext.Provider value={{ open, openStartProject, close }}>
      {children}
      <Modal open={!!activeSlug} onClose={close} title="Inquiry form">
        {activeSlug === "start-a-project" && <StartProjectForm />}
        {service && <InquiryForm name={service.formName} withUpload={service.formUpload} />}
      </Modal>
    </InquiryModalContext.Provider>
  );
}

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext);
  if (!ctx) throw new Error("useInquiryModal must be used within InquiryModalProvider");
  return ctx;
}
