import { useState } from "react";
import { Check, Upload } from "lucide-react";

/**
 * Netlify Forms-ready. `data-netlify` + the hidden form-name field is what
 * Netlify's build-time parser looks for. File uploads require the form to be
 * submitted as multipart/form-data, which is why the upload variant posts the
 * FormData directly rather than URL-encoding it.
 */
export default function InquiryForm({ name, withUpload = false }) {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        // Netlify needs urlencoded for text-only forms, multipart when files are attached
        ...(withUpload
          ? { body: data }
          : {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(data).toString(),
            }),
      });
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-sand-100 bg-cream-50 p-8 text-center">
        <div className="mx-auto mb-3.5 grid h-11 w-11 place-items-center rounded-full bg-orange-500">
          <Check className="h-5 w-5 text-cream-50" />
        </div>
        <h4 className="font-display text-lg text-brown-900">Inquiry received</h4>
        <p className="mt-1.5 text-[13.5px] text-[#5b4636]">
          We&rsquo;ll follow up within a week with next steps.
        </p>
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
      className="rounded-3xl border border-sand-100 bg-cream-50 p-6 sm:p-7"
    >
      <input type="hidden" name="form-name" value={name} />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <h4 className="font-display text-[19px] text-brown-900">Tell us about your project</h4>
      <p className="mb-5 mt-1 text-[13px] text-[#5b4636]">
        Share a few details and we&rsquo;ll come back to you with next steps.
      </p>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="mt-3.5">
        <Field label="Phone (optional)" name="phone" type="tel" />
      </div>
      <div className="mt-3.5">
        <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">
          Tell us what you need
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full rounded-xl border border-sand-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500"
        />
      </div>

      {withUpload && (
        <div className="mt-3.5">
          <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">
            Reference photos (optional)
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-sand-100 px-4 py-4 text-[#8a7358] transition-colors hover:border-orange-500">
            <Upload className="h-4 w-4 shrink-0" />
            <span className="text-[13px]">Attach photos of the space</span>
            <input type="file" name="photos" multiple accept="image/*" className="sr-only" />
          </label>
        </div>
      )}

      {status === "error" && (
        <p className="mt-3 text-[13px] text-orange-500">
          Something went wrong sending that. Please try again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-lg bg-orange-500 px-5 py-3.5 text-[13.5px] font-bold text-cream-50 transition-colors hover:bg-orange-400 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="h-11 w-full rounded-[10px] border border-sand-100 bg-white px-3.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500"
      />
    </div>
  );
}
