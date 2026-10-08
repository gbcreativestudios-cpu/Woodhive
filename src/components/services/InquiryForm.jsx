import { useState } from "react";
import { Check, Upload } from "lucide-react";
import ProductsPicker from "./ProductsPicker";
import { ShortFields, LongFields, labelCls } from "../ui/FormFields";
import forms from "../../../content/forms.json";

const t = forms.inquiryForm;

/**
 * Netlify Forms-ready. `data-netlify` + the hidden form-name field is what
 * Netlify's build-time parser looks for (scripts/generate-forms.mjs writes
 * public/__forms.html from the same content so the two never drift). File
 * uploads require multipart/form-data, which is why the upload variant posts
 * the FormData directly rather than URL-encoding it.
 */
export default function InquiryForm({ name, withUpload = false, withProducts = false }) {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        ...(withUpload
          ? { body: data }
          : {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(data).toString(),
            }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("done");
      form.reset();
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
      name={name}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType={withUpload ? "multipart/form-data" : undefined}
      onSubmit={handleSubmit}
      className="rounded-lg border border-sand-100 bg-cream-50 p-6 sm:p-7"
    >
      <input type="hidden" name="form-name" value={name} />
      <p className="hidden">
        <label>
          {t.honeypotLabel} <input name="bot-field" />
        </label>
      </p>

      <h4 className="font-display text-[19px] text-brown-900">{t.heading}</h4>
      <p className="mb-5 mt-1 text-[13px] text-[#5b4636]">{t.subheading}</p>

      <ShortFields fields={t.fields} idPrefix={name} />

      {withProducts && <ProductsPicker />}

      <LongFields fields={t.fields} idPrefix={name} />

      {withUpload && (
        <div className="mt-3.5">
          <label className={labelCls}>{t.uploadLabel}</label>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border-[1.5px] border-dashed border-sand-100 px-4 py-4 text-[#8a7358] transition-colors hover:border-orange-500">
            <Upload className="h-4 w-4 shrink-0" />
            <span className="text-[13px]">{t.uploadPrompt}</span>
            <input type="file" name="photos" multiple accept="image/*" className="sr-only" />
          </label>
        </div>
      )}

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
