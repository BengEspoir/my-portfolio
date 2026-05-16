# Supabase Migration & Setup Guide

This guide explains how to set up your portfolio's new Supabase backend layer.

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Once the project is ready, go to **Project Settings** -> **API**.
3. Copy your `Project URL` and `anon public` key.

## 2. SQL Migration
1. Go to the **SQL Editor** in your Supabase dashboard.
2. Open the file `supabase/migrations/0001_portfolio_cms.sql` from this repository.
3. Paste the entire content into the SQL Editor and click **Run**.
   - This creates the `projects`, `blog_posts`, and `contacts` tables.
   - It sets up Row Level Security (RLS) to protect your data.

## 3. Storage Buckets
1. Go to **Storage** in the Supabase dashboard.
2. Create a new bucket named: `portfolio-assets`.
3. Set the bucket to **Public** (so visitors can see your images).
4. Add the following **RLS Policies** for the bucket:
   - **Select**: Allow public access (Read).
   - **Insert/Update/Delete**: Restrict to `authenticated` users only (Admin).

## 4. Admin Authentication
1. Go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create new user**.
3. Enter your admin email and password.
4. Use these credentials to log in at `/admin/login` on your site.

## 5. Email Notifications (Edge Functions)
We use **Resend** for reliable email delivery.
1. Create a free account at [resend.com](https://resend.com).
2. Get your **API Key**.
3. Install the Supabase CLI on your computer if you haven't already.
4. In your terminal, run:
   ```bash
   # Login to Supabase
   supabase login
   
   # Initialize (if needed)
   supabase init
   
   # Set the Resend Secret
   supabase secrets set RESEND_API_KEY=
   
   # Deploy the function
   supabase functions deploy send-contact-email
   ```
5. Note: In the Edge Function code (`supabase/functions/send-contact-email/index.ts`), the `from` address is set to `onboarding@resend.dev`. Once you verify a custom domain in Resend, update this to your own email.

## 6. Environment Variables
Add these to your local `.env` file and your **Vercel** deployment settings:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 7. Populating Data
1. Log in to your new dashboard at `yoursite.com/admin/login`.
2. Go to **Projects** and start adding your work. 
3. **Note**: You can copy descriptions and links from your old `src/data/projects.js` file.
4. Once you have added all your data, you can safely delete the `src/data/projects.js` file and the `backend/` folder.

## 8. Cleanup Old Backend
After you verify everything is working:
1. Delete the `backend/` folder.
2. Delete the `studio/` (Sanity) folder.
3. Remove the Render.com service for the backend.
4. Update your Vercel settings to remove old `VITE_API_URL` variables.

## Testing Instructions
1. **Public Site**: Check that projects and blog posts only appear once set to `published`.
2. **Admin**: Try creating a project with a "Latest" badge and verify it shows up on the home page.
3. **Inquiries**: Submit a test message on the contact form and check if it appears in the **Inquiries** tab in the admin dashboard (in real-time!).
4. **Emails**: Check your inbox for the inquiry notification.
