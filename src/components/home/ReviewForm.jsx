import { useState } from "react";
import { Check, Upload } from "lucide-react";
import { ShortFields, LongFields, labelCls } from "../ui/FormFields";
import forms from "../../../content/forms.json";

const t = forms.reviewForm;
export const REVIEW_FORM_NAME = "leave-a-review";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // keeps the whole request under Netlify's form size limit

/**
 * "Leave a review" form. Posts to Netlify Forms (multipart, because of the
 * optional photo). Submissions are NOT published automatically: they land in
 * Netlify (Forms → leave-a-review) and the site owner publishes the good ones
 * from /admin → Customer Reviews.
 */
export default function ReviewForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error | toolarge
  const [photoName, setPhotoName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const photo = form.elements.photo?.files?.[0];
    if (photo && photo.size > MAX_PHOTO_BYTES) {
      setStatus("toolarge");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/", { method: "POST", body: new FormData(form) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("done");
      form.reset();
      setPhotoName("");
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
      name={REVIEW_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="rounded-lg border border-sand-100 bg-cream-50 p-6 sm:p-7"
    >
      <input type="hidden" name="form-name" value={REVIEW_FORM_NAME} />
      <p className="hidden">
        <label>
          {t.honeypotLabel} <input name="bot-field" />
        </label>
      </p>

      <h4 className="font-display text-[19px] text-brown-900">{t.heading}</h4>
      <p className="mb-5 mt-1 text-[13px] text-[#5b4636]">{t.subheading}</p>

      <ShortFields fields={t.fields} idPrefix={REVIEW_FORM_NAME} />
      <LongFields fields={t.fields} idPrefix={REVIEW_FORM_NAME} />

      <div className="mt-3.5">
        <label className={labelCls}>{t.photoLabel}</label>
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border-[1.5px] border-dashed border-sand-100 px-4 py-4 text-[#8a7358] transition-colors hover:border-orange-500">
          <Upload className="h-4 w-4 shrink-0" />
          <span className="min-w-0 truncate text-[13px]">{photoName || t.photoPrompt}</span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              setPhotoName(e.target.files?.[0]?.name ?? "");
              if (status === "toolarge") setStatus("idle");
            }}
          />
        </label>
      </div>

      {status === "toolarge" && <p className="mt-3 text-[13px] text-orange-500">{t.photoTooLarge}</p>}
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
