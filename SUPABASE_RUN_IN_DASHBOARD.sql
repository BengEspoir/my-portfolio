-- Idempotent Seed Migration for 45 Portfolio Projects
-- Generated from projects.json

-- Cleanup projects with missing slugs to avoid duplicates during update
DELETE FROM public.projects WHERE slug = '' OR slug IS NULL;

INSERT INTO public.projects (
  id, title, slug, description, categories, status, image_url, cta_type, cta_label, cta_link, prototype_url, prototype_embed, preview_screens, project_background, problem_statement, design_journey, challenges, solution, outcome, ux_flow, tools_tech, apk_url, brand_color, live_url, published_at, sort_order
) VALUES 
(
  'd4d8759b-7105-4c87-997f-c9234a30a71f', -- id
  'Brochure-design', -- title
  'brochure-design', -- slug
  'Client''s brochure design', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.007191372711477295.png', -- image_url
  'full-design', -- cta_type
  'View Design', -- cta_label
  '', -- cta_link
  '', -- prototype_url
  '', -- prototype_embed
  ARRAY[]::text[], -- preview_screens
  NULL, -- project_background
  '', -- problem_statement
  '', -- design_journey
  '', -- challenges
  '', -- solution
  '', -- outcome
  '[]'::jsonb, -- ux_flow
  ARRAY[]::text[], -- tools_tech
  '', -- apk_url
  '#6366f1', -- brand_color
  '', -- live_url
  NULL, -- published_at
  0 -- sort_order
),
(
  'd92dc6b4-8a4c-4956-b535-1a4e55e5edb3', -- id
  'Mobile Banking App Redesign', -- title
  'mobile-banking-redesign', -- slug
  'A full UI/UX redesign focused on clearer onboarding, faster transfers, and stronger trust cues for first-time users.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80', -- image_url
  'prototype', -- cta_type
  'View Prototype', -- cta_label
  'https://figma.com/proto/PLACEHOLDER-LINK', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['UI/UX', 'Figma', 'Prototype', 'Case Study']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  1 -- sort_order
),
(
  '90dbca11-e58d-47ae-96f6-0df6a3eec6f8', -- id
  'Healthcare Dashboard Experience', -- title
  'healthcare-dashboard', -- slug
  'Designed a doctor-facing dashboard with simplified patient status cards, prioritization filters, and clean visual hierarchy.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80', -- image_url
  'full-design', -- cta_type
  'View Full Design', -- cta_label
  '/projects/healthcare-dashboard/full-design', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Dashboard', 'Wireframing', 'Design System', 'Research']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  2 -- sort_order
),
(
  '967f1d49-4245-4422-befe-9dccaf271b26', -- id
  'Food Delivery Checkout Flow', -- title
  'food-delivery-flow', -- slug
  'Reworked cart and checkout interactions to reduce drop-off, improve trust, and shorten the order completion journey.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', -- image_url
  'full-design', -- cta_type
  'View Full Design', -- cta_label
  '/projects/food-delivery-flow/full-design', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['User Flow', 'UX Audit', 'A/B Testing', 'Mobile']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  3 -- sort_order
),
(
  'd03742f0-638e-4711-a039-87c7fc1417ed', -- id
  'Instagram Clone', -- title
  'instagram-clone', -- slug
  'A detailed UI/UX replication of the Instagram mobile experience, focusing on feed interactions, profile layouts, and visual hierarchy.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  '/instagram-clone/thumbnail image.png', -- image_url
  'case-study', -- cta_type
  'View Case Study', -- cta_label
  '/projects/instagram-clone/case-study', -- cta_link
  'https://www.figma.com', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['/instagram-clone/thumbnail image.png', '/instagram-clone/iPhone 16 Pro Max - 1.png', '/instagram-clone/iPhone 16 Pro Max - 2.png', '/instagram-clone/iPhone 16 Pro Max - 3.png', '/instagram-clone/iPhone 16 Pro Max - 4.png', '/instagram-clone/iPhone 16 Pro Max - 5.png', '/instagram-clone/iPhone 16 Pro Max - 6.png']::text[], -- preview_screens
  'An exploratory project to understand the design systems powering one of the world''s most popular social media applications.', -- project_background
  'Balancing high-density visual content (photos/videos) with intuitive navigation and interaction zones.', -- problem_statement
  'Analyzed and recreated core screens including the home feed, explore page, and user profiles, paying close attention to icon sets and typography.', -- design_journey
  'Achieving pixel-perfect alignments and recreating complex micro-interactions for liking and commenting.', -- challenges
  'Leveraged component variants and auto-layout to build a scalable, reusable design system reflecting Instagram''s latest UI.', -- solution
  'Deepened expertise in mobile-first design patterns and complex component architecture.', -- outcome
  NULL, -- ux_flow
  ARRAY['UI/UX', 'Social Media', 'Mobile Design', 'Prototyping']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  12 -- sort_order
),
(
  'd2c7633f-86b8-4f98-a581-80d832bc853a', -- id
  'E-Learning Platform UX', -- title
  'elearning-platform', -- slug
  'Structured course discovery, progress tracking, and lesson playback for a learner-first study platform experience.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', -- image_url
  'case-study', -- cta_type
  'View Case Study', -- cta_label
  '/projects/elearning-platform/case-study', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['EdTech', 'UX Strategy', 'Accessibility', 'Prototype']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  4 -- sort_order
),
(
  '5e187829-dd2d-4a73-a1c1-329780a036c6', -- id
  'Travel Planner Mobile App', -- title
  'travel-planner-app', -- slug
  'Built an intuitive itinerary planning flow with day-by-day views, map integration, and collaborative trip editing.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80', -- image_url
  'prototype', -- cta_type
  'View Prototype', -- cta_label
  'https://figma.com/proto/PLACEHOLDER-LINK', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Mobile UX', 'Interaction', 'Journey Map', 'Figma']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  5 -- sort_order
),
(
  'bc3c3d5f-c5de-4be9-9714-b76769292009', -- id
  'Real Estate Search Portal', -- title
  'real-estate-portal', -- slug
  'Improved listing comparison and filtering by creating clean card layouts and progressive detail disclosure patterns.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80', -- image_url
  'case-study', -- cta_type
  'View Case Study', -- cta_label
  '/projects/real-estate-portal/case-study', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Information Architecture', 'UX', 'Web UI', 'Prototyping']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  6 -- sort_order
),
(
  '4bfa8f69-e8b8-4986-a340-4713fe91c818', -- id
  'Fintech Onboarding Journey', -- title
  'fintech-onboarding', -- slug
  'Designed a frictionless account setup process with clear progress indicators and compliance-focused microcopy.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', -- image_url
  'full-design', -- cta_type
  'View Full Design', -- cta_label
  '/projects/fintech-onboarding/full-design', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Onboarding', 'UX Writing', 'UI Design', 'Fintech']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  7 -- sort_order
),
(
  'd2146904-c14d-4665-884b-767b59d06e0a', -- id
  'SaaS Admin Panel Redesign', -- title
  'saas-admin-panel', -- slug
  'Reorganized analytics modules and navigation to help team leads complete high-frequency tasks with fewer clicks.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', -- image_url
  'full-design', -- cta_type
  'View Full Design', -- cta_label
  '/projects/saas-admin-panel/full-design', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['SaaS', 'Dashboard', 'Usability', 'Component UI']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  8 -- sort_order
),
(
  '432ace76-8a9f-44bd-9c28-1177c74c8e40', -- id
  'Creative Portfolio Case Study', -- title
  'portfolio-case-study', -- slug
  'Created a storytelling layout for showcasing process, outcomes, and before/after visual transformations.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80', -- image_url
  'case-study', -- cta_type
  'View Case Study', -- cta_label
  '/projects/portfolio-case-study/case-study', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Case Study', 'Storytelling', 'Layout', 'Visual UX']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  9 -- sort_order
),
(
  '37c08314-8d01-40e8-9f55-d3433d361d79', -- id
  'Event Booking UX Design', -- title
  'event-booking', -- slug
  'Crafted a ticket booking interface with progressive pricing details, seating guidance, and clearer confirmation states.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1200&q=80', -- image_url
  'full-design', -- cta_type
  'View Full Design', -- cta_label
  '/projects/event-booking/full-design', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Booking', 'UX Flow', 'UI Kit', 'Conversion']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  10 -- sort_order
),
(
  '6831431b-7168-49d4-b6e6-85336e75d5bc', -- id
  'Netflix Clone', -- title
  'netflix-clone', -- slug
  'A complete UI/UX exploration of a streaming app flow, designed to sharpen hierarchy, interaction design, and onboarding patterns.', -- description
  ARRAY['UI/UX']::text[], -- categories
  'published', -- status
  '/netflix-clone/Netflix user flow 1.png', -- image_url
  'case-study', -- cta_type
  'View Case Study', -- cta_label
  '/projects/netflix-clone/case-study', -- cta_link
  'https://www.figma.com', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['/netflix-clone/Netflix user flow 1.png', '/netflix-clone/Netflix userflow 2.png', '/netflix-clone/Netflix user flow 3.png', '/netflix-clone/Netflix user flow 4.png', '/netflix-clone/Netflix user flow 5.png', '/netflix-clone/Netflix user flow 6.png', '/netflix-clone/Netflix user flow 7.png', '/netflix-clone/Netflix user flow 8.png', '/netflix-clone/Netflix user flow 9.png', '/netflix-clone/Netflix user flow 10.png', '/netflix-clone/Netflix user flow 11.png']::text[], -- preview_screens
  'A deep dive into the UX patterns of a leading streaming platform to understand complex content delivery systems.', -- project_background
  'Maintaining user engagement during browsing and ensuring frictionless transitions between discovery and playback.', -- problem_statement
  'Replicated 15+ high-fidelity screens, testing interaction states and mobile-first navigation logic.', -- design_journey
  'Recreating the smooth, dark-mode aesthetic while maintaining perfect contrast and readability.', -- challenges
  'Applied high-fidelity UI systems inspired by Netflix''s production patterns, focusing on card carousels and hero animations.', -- solution
  'Gained significant insight into scalable component architecture and high-performance interaction design.', -- outcome
  NULL, -- ux_flow
  ARRAY['UI/UX', 'Netflix Clone', 'Prototype', 'Design Practice']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  11 -- sort_order
),
(
  '65e1e58a-3775-4a68-8105-60352bfbafa7', -- id
  'Company Landing Website', -- title
  'webdev-company-landing', -- slug
  'Developed a responsive marketing website with performance optimization, reusable sections, and clean SEO metadata.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['React', 'Responsive', 'SEO', 'Frontend']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  14 -- sort_order
),
(
  'cbba524c-4dba-40bd-b2f6-e7fb9a027c8a', -- id
  'Internship E-commerce Platform', -- title
  'webdev-nephus-internship-ecommerce', -- slug
  'Contributed to product pages, checkout UI, and Git team workflows during a production internship project.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['E-commerce', 'Internship', 'Git', 'Teamwork']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  15 -- sort_order
),
(
  '49dc3c12-7f3d-4845-b466-5559fc15b974', -- id
  'VISION-AID University Platform', -- title
  'webdev-vision-aid-platform', -- slug
  'Built core frontend pages for notes, tutorials, and account management in a university productivity ecosystem.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Web App', 'React', 'Student Platform', 'UI']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  16 -- sort_order
),
(
  '55d39d31-ad28-4894-bf10-477e62d74b2c', -- id
  'Restaurant Reservation System', -- title
  'webdev-restaurant-reservation', -- slug
  'Implemented booking calendars, availability logic, and admin management features for restaurant owners.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Booking', 'JavaScript', 'Forms', 'Admin']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  17 -- sort_order
),
(
  '1fc22500-e0dd-4355-ac02-ab2970d0a085', -- id
  'Small Business Freelance Website', -- title
  'webdev-freelance-business-site', -- slug
  'Delivered a conversion-focused service website with clear call-to-actions and lead capture components.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Freelance', 'Landing Page', 'Lead Gen', 'Web']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  18 -- sort_order
),
(
  'df63df4b-1e06-47b5-b44f-61d3948c7597', -- id
  'Online Course Marketplace', -- title
  'webdev-online-course-marketplace', -- slug
  'Shipped catalog browsing, instructor pages, and secure enrollment flows for a digital learning marketplace.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Marketplace', 'React', 'API', 'Routing']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  19 -- sort_order
),
(
  '313d371f-8f39-4fc3-8816-a0cda1d7dd6e', -- id
  'Personal Portfolio V2', -- title
  'webdev-portfolio-v2', -- slug
  'Rebuilt portfolio architecture with modular components, route-level organization, and reusable content blocks.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1551651653-c5186a1fbba2?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Portfolio', 'Refactor', 'Components', 'Frontend']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  20 -- sort_order
),
(
  'bf7318f6-73eb-427b-b782-b16dde03866c', -- id
  'Charity Donation Website', -- title
  'webdev-charity-donation-site', -- slug
  'Created campaign pages, donation forms, and impact storytelling sections to improve trust and engagement.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['NGO', 'Donation', 'UX', 'Performance']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  21 -- sort_order
),
(
  '634022a8-e028-4093-bc19-c846d7c68c8e', -- id
  'Job Board Platform', -- title
  'webdev-job-board-platform', -- slug
  'Built role filtering, company profiles, and candidate workflow pages for a modern recruitment web product.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Job Board', 'Search', 'Filters', 'Web App']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  22 -- sort_order
),
(
  '202a932a-22ef-4d3c-8386-b3f4e1f2086b', -- id
  'Hotel Management Web UI', -- title
  'webdev-hotel-management-ui', -- slug
  'Developed reservation tracking interfaces, occupancy views, and role-specific dashboards for hotel teams.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Dashboard', 'Hospitality', 'Frontend', 'Management']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  23 -- sort_order
),
(
  'd3c92eba-7b02-416b-b292-972f3ffd160c', -- id
  'Minimal Service Flyer', -- title
  'graphics-minimal-service-flyer', -- slug
  'Designed a premium flyer concept using strong typography, airy spacing, and clear information grouping.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Flyer', 'Typography', 'Brand', 'Photoshop']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  25 -- sort_order
),
(
  'e72526a7-73f8-4dab-b2b7-7453f5781fc1', -- id
  'Social Media Campaign Kit', -- title
  'graphics-social-media-campaign', -- slug
  'Produced a cross-platform post set with reusable templates for promotional and product storytelling content.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/kettys-service.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Social Media', 'Template', 'Branding', 'Canva']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  26 -- sort_order
),
(
  '9c982954-94a5-4017-b325-c81f02f603c8', -- id
  'Brochure Design', -- title
  'graphics-brochure design', -- slug
  'Created logo usage rules, color palettes, menu visuals, and social assets for a food startup launch.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/restaurant-menu.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Branding', 'Brochure', 'Identity', 'Design']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  27 -- sort_order
),
(
  '16823849-f242-4c76-8706-c42ba835dc7d', -- id
  'Event Poster Series', -- title
  'graphics-event-poster-series', -- slug
  'Designed a cohesive poster collection for tech events with strong hierarchy and date-first readability.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Poster', 'Print', 'Layout', 'Illustrator']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  28 -- sort_order
),
(
  '0e4df916-ba19-471d-bd9f-c0a7afa17b6f', -- id
  'Product Packaging Concepts', -- title
  'graphics-product-packaging', -- slug
  'Explored packaging structures and visual systems for retail shelf impact and premium product perception.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Packaging', 'Mockup', 'Brand', 'Visual Design']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  29 -- sort_order
),
(
  '6e9db2ab-61a5-4e7b-b92a-f38560437af7', -- id
  'Magazine Layout Design', -- title
  'graphics-magazine-layout', -- slug
  'Built editorial spreads balancing photography, long-form text, and callout modules for easy reading.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Editorial', 'InDesign', 'Grid', 'Publication']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  30 -- sort_order
),
(
  '72a97b7c-9112-4777-acf2-e80ff21d5c6a', -- id
  'Conference Banner Set', -- title
  'graphics-conference-banner-set', -- slug
  'Designed web and print banner assets for conference registration, schedules, and speaker highlight zones.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Banner', 'Marketing', 'Digital', 'Print']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  31 -- sort_order
),
(
  '6a29320d-74cf-4e37-a53f-79b9284a30d2', -- id
  'Startup Pitch Deck Visuals', -- title
  'graphics-startup-pitch-deck', -- slug
  'Styled slide visuals and infographic charts for stronger investor storytelling and cleaner data presentation.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Pitch Deck', 'Infographic', 'Slides', 'Brand']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  32 -- sort_order
),
(
  'ddd2933d-677a-43e0-af66-64aaef9a3c0b', -- id
  'Album Cover Collection', -- title
  'graphics-album-cover-collection', -- slug
  'Created expressive cover art concepts mixing photomanipulation, texture overlays, and bold type systems.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Cover Art', 'Creative', 'Compositing', 'Typography']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  33 -- sort_order
),
(
  '7efb705e-55b1-4a7d-938b-cdfa7096ff22', -- id
  'Fashion Lookbook Design', -- title
  'graphics-fashion-lookbook', -- slug
  'Designed a clean lookbook presentation with product callouts and seasonal style direction blocks.', -- description
  ARRAY['GRAPHICS DESIGN']::text[], -- categories
  'published', -- status
  '/images/hi-tv-flyer.png', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Fashion', 'Lookbook', 'Brand Story', 'Layout']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  34 -- sort_order
),
(
  'a010b4ce-7752-4bd0-888b-d5897aaeda06', -- id
  'Library Management System in C', -- title
  'programming-library-management-c', -- slug
  'Built a CLI system to manage books, borrowers, and due dates with structured data handling in C.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['C', 'CLI', 'Data Structures', 'School Project']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  35 -- sort_order
),
(
  '99315c16-6c00-4b0b-8e1c-1be1ed69e2ec', -- id
  '2D Maze Game in C++', -- title
  'programming-maze-game-cpp', -- slug
  'Developed core game logic for movement, collisions, score tracking, and level progression in C++.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['C++', 'Game Logic', 'OOP', 'Algorithms']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  36 -- sort_order
),
(
  'd68d6f21-73e1-4b5b-b28e-ce818f3a01c3', -- id
  'Student Record Manager (Java)', -- title
  'programming-student-record-java', -- slug
  'Implemented CRUD operations and sorting utilities for student data in a menu-driven Java application.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Java', 'OOP', 'CRUD', 'Console']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  37 -- sort_order
),
(
  'df7b9b42-c150-441e-97eb-7a45a16564b9', -- id
  'Expense Tracker in Python', -- title
  'programming-expense-tracker-python', -- slug
  'Created a lightweight finance tracker with category budgets, monthly summaries, and CSV export support.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1537432376769-00a43d3825b6?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Python', 'Automation', 'Data', 'Utility']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  38 -- sort_order
),
(
  '0b07209d-87cf-4b1a-92d9-1c4da8798eb1', -- id
  'Attendance System in C#', -- title
  'programming-attendance-system-csharp', -- slug
  'Designed a desktop attendance tool for student check-ins, absence reports, and class-level summaries.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['C#', '.NET', 'Desktop', 'Records']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  39 -- sort_order
),
(
  'b4a24c69-d70e-4ac7-ad1e-a3aa30cac183', -- id
  'Sorting Algorithm Visualizer', -- title
  'programming-sorting-visualizer-js', -- slug
  'Built an interactive visual tool demonstrating bubble, merge, and quick sort with speed controls.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['JavaScript', 'Algorithms', 'Visualization', 'Learning']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  40 -- sort_order
),
(
  '790ca174-4d0e-4b61-83cd-1750f87a498a', -- id
  'Inventory API with Node.js', -- title
  'programming-inventory-api-node', -- slug
  'Developed REST endpoints for stock tracking, low-item alerts, and transaction logs for a small store.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Node.js', 'API', 'Backend', 'JSON']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  41 -- sort_order
),
(
  '70c484e5-b4aa-4a51-be1c-659e6574d81c', -- id
  'Realtime Chat Server in Go', -- title
  'programming-chat-server-go', -- slug
  'Implemented concurrent socket handling and room-based broadcasting for a minimal realtime chat service.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Go', 'Concurrency', 'Sockets', 'Backend']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  42 -- sort_order
),
(
  '05e013c5-969b-4f58-837a-bf19a81df747', -- id
  'AI Flashcard Generator', -- title
  'programming-ai-flashcards', -- slug
  'Programmed a study helper that converts notes into flashcards with topic grouping and quiz mode logic.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Python', 'NLP', 'Education', 'Tooling']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  43 -- sort_order
),
(
  '8b78aa72-fc91-4382-bc57-438f264fe1f6', -- id
  'Mini Compiler Project', -- title
  'programming-compiler-mini-project', -- slug
  'Created tokenizer and parser modules for a tiny language supporting expressions, variables, and errors.', -- description
  ARRAY['PROGRAMMING']::text[], -- categories
  'published', -- status
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80', -- image_url
  'default', -- cta_type
  'View Project', -- cta_label
  '/portfolio', -- cta_link
  'https://figma.com/proto/PLACEHOLDER-LINK', -- prototype_url
  NULL, -- prototype_embed
  ARRAY['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.', -- project_background
  'Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.', -- problem_statement
  'The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.', -- solution
  'Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.', -- outcome
  NULL, -- ux_flow
  ARRAY['Compiler', 'Parsing', 'Data Structures', 'CS']::text[], -- tools_tech
  NULL, -- apk_url
  NULL, -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  44 -- sort_order
),
(
  '41fb5140-e9b3-4225-bd69-d13ac4643670', -- id
  'AgriculNet â€” B2B Agricultural Trade Ecosystem', -- title
  'agriculnet', -- slug
  'An enterprise-grade B2B marketplace bringing structured onboarding, verified identity, protected payments, and real-time order tracking to agricultural trade.', -- description
  ARRAY['WEB DEV']::text[], -- categories
  'published', -- status
  '/projects/agriculnet.png', -- image_url
  'case-study', -- cta_type
  'View Case Study', -- cta_label
  '/projects/agriculnet/case-study', -- cta_link
  NULL, -- prototype_url
  NULL, -- prototype_embed
  ARRAY['/projects/agriculnet.png', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1560414239-d7fe7d2ff990?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80']::text[], -- preview_screens
  'AgriculNet is an enterprise-grade B2B marketplace that replaces fragmented WhatsApp/email negotiations with a trust-first digital commerce layer, bringing structured onboarding and real-time order tracking to agricultural trade.', -- project_background
  'Agricultural trade in emerging markets suffers from trust asymmetry, middlemen dominance (absorbing 40-60% of value), and severe payment risks. Manual verification processes lock smallholder farmers out of formal trade.', -- problem_statement
  'The experience architecture focuses on conversion clarity and trust. It features a step-gated verification pipeline (KYC/AML), role-based registration, and a 3-tier trust hierarchy (Green/Gold/Amber) to reduce cognitive load in complex B2B transactions.', -- design_journey
  'The primary challenge was balancing the verification bottleneck with user conversion. We implemented progressive onboarding that converts users before asking for heavy KYC, using real-time status tracking.', -- challenges
  'We built a Trust & Verification layer with semantic badges (Verified, Export Ready), inquiry heat indicators, and protected payment rails supporting mobile money and card settlements.', -- solution
  'AgriculNet demonstrates end-to-end product thinking for marketplace UX, showing a 25% increase in task completion speed during initial school project testing phases and improved trade visibility.', -- outcome
  '[{"title": "Landing & Discovery", "content": "HeroSection anchors on three value props\u00e2\u20ac\u201dverified supply, protected payments, export readiness. Includes a trust strip with CountUp animations for real platform metrics."}, {"title": "Progressive Onboarding", "content": "A step-gated verification pipeline (Registration \u00e2\u2020\u2019 Role selection \u00e2\u2020\u2019 Email/Phone OTP \u00e2\u2020\u2019 Identity upload \u00e2\u2020\u2019 Admin review) with TierBadge status indicators."}, {"title": "Trust & Verification Layer", "content": "A 3-tier hierarchy (Green/Blue/Amber) and SellerTrustBar combining star ratings, verification status, and inquiry heat demand signals."}, {"title": "Listing & Farmer Surfaces", "content": "Alibaba-style density model crop cards with standalone ''Send Inquiry'' CTAs, status badges, and export readiness indicators."}, {"title": "Order Management & Tracking", "content": "State-machine workflow with visual status badges (pending_payment \u00e2\u2020\u2019 confirmed \u00e2\u2020\u2019 in_transit \u00e2\u2020\u2019 delivered) and vertical timeline tracking."}, {"title": "Messaging & Context", "content": "ListingContextBanner surfaces trade context (crop, quantity, location) inline within chat to eliminate discovery friction."}, {"title": "Admin Moderation UI", "content": "Decision velocity workspace with KPI cards, filterable user lists, and a split-pane review system for identity verification."}]'::jsonb, -- ux_flow
  ARRAY['Next.js', 'B2B Marketplace', 'Fintech', 'UX Design']::text[], -- tools_tech
  NULL, -- apk_url
  '#01931e', -- brand_color
  'https://cash-crop-app.vercel.app', -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  13 -- sort_order
),
(
  'c51aa146-5230-4aea-9263-556f774acfdf', -- id
  'Motherly ” Indigenous Language Preservation"', -- title
  'motherly', -- slug
  'A culturally-rooted mobile language learning platform focused on preserving Cameroonian indigenous languages through gamification and native audio.', -- description
  ARRAY['MOBILE DEV', 'UI/UX']::text[], -- categories
  'published', -- status
  'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.14140103522397363.png', -- image_url
  'case-study', -- cta_type
  'View Case Study', -- cta_label
  '/projects/motherly/case-study', -- cta_link
  'https://www.figma.com/proto/xZ8dTNlHZZkCEt0zfv8ZIz/motherly-app-maternal-language-app?node-id=25-492&p=f&viewport=190%2C371%2C0.11&t=ImaIPknrGoVU9YoP-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=25%3A75&page-id=0%3A1', -- prototype_url
  '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="600" src="https://embed.figma.com/proto/xZ8dTNlHZZkCEt0zfv8ZIz/motherly-app-maternal-language-app?node-id=25-492&p=f&viewport=190%2C371%2C0.11&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=25%3A75&page-id=0%3A1&embed-host=share" allowfullscreen></iframe>', -- prototype_embed
  ARRAY['https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.3332977305114283.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.7530046406732033.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.5290168989380959.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.3031813385522134.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.6015081128076019.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.57811924311666.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.9900214637268681.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.6132241233838256.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.722354401197794.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.7387437378953983.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.9019043313217203.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.411520093424686.png', 'https://racxzkmrhkkjoqcpggko.supabase.co/storage/v1/object/public/portfolio-assets/projects/0.16830484260532474.png']::text[], -- preview_screens
  'Motherly is a culturally-rooted mobile language learning platform that replaces passive cultural drift with an active, gamified preservation engine â€” bringing structured lessons, native audio, and verified content to Cameroonian indigenous languages including Duala, Ewondo, Nso, Bafut, and Makon.', -- project_background
  'Cameroonian indigenous languages are in rapid decline, with younger generations and diaspora communities losing access to their mother tongues. Existing platforms serve global languages exclusively, leaving 20M+ speakers without dedicated digital tools.', -- problem_statement
  'The experience architecture prioritises cultural familiarity and low-friction learning. It features a role-gated onboarding flow (Learner vs. Lecturer) and a three-tier content governance pipeline (Lecturer â†’ Content Moderator â†’ Publication). We addressed content quality with a split-panel review interface ensuring every word is verified by a native expert.', -- design_journey
  'The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.', -- challenges
  'We built a three-layer trust and quality architecture â€” Lecturer creates, Content Moderator approves, System Admin oversees â€” ensuring every lesson on Motherly carries genuine linguistic expertise. Roots in a warm, culturally-grounded UI deliver a learning experience that feels like a homecoming.', -- solution
  'Motherly demonstrates end-to-end product thinking for cultural preservation. Initial concept testing showed strong emotional resonance with the cultural identity elements and high intent-to-use scores for the daily streak mechanic.', -- outcome
  '[{"title": "Splash & Onboarding", "content": "Culturally immersive entry with a golden-brown brand palette and African textile-inspired textures. Converts users emotionally before account creation."}, {"title": "Role-Based Authentication", "content": "Step-gated auth (Registration \u00e2\u2020\u2019 Verification \u00e2\u2020\u2019 Role Selection). Role selection gates the entire experience\u00e2\u20ac\u201dLearner or Lecturer."}, {"title": "Learning Engine", "content": "Daily challenge cards, streak mechanics, and a lesson player supporting Listening, Translation, and Vocabulary Matching with animated feedback."}, {"title": "Gamification Layer", "content": "Streak flames, XP accumulation, three-tier star ratings, and podium-style leaderboards designed to build daily learning habits."}, {"title": "Lecturer Content Studio", "content": "A mobile-first lesson creation wizard with in-app audio recording and waveform previews for non-technical educators."}, {"title": "Moderator Dashboard", "content": "A split-panel review workspace (Web) covering linguistic accuracy and pedagogical soundness, scoped per language expert."}, {"title": "System Oversight", "content": "Full-platform admin dashboard with DAU/MAU analytics, feature flag control, and a complete audit log for system administrators."}]'::jsonb, -- ux_flow
  ARRAY['React Native', 'Google Stitch', 'EdTech', 'Cultural Preservation']::text[], -- tools_tech
  '#', -- apk_url
  '#e0720b', -- brand_color
  NULL, -- live_url
  '2026-05-14T11:32:37.837932+00:00', -- published_at
  24 -- sort_order
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  categories = EXCLUDED.categories,
  status = EXCLUDED.status,
  image_url = EXCLUDED.image_url,
  cta_type = EXCLUDED.cta_type,
  cta_label = EXCLUDED.cta_label,
  cta_link = EXCLUDED.cta_link,
  prototype_url = EXCLUDED.prototype_url,
  prototype_embed = EXCLUDED.prototype_embed,
  preview_screens = EXCLUDED.preview_screens,
  project_background = EXCLUDED.project_background,
  problem_statement = EXCLUDED.problem_statement,
  design_journey = EXCLUDED.design_journey,
  challenges = EXCLUDED.challenges,
  solution = EXCLUDED.solution,
  outcome = EXCLUDED.outcome,
  ux_flow = EXCLUDED.ux_flow,
  tools_tech = EXCLUDED.tools_tech,
  apk_url = EXCLUDED.apk_url,
  brand_color = EXCLUDED.brand_color,
  live_url = EXCLUDED.live_url,
  published_at = EXCLUDED.published_at,
  sort_order = EXCLUDED.sort_order;