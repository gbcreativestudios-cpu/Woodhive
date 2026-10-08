import { useState } from "react";
import { Check } from "lucide-react";
import { SERVICES } from "../../data/services";
import ProductsPicker from "../services/ProductsPicker";
import { ShortFields, LongFields, labelCls, inputCls } from "../ui/FormFields";
import forms from "../../../content/forms.json";

const t = forms.startProjectForm;
const FORM_NAME = "start-a-project";

/**
 * Distinct from the per-service InquiryForm: this is the general "I don't
 * know exactly what I need yet" entry point from the hero CTA, so it asks
 * what kind of project it is rather than assuming one service. The products
 * checklist shows for whichever service has "hasProductsPicker" switched on
 * in the CMS (matched by its current title, so renaming it is safe).
 */
export default function StartProjectForm() {
  const [status, setStatus] = useState("idle");
  const [projectType, setProjectType] = useState("");

  const showProducts = SERVICES.find((s) => s.title === projectType)?.hasProductsPicker === true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("done");
      form.reset();
      setProjectType("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-lg border border-sand-100 bg-cream-50 p-8 text-center">
        <div className="mx-auto mb-3.5 grid h-11 w-11 place-items-center rounded-full bg-orange-500">
          <Check className="h-5 w-5 text-cream-50" />
        </div>
        <h4 className="font-display text-lg text-brown-900">{t.successHeading}</h4>
        <p className="mt-1.5 text-[13.5px] text-[#5b4636]">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rounded-lg border border-sand-100 bg-cream-50 p-6 sm:p-7"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          {t.honeypotLabel} <input name="bot-field" />
        </label>
      </p>

      <h4 className="font-display text-[19px] text-brown-900">{t.heading}</h4>
      <p className="mb-5 mt-1 text-[13px] text-[#5b4636]">{t.subheading}</p>

      <ShortFields fields={t.fields} idPrefix={FORM_NAME} />

      <div className="mt-3.5">
        <label htmlFor={`${FORM_NAME}-project_type`} className={labelCls}>
          {t.projectTypeLabel}
        </label>
        <select
          id={`${FORM_NAME}-project_type`}
          name="project_type"
          required
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className={inputCls}
        >
          <option value="" disabled>
            {t.projectTypePlaceholder}
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value={t.notSureLabel}>{t.notSureLabel}</option>
        </select>
      </div>

      {showProducts && <ProductsPicker />}

      <LongFields fields={t.fields} idPrefix={FORM_NAME} />

      {status === "error" && <p className="mt-3 text-[13px] text-orange-500">{t.errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-lg bg-orange-500 px-5 py-3.5 text-[13.5px] font-bold text-cream-50 transition-colors hover:bg-orange-400 disabled:opacity-60"
      >
        {status === "sending" ? t.sendingLabel : t.submitLabel}
      </button>
    </form>
  );
}
