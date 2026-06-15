# Deployment Guide

## Overview

This portfolio is a React + Vite + Tailwind frontend backed by Supabase:

- Supabase Database for projects, blog posts, testimonials, contact inquiries, and appointments.
- Supabase Storage bucket `portfolio-assets` for public portfolio images.
- Supabase Auth for the admin dashboard.
- Supabase Edge Functions for contact/booking email notifications and moderated testimonial submissions.

There is no active Express/Render backend in the current architecture.

## Frontend Deployment

Deploy the `frontend` directory to Vercel or any static host that supports SPA rewrites.

Required environment variables:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

The Vercel rewrite is already configured in `frontend/vercel.json` so deep links such as `/portfolio`, `/testimonials/new`, and `/admin/dashboard` route back to `index.html`.

## Supabase Setup

Run the migrations in `supabase/migrations` in order. The latest migrations add:

- Testimonial moderation with `pending`, `approved`, and `rejected` statuses.
- Public testimonial submission through the homepage review modal and `submit-testimonial` Edge Function.
- Graphic design project detail fields: `design_images` and `design_details`.
- Admin email RLS policies restricted to `mbengespoir@gmail.com`.

Create a public storage bucket named `portfolio-assets`. Public read access is intentional because portfolio images are rendered directly on public pages. Restrict direct write access to the authenticated admin; the testimonial submission function writes approved-upload candidates with the service role key and saves the testimonial as `pending`.

## Edge Functions

Set the Resend and site secrets in Supabase:

```bash
supabase secrets set RESEND_API_KEY=your-resend-key
supabase secrets set RESEND_FROM_EMAIL="Portfolio Site <verified@your-domain.com>"
supabase secrets set SITE_URL=https://your-domain.com
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Deploy both functions:

```bash
supabase functions deploy send-contact-email
supabase functions deploy send-booking-email
supabase functions deploy submit-testimonial
```

Use a Resend-verified domain for `RESEND_FROM_EMAIL` before production traffic.

## Post-Deployment Verification

1. Build the frontend with `npm --prefix frontend run build`.
2. Confirm public pages load: `/`, `/portfolio`, `/testimonials/new`, `/booking`, `/contact`.
3. Submit a contact inquiry and verify it appears in Admin Inquiries.
4. Submit a testimonial and verify it appears in Admin Testimonials with `pending` status.
5. Approve that testimonial and confirm it appears publicly.
6. Create or edit a `GRAPHICS DESIGN` project with design images and confirm `/projects/:slug/full-design` uses the graphic design layout.
7. Confirm non-graphic projects keep their existing case study or full design layouts.
