# The Wood Hive

## Content editing (Decap CMS)

This site's content is editable through Decap CMS at `/admin` once deployed
on Netlify — no code changes needed for text, images, services, products,
gallery pieces, or FAQs. Two things need turning on in the Netlify
dashboard first (both one-time, both free):

1. **Site settings → Identity → Enable Identity.** This is what lets people
   log in to `/admin`. Under Identity settings, set registration to
   **Invite only** unless you want anyone to be able to sign themselves up
   as an editor.
2. **Site settings → Identity → Services → Git Gateway → Enable Git
   Gateway.** This is what lets a logged-in editor's changes actually get
   committed back to this repo.

Then, under the Identity tab, **invite yourself** (and anyone else who
should be able to edit) by email. You'll get an email with a link that logs
you in and sends you to `/admin`.

Once that's done, visiting `yoursite.com/admin` shows an editor with a
section for every part of the site — Site Settings (including the nav and
footer logos, which are independent images), Home Page, About Page, Gallery
Page, FAQ Page, Services, the Wooden Products catalog, and Gallery Items.
Saving a change there commits it to this repo and Netlify rebuilds the
site automatically, same as a normal git push.

### Where the content actually lives

Every editable file is plain JSON under `content/`, matched 1:1 to a
section in `public/admin/config.yml`. If you ever want to hand-edit
something instead of using `/admin`, it's safe to edit these JSON files
directly — Decap will pick up whatever's there next time someone opens the
editor.

## Forms

Every form on the site (the per-service inquiry forms, "Start a project" and
"Leave a review") submits to Netlify Forms. Their text **and their fields**
are editable in `/admin` → **Form Text & Fields**: change any label, button or
message, and add, delete, reorder or retype fields (short text, email, phone,
long text; required or optional; half or full width).

Netlify only learns about a form's fields from static HTML at build time, so
`public/__forms.html` is **generated automatically** from the CMS content by
`scripts/generate-forms.mjs` on every `npm run build` / `npm run dev`. Don't
edit that file by hand. Submissions appear under Site settings → Forms; turn
on email notifications there (Forms → Form notifications) to get each one in
your inbox.

## Reviews

The "Reviews" section sits near the bottom of the home page (move or remove it
in `/admin` → Home Page → Section Order).

1. A visitor clicks **Leave a review** and fills in name, company, position,
   their review and (optionally) a photo.
2. It arrives in Netlify under **Forms → leave-a-review** (and by email if you
   set up a notification). Nothing is published automatically, so spam and
   abuse never reach the live site.
3. To publish one, open `/admin` → **Customer Reviews** → **New Customer
   Review**, copy the details across (download the photo from Netlify and
   upload it here if they sent one) and publish. To hide one later without
   deleting it, untick **Published**.

New reviews are added at the end (bottom of the grid, tail of the ticker). With
fewer than 3 reviews on desktop (2 on mobile) they show as static cards; at 3
(desktop) or 2 (mobile) and above they become a continuously scrolling ticker
that pauses on hover. Both thresholds are editable in `/admin` → Home Page →
Reviews Section.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

