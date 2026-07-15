# Supabase Setup Guide

This guide describes the current Supabase backend used by the portfolio.

## 1. Project and Environment

Create a Supabase project, then copy the project URL and anon public key into `frontend/.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Keep real values in `.env.local` only. `frontend/.env.example` must stay placeholder-only.

Important: do not add AI provider keys, service-role keys, or email-provider secrets to `frontend/.env.local`. That file is bundled into the browser when values use the `VITE_` prefix, so it should stay limited to browser-safe values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 2. Database Migrations

Run the files in `supabase/migrations` in order. They create and update:

- `projects` for portfolio cards, case studies, and graphic design detail data.
- `blog_posts` for the blog CMS.
- `contacts` for public contact inquiries.
- `testimonials` for Edge Function submission and admin approval.
- `appointments` for consultation booking.
- `experiences` for the homepage experience section managed from the admin dashboard.

The active testimonial workflow uses:

- `pending`: submitted publicly and awaiting admin review.
- `approved`: visible on public testimonial sections/pages.
- `rejected`: retained in the dashboard but hidden publicly.

The graphic design project layout uses:

- `design_images`: JSON array of `{ "src": "...", "alt": "..." }`.
- `design_details`: JSON object containing design type, client or brand, objective, audience, color palette, fonts, font weights, style, tools, copywriting, layout notes, and notes.

## 3. Storage

Create a public Supabase Storage bucket:

```txt
portfolio-assets
```

Use it for project images, graphic design previews, blog covers, and testimonial photos. Public read access is required for current frontend rendering. Restrict direct upload/update/delete access to the authenticated admin; public testimonial image uploads are handled by the `submit-testimonial` Edge Function with the service role secret.

## 4. Admin Authentication

Create the admin user in Supabase Auth with this email:

```txt
mbengespoir@gmail.com
```

The latest RLS policies use the authenticated JWT email to allow admin management of projects, experiences, blog posts, contacts, testimonials, and appointments.

## 5. Edge Functions, Email, and Dashboard AI

The contact and booking flows save records in the database first, then invoke Edge Functions for email notifications. Public testimonial reviews are submitted through the `submit-testimonial` Edge Function so profile image upload and pending moderation happen server-side.

The admin dashboard also uses the `extract-dashboard-content` Edge Function for the "Quick Import with AI Assistant" workflow. It accepts raw pasted notes, validates the authenticated admin user, calls Gemini or Groq using function-only secrets, and returns JSON for the dashboard forms to review before saving.

The assistant supports `project`, `blog`, `testimonial`, and `experience` content types. It accepts both one-shot extraction and chat-style refinement:

```json
{
  "mode": "extract",
  "contentType": "experience",
  "rawText": "Paste rough notes here",
  "instruction": "Optional instruction",
  "messages": [],
  "currentDraft": {}
}
```

The function responds with `assistantMessage` plus a `result` draft object. The frontend only applies that draft when the admin clicks "Apply to Form"; it never saves or publishes automatically.

### Copy/Paste AI Secrets

Add these values in **Supabase Dashboard -> Project Settings -> Edge Functions -> Secrets**. Use placeholder-free real values in the dashboard only; do not paste them into `frontend/.env.local`, `.env.example`, or frontend source.

Gemini recommended:

```txt
ADMIN_EMAIL=mbengespoir@gmail.com
AI_EXTRACT_PROVIDER=gemini
GEMINI_API_KEY=paste-your-google-ai-studio-api-key-here
GEMINI_MODEL=gemini-3.5-flash
```

Groq alternative:

```txt
ADMIN_EMAIL=mbengespoir@gmail.com
AI_EXTRACT_PROVIDER=groq
GROQ_API_KEY=paste-your-groq-api-key-here
GROQ_MODEL=openai/gpt-oss-20b
```

Set the Resend, site, and AI assistant secrets:

```bash
supabase secrets set RESEND_API_KEY=your-resend-key
supabase secrets set RESEND_FROM_EMAIL="Portfolio Site <verified@your-domain.com>"
supabase secrets set SITE_URL=https://your-domain.com
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
supabase secrets set ADMIN_EMAIL=mbengespoir@gmail.com

# Default provider is Gemini. Use AI_EXTRACT_PROVIDER=groq to switch.
supabase secrets set AI_EXTRACT_PROVIDER=gemini
supabase secrets set GEMINI_API_KEY=your-google-ai-studio-key
supabase secrets set GEMINI_MODEL=gemini-3.5-flash

# Optional Groq fallback/provider switch.
supabase secrets set GROQ_API_KEY=your-groq-key
supabase secrets set GROQ_MODEL=openai/gpt-oss-20b
```

Deploy:

```bash
supabase functions deploy send-contact-email
supabase functions deploy send-booking-email
supabase functions deploy submit-testimonial
supabase functions deploy extract-dashboard-content
```

### Deploy the Browser Functions Without the CLI

If the browser console reports CORS plus `Failed to send a request to the Edge Function`, first check whether the function URL returns `404`. A missing function is surfaced by the browser as a CORS failure because the `404` gateway response does not include the function's CORS headers.

To deploy from the Supabase Dashboard instead of a terminal:

1. Open **Supabase Dashboard -> Edge Functions**.
2. For each function below, click **Deploy a new function -> Via Editor** if it does not exist, or open the existing function and choose **Deploy updates**:

   - `extract-dashboard-content` -> `supabase/functions/extract-dashboard-content/index.ts`
   - `submit-testimonial` -> `supabase/functions/submit-testimonial/index.ts`
   - `send-contact-email` -> `supabase/functions/send-contact-email/index.ts`
   - `send-booking-email` -> `supabase/functions/send-booking-email/index.ts`

3. Replace the editor contents with the matching repository file, then deploy each function.
4. In each function's settings, turn off the legacy **Verify JWT** check if the option is shown. The assistant validates the signed-in admin inside its handler, testimonial submission is intentionally public and moderated, and contact/booking email functions are called after their database records are saved.
5. Confirm all four function URLs use the same project ref as `VITE_SUPABASE_URL`.
6. Keep the Gemini/Groq keys under **Edge Functions -> Secrets**. Do not add them to `frontend/.env.local`.

The repository also declares `verify_jwt = false` for all four browser functions in `supabase/config.toml`, so future CLI deployments preserve the same behavior automatically.

Use a Resend-verified domain for `RESEND_FROM_EMAIL` before production traffic.
Keep AI provider keys in Supabase secrets only. Do not add them to `frontend/.env.local`, `.env.example`, or any Vite-exposed variable.

### AI Assistant Setup Walkthrough

If the dashboard assistant is not working, check these in order:

1. Apply the latest migrations in Supabase, especially `supabase/migrations/0011_experiences_cms.sql`.
2. Deploy the assistant function to the same Supabase project used by `VITE_SUPABASE_URL`:

```bash
supabase functions deploy extract-dashboard-content
```

3. Set the function secrets in Supabase Dashboard or with the CLI:

```bash
supabase secrets set ADMIN_EMAIL=mbengespoir@gmail.com
supabase secrets set AI_EXTRACT_PROVIDER=gemini
supabase secrets set GEMINI_API_KEY=your-google-ai-studio-key
supabase secrets set GEMINI_MODEL=gemini-3.5-flash
```

For Groq, switch the provider and use a structured-output-compatible model:

```bash
supabase secrets set AI_EXTRACT_PROVIDER=groq
supabase secrets set GROQ_API_KEY=your-groq-key
supabase secrets set GROQ_MODEL=openai/gpt-oss-20b
```

4. Log into the admin dashboard as the exact `ADMIN_EMAIL`, currently `mbengespoir@gmail.com`.
5. Open `/admin/projects/new`, `/admin/blog/new`, `/admin/testimonials?new=1`, or `/admin/experiences/new`.
6. Paste at least 20 characters into "Quick Import with AI Assistant", click "Extract Details", review the draft, then click "Apply to Form".

Common errors:

- `Authentication is required.` means the admin user is not logged in or the session expired.
- `Authentication is invalid or expired.` means Supabase rejected the current session token.
- `You do not have permission to use this assistant.` means the logged-in email does not match `ADMIN_EMAIL`.
- `Function not found` or `404` means `extract-dashboard-content` is not deployed to the Supabase project used by `VITE_SUPABASE_URL`.
- `GEMINI_API_KEY is not configured.` means the key is missing from Supabase Edge Function secrets.
- `GROQ_API_KEY is not configured.` means Groq is selected but the Groq secret is missing.
- `Unsupported AI_EXTRACT_PROVIDER. Use gemini or groq.` means the provider secret has an unsupported value.
- `model not found` or provider-specific model errors mean `GEMINI_MODEL` or `GROQ_MODEL` is wrong for that provider account.
- `Invalid value at generation_config.response_format.text.mime_type` means the deployed function is using an outdated Gemini structured-output payload. Replace the deployed `extract-dashboard-content` source with the current repository version and deploy it again. The current function uses `responseMimeType: "application/json"` and `responseJsonSchema`.
- Groq schema or `400` errors usually mean the selected Groq model does not support the structured output mode used by the assistant. Start with Gemini first, then switch to Groq after the assistant works.

The AI keys should only be visible in Supabase Edge Function secrets. They should not appear in `frontend/.env.local`, `.env.example`, frontend source, or any variable beginning with `VITE_`.

## 6. Verification Checklist

1. Run `npm --prefix frontend run build`.
2. Log in at `/p/admin-access`.
3. Create and publish a project.
4. Create a `GRAPHICS DESIGN` project, add design images/details, and confirm its full design page uses the graphic design layout.
5. Submit a public testimonial from `/?review=1`; confirm it is saved as `pending`.
6. Approve the testimonial in `/admin/testimonials`; confirm it appears publicly.
7. Submit contact and booking forms; confirm database records and email function behavior.
8. Create, edit, publish, draft, and archive an experience in `/admin/experiences`; confirm the homepage uses published rows and falls back to local copy if Supabase is unavailable.
9. Log in as the admin, paste rough notes into each "Quick Import with AI Assistant" form, chat with an instruction, and confirm the suggested draft only populates fields after "Apply to Form".
