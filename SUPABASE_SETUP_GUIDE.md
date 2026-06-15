# Supabase Setup Guide

This guide describes the current Supabase backend used by the portfolio.

## 1. Project and Environment

Create a Supabase project, then copy the project URL and anon public key into `frontend/.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Keep real values in `.env.local` only. `frontend/.env.example` must stay placeholder-only.

## 2. Database Migrations

Run the files in `supabase/migrations` in order. They create and update:

- `projects` for portfolio cards, case studies, and graphic design detail data.
- `blog_posts` for the blog CMS.
- `contacts` for public contact inquiries.
- `testimonials` for Edge Function submission and admin approval.
- `appointments` for consultation booking.

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

The latest RLS policies use the authenticated JWT email to allow admin management of projects, blog posts, contacts, testimonials, and appointments.

## 5. Edge Functions and Email

The contact and booking flows save records in the database first, then invoke Edge Functions for email notifications. Public testimonial reviews are submitted through the `submit-testimonial` Edge Function so profile image upload and pending moderation happen server-side.

Set the Resend and site secrets:

```bash
supabase secrets set RESEND_API_KEY=your-resend-key
supabase secrets set RESEND_FROM_EMAIL="Portfolio Site <verified@your-domain.com>"
supabase secrets set SITE_URL=https://your-domain.com
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Deploy:

```bash
supabase functions deploy send-contact-email
supabase functions deploy send-booking-email
supabase functions deploy submit-testimonial
```

Use a Resend-verified domain for `RESEND_FROM_EMAIL` before production traffic.

## 6. Verification Checklist

1. Run `npm --prefix frontend run build`.
2. Log in at `/p/admin-access`.
3. Create and publish a project.
4. Create a `GRAPHICS DESIGN` project, add design images/details, and confirm its full design page uses the graphic design layout.
5. Submit a public testimonial from `/?review=1`; confirm it is saved as `pending`.
6. Approve the testimonial in `/admin/testimonials`; confirm it appears publicly.
7. Submit contact and booking forms; confirm database records and email function behavior.
