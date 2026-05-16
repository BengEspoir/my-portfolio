-- Fix preview_screens for the 'motherly' project to match sanitized filenames in storage
UPDATE public.projects
SET preview_screens = ARRAY[
  'motherly-images/A1-Splash-Screen.png',
  'motherly-images/A2-Onboarding-Slide-1.png',
  'motherly-images/A3-Onboarding-Slide-2.png',
  'motherly-images/A4-Onboarding-Slide-3.png',
  'motherly-images/A5-Onboarding-Slide-4.png',
  'motherly-images/B1-Sign-Up-Screen.png',
  'motherly-images/B2-Email-Verification-Screen.png',
  'motherly-images/B3-Sign-In-Screen.png',
  'motherly-images/B4-Forgot-Password-Screen.png',
  'motherly-images/B5-Password-Reset-Sent-Confirmation.png',
  'motherly-images/B6-Reset-Password-Screen.png',
  'motherly-images/B7-Role-Selection-Screen.png',
  'motherly-images/Learner-Dashboard.png'
]
WHERE slug = 'motherly';

-- Also ensure image_url paths are clean (no leading slash needed as getPublicUrl handles it)
UPDATE public.projects SET image_url = 'projects/netflix-clone.png' WHERE slug = 'netflix-clone';
UPDATE public.projects SET image_url = 'projects/instagram-clone.png' WHERE slug = 'instagram-clone';
UPDATE public.projects SET image_url = 'projects/motherly.png' WHERE slug = 'motherly';
UPDATE public.projects SET image_url = 'projects/agriculnet.png' WHERE slug = 'agriculnet';
