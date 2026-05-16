# Image Migration Guide

This guide explains how to migrate project images from the local `public/` folder to Supabase Storage.

## Current Image Locations

Your portfolio currently uses images from these locations in `frontend/public/`:

- `/netflix-clone/` - 12 images for Netflix Clone project
- `/instagram-clone/` - 7 images for Instagram Clone project  
- `/motherly-images/` - 8 images for Motherly project
- `/projects/agriculnet.png` - AgriculNet project thumbnail
- `/images/` - 3 images for Graphics Design projects:
  - `hi-tv-flyer.png`
  - `kettys-service.png`
  - `restaurant-menu.png`

## Migration Strategy

Since you chose to upload all images to Supabase Storage, follow these steps:

### Step 1: Prepare Supabase Storage

1. Go to your Supabase project dashboard
2. Navigate to **Storage** 
3. Ensure the `portfolio-assets` bucket exists (if not, create it)
4. Set the bucket to **Public** 
5. Configure RLS policies:
   - **SELECT**: Allow public access
   - **INSERT/UPDATE/DELETE**: Allow only authenticated users

### Step 2: Upload Images

You have two options for uploading images:

#### Option A: Manual Upload via Dashboard (Recommended for small number of images)

1. In Supabase Storage, open the `portfolio-assets` bucket
2. Create folders to match your structure:
   - `netflix-clone/`
   - `instagram-clone/`
   - `motherly-images/`
   - `projects/`
   - `images/`
3. Upload each image to the corresponding folder
4. After upload, copy the public URL for each image

#### Option B: Use Supabase CLI (Faster for bulk uploads)

```bash
# Install Supabase CLI if not already installed
# https://supabase.com/docs/guides/cli/getting-started

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Upload all images
supabase storage upload \
  --bucket portfolio-assets \
  --source frontend/public/netflix-clone \
  --path netflix-clone

supabase storage upload \
  --bucket portfolio-assets \
  --source frontend/public/instagram-clone \
  --path instagram-clone

supabase storage upload \
  --bucket portfolio-assets \
  --source frontend/public/motherly-images \
  --path motherly-images

supabase storage upload \
  --bucket portfolio-assets \
  --source frontend/public/projects \
  --path projects

supabase storage upload \
  --bucket portfolio-assets \
  --source frontend/public/images \
  --path images
```

### Step 3: Update Database with Supabase URLs

After uploading images, you need to update the `image_url` and `preview_screens` fields in your Supabase database.

#### Manual Update via SQL Editor

1. Go to Supabase **SQL Editor**
2. Run update statements for each project. Example:

```sql
-- Update Netflix Clone images
UPDATE public.projects 
SET 
  image_url = 'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/netflix-clone/Netflix user flow 1.png',
  preview_screens = ARRAY[
    'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/netflix-clone/Netflix user flow 1.png',
    'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/netflix-clone/Netflix userflow 2.png',
    -- ... add all other netflix-clone images
  ]
WHERE slug = 'netflix-clone';

-- Update Instagram Clone images
UPDATE public.projects 
SET 
  image_url = 'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/instagram-clone/thumbnail image.png',
  preview_screens = ARRAY[
    'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/instagram-clone/thumbnail image.png',
    'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/instagram-clone/iPhone 16 Pro Max - 1.png',
    -- ... add all other instagram-clone images
  ]
WHERE slug = 'instagram-clone';

-- Update Motherly images
UPDATE public.projects 
SET 
  image_url = 'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/motherly-images/A1 — Splash Screen.png',
  preview_screens = ARRAY[
    'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/motherly-images/A1 — Splash Screen.png',
    -- ... add all other motherly-images
  ]
WHERE slug = 'motherly';

-- Update AgriculNet image
UPDATE public.projects 
SET 
  image_url = 'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/projects/agriculnet.png'
WHERE slug = 'agriculnet';

-- Update Graphics Design images
UPDATE public.projects 
SET image_url = 'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/images/hi-tv-flyer.png'
WHERE slug = 'hi-tv-flyer';

UPDATE public.projects 
SET image_url = 'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/images/kettys-service.png'
WHERE slug = 'kettys-service';

UPDATE public.projects 
SET image_url = 'https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/portfolio-assets/images/restaurant-menu.png'
WHERE slug = 'restaurant-menu';
```

#### Alternative: Use Admin Dashboard

After migration, you can also update image URLs through the admin interface:
1. Login at `/admin/login`
2. Go to **Projects** 
3. Edit each project
4. Update the image URL field
5. Save

### Step 4: Verify Images Load Correctly

1. Run your local development server
2. Navigate to the portfolio page
3. Check that all project thumbnails load correctly
4. Click on case studies to verify preview screens load
5. Check browser console for any 404 errors

### Step 5: Clean Up (Optional)

After verifying everything works with Supabase Storage:

1. **Keep** the `frontend/public/` images for now as backup
2. Once you're confident everything works, you can remove the old image folders:
   - `frontend/public/netflix-clone/`
   - `frontend/public/instagram-clone/`
   - `frontend/public/motherly-images/`
   - `frontend/public/projects/`
   - `frontend/public/images/` (except logo.png, portfolio-pic.jpg which are site assets)

## Temporary Fallback

During migration, your portfolio will continue to work because:
- The seed migration uses relative paths (e.g., `/netflix-clone/Netflix user flow 1.png`)
- These paths work with your existing `public/` folder structure
- After uploading to Supabase and updating the database, the images will switch to Supabase URLs
- The `public/` images serve as a backup during transition

## Benefits of Supabase Storage

- **CDN**: Automatic CDN delivery for fast image loading
- **Optimization**: Built-in image transformation and optimization
- **Scalability**: Handles large files and high traffic
- **Security**: Fine-grained access control via RLS policies
- **Backup**: Included in Supabase backups

## Troubleshooting

**Images not loading after migration:**
- Check that the bucket is set to Public
- Verify RLS policies allow public SELECT access
- Ensure image URLs in database are correct public URLs
- Check browser console for specific error messages

**Upload failing via CLI:**
- Verify you're logged in: `supabase login`
- Check project reference is correct
- Ensure you have proper permissions

**Storage size limits:**
- Free tier: 1GB storage
- If you exceed this, consider upgrading or optimizing images