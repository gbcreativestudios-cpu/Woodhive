import { useState } from "react";
import { Check } from "lucide-react";
import { SERVICES } from "../../data/services";

/**
 * Distinct from the per-service InquiryForm: this is the general "I don't
 * know exactly what I need yet" entry point from the hero CTA, so it asks
 * what kind of project it is rather than assuming one service.
 */
export default function StartProjectForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
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
        <h4 className="font-display text-lg text-brown-900">Thanks — got it</h4>
        <p className="mt-1.5 text-[13.5px] text-[#5b4636]">
          We&rsquo;ll take a look and follow up within a week to talk it through.
        </p>
      </div>
    );
  }

  return (
    <form
      name="start-a-project"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rounded-lg border border-sand-100 bg-cream-50 p-6 sm:p-7"
    >
      <input type="hidden" name="form-name" value="start-a-project" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <h4 className="font-display text-[19px] text-brown-900">Start a project</h4>
      <p className="mb-5 mt-1 text-[13px] text-[#5b4636]">
        Not sure exactly what you need yet? Tell us the shape of it and we&rsquo;ll point you the
        right way.
      </p>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">Full name</label>
          <input
            type="text"
            name="name"
            required
            className="h-11 w-full rounded-lg border border-sand-100 bg-white px-3.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">Email</label>
          <input
            type="email"
            name="email"
            required
            className="h-11 w-full rounded-lg border border-sand-100 bg-white px-3.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500"
          />
        </div>
      </div>

      <div className="mt-3.5">
        <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">
          What are you starting?
        </label>
        <select
          name="project_type"
          required
          className="h-11 w-full rounded-lg border border-sand-100 bg-white px-3.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div className="mt-3.5">
        <label className="mb-1.5 block text-[12.5px] font-semibold text-brown-900">
          Tell us about it
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-sand-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-orange-500"
        />
      </div>

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
        {status === "sending" ? "Sending…" : "Start the Conversation"}
      </button>
    </form>
  );
}
