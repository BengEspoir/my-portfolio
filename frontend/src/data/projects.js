export const projectCategories = ["All", "UI/UX", "WEB DEV", "GRAPHICS DESIGN", "PROGRAMMING"];

// QUICK IMAGE UPDATE GUIDE:
// 1) Put your real images in public/projects (example: public/projects/my-project.jpg)
// 2) Replace any URL below with your local path (example: "/projects/my-project.jpg")
// 3) Each array has 10 images, matching the 10 cards in that domain
const projectImageUrls = {
  // UI/UX image URLs (card 1 -> card 10)
  uiux: [
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1200&q=80"
  ],

  // WEB DEV image URLs (card 1 -> card 10)
  webDev: [
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551651653-c5186a1fbba2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1200&q=80"
  ],

  // GRAPHICS DESIGN image URLs (card 1 -> card 10)
  graphicsDesign: [
    "/images/hi-tv-flyer.png",
    "/images/kettys-service.png",
    "/images/restaurant-menu.png",
    "/images/hi-tv-flyer.png",
    "/images/hi-tv-flyer.png",
    "/images/hi-tv-flyer.png",
    "/images/hi-tv-flyer.png",
    "/images/hi-tv-flyer.png",
    "/images/hi-tv-flyer.png",
    "/images/hi-tv-flyer.png"
  ],

  // PROGRAMMING image URLs (card 1 -> card 10)
  programming: [
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1537432376769-00a43d3825b6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80"
  ]
};

const buildProject = ({
  id,
  title,
  slug,
  description,
  image,
  category,
  tags,
  ctaType = "default",
  ctaLabel,
  ctaLink,
  figmaUrl = "https://figma.com/file/PLACEHOLDER-LINK",
  prototypeUrl = "https://figma.com/proto/PLACEHOLDER-LINK",
  previewScreens = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1586892478025-2b5472316f22?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1512070679279-f7ee42e7e1d1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80"
  ],
  projectBackground = "This project focuses on delivering a seamless and intuitive user experience through careful research and iterative design cycles.",
  problemStatement = "Users were facing high cognitive load and difficulty navigating through fragmented information sets, leading to increased drop-off rates.",
  designJourney = "The process began with stakeholder interviews followed by detailed persona creation. I iterated through multiple low-fidelity sketches before arriving at the final structural direction.",
  challenges = "The main challenge was balancing dense data presentation with a minimalist aesthetic, ensuring that expert users have all tools at hand without overwhelming new users.",
  solution = "By implementing a modular grid system and progressive disclosure patterns, I successfully reduced perceived complexity while maintaining full functionality.",
  outcome = "Post-launch metrics showed a 25% increase in task completion speed and significantly improved user satisfaction scores in qualitative testing.",
  liveUrl = null,
  uxFlow = null
}) => {
  // Set default labels if not provided
  let finalCtaLabel = ctaLabel;
  if (!finalCtaLabel) {
    if (ctaType === "prototype") finalCtaLabel = "View Prototype";
    else if (ctaType === "case-study") finalCtaLabel = "View Case Study";
    else if (ctaType === "full-design") finalCtaLabel = "View Full Design";
    else finalCtaLabel = "View Project";
  }

  // Set default link if not provided
  let finalCtaLink = ctaLink;
  if (!finalCtaLink) {
    if (ctaType === "prototype") finalCtaLink = prototypeUrl;
    else if (ctaType === "case-study") finalCtaLink = `/projects/${slug}/case-study`;
    else if (ctaType === "full-design") finalCtaLink = `/projects/${slug}/full-design`;
    else finalCtaLink = "/portfolio";
  }

  return {
    id,
    title,
    slug: slug || id,
    description,
    image,
    category,
    tags,
    ctaType,
    ctaLabel: finalCtaLabel,
    ctaLink: finalCtaLink,
    figmaUrl,
    prototypeUrl,
    previewScreens,
    projectBackground,
    problemStatement,
    designJourney,
    challenges,
    solution,
    outcome,
    liveUrl,
    uxFlow
  };
};

const uiUxProjects = [
  buildProject({
    id: "uiux-mobile-banking-redesign",
    title: "Mobile Banking App Redesign",
    slug: "mobile-banking-redesign",
    ctaType: "prototype",
    description:
      "A full UI/UX redesign focused on clearer onboarding, faster transfers, and stronger trust cues for first-time users.",
    image: projectImageUrls.uiux[0],
    category: "UI/UX",
    tags: ["UI/UX", "Figma", "Prototype", "Case Study"]
  }),
  buildProject({
    id: "uiux-healthcare-dashboard",
    title: "Healthcare Dashboard Experience",
    slug: "healthcare-dashboard",
    ctaType: "full-design",
    description:
      "Designed a doctor-facing dashboard with simplified patient status cards, prioritization filters, and clean visual hierarchy.",
    image: projectImageUrls.uiux[1],
    category: "UI/UX",
    tags: ["Dashboard", "Wireframing", "Design System", "Research"]
  }),
  buildProject({
    id: "uiux-food-delivery-flow",
    title: "Food Delivery Checkout Flow",
    slug: "food-delivery-flow",
    ctaType: "full-design",
    description:
      "Reworked cart and checkout interactions to reduce drop-off, improve trust, and shorten the order completion journey.",
    image: projectImageUrls.uiux[2],
    category: "UI/UX",
    tags: ["User Flow", "UX Audit", "A/B Testing", "Mobile"]
  }),
  buildProject({
    id: "uiux-elearning-platform",
    title: "E-Learning Platform UX",
    slug: "elearning-platform",
    ctaType: "case-study",
    description:
      "Structured course discovery, progress tracking, and lesson playback for a learner-first study platform experience.",
    image: projectImageUrls.uiux[3],
    category: "UI/UX",
    tags: ["EdTech", "UX Strategy", "Accessibility", "Prototype"]
  }),
  buildProject({
    id: "uiux-travel-planner-app",
    title: "Travel Planner Mobile App",
    slug: "travel-planner-app",
    ctaType: "prototype",
    description:
      "Built an intuitive itinerary planning flow with day-by-day views, map integration, and collaborative trip editing.",
    image: projectImageUrls.uiux[4],
    category: "UI/UX",
    tags: ["Mobile UX", "Interaction", "Journey Map", "Figma"]
  }),
  buildProject({
    id: "uiux-real-estate-portal",
    title: "Real Estate Search Portal",
    slug: "real-estate-portal",
    ctaType: "case-study",
    description:
      "Improved listing comparison and filtering by creating clean card layouts and progressive detail disclosure patterns.",
    image: projectImageUrls.uiux[5],
    category: "UI/UX",
    tags: ["Information Architecture", "UX", "Web UI", "Prototyping"]
  }),
  buildProject({
    id: "uiux-fintech-onboarding",
    title: "Fintech Onboarding Journey",
    slug: "fintech-onboarding",
    ctaType: "full-design",
    description:
      "Designed a frictionless account setup process with clear progress indicators and compliance-focused microcopy.",
    image: projectImageUrls.uiux[6],
    category: "UI/UX",
    tags: ["Onboarding", "UX Writing", "UI Design", "Fintech"]
  }),
  buildProject({
    id: "uiux-saas-admin-panel",
    title: "SaaS Admin Panel Redesign",
    slug: "saas-admin-panel",
    ctaType: "full-design",
    description:
      "Reorganized analytics modules and navigation to help team leads complete high-frequency tasks with fewer clicks.",
    image: projectImageUrls.uiux[7],
    category: "UI/UX",
    tags: ["SaaS", "Dashboard", "Usability", "Component UI"]
  }),
  buildProject({
    id: "uiux-portfolio-case-study",
    title: "Creative Portfolio Case Study",
    slug: "portfolio-case-study",
    ctaType: "case-study",
    description:
      "Created a storytelling layout for showcasing process, outcomes, and before/after visual transformations.",
    image: projectImageUrls.uiux[8],
    category: "UI/UX",
    tags: ["Case Study", "Storytelling", "Layout", "Visual UX"]
  }),
  buildProject({
    id: "uiux-event-booking",
    title: "Event Booking UX Design",
    slug: "event-booking",
    ctaType: "full-design",
    description:
      "Crafted a ticket booking interface with progressive pricing details, seating guidance, and clearer confirmation states.",
    image: projectImageUrls.uiux[9],
    category: "UI/UX",
    tags: ["Booking", "UX Flow", "UI Kit", "Conversion"]
  }),
  buildProject({
    id: "uiux-netflix-clone",
    title: "Netflix Clone",
    slug: "netflix-clone",
    ctaType: "case-study",
    description:
      "A complete UI/UX exploration of a streaming app flow, designed to sharpen hierarchy, interaction design, and onboarding patterns.",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1400&q=80",
    category: "UI/UX",
    tags: ["UI/UX", "Netflix Clone", "Prototype", "Design Practice"],
    projectBackground: "A deep dive into the UX patterns of a leading streaming platform to understand complex content delivery systems.",
    problemStatement: "Maintaining user engagement during browsing and ensuring frictionless transitions between discovery and playback.",
    designJourney: "Replicated 15+ high-fidelity screens, testing interaction states and mobile-first navigation logic.",
    challenges: "Recreating the smooth, dark-mode aesthetic while maintaining perfect contrast and readability.",
    solution: "Applied high-fidelity UI systems inspired by Netflix's production patterns, focusing on card carousels and hero animations.",
    outcome: "Gained significant insight into scalable component architecture and high-performance interaction design."
  })
];

const webDevProjects = [
  buildProject({
    id: "webdev-agriculnet-b2b",
    title: "AgriculNet — B2B Agricultural Trade Ecosystem",
    slug: "agriculnet",
    ctaType: "case-study",
    description:
      "An enterprise-grade B2B marketplace bringing structured onboarding, verified identity, protected payments, and real-time order tracking to agricultural trade.",
    image: "/projects/agriculnet.png",
    category: "WEB DEV",
    tags: ["Next.js", "B2B Marketplace", "Fintech", "UX Design"],
    liveUrl: "https://cash-crop-app.vercel.app", // LIVE_LINK_PLACEHOLDER: This link will be updated once the custom domain is active.
    figmaUrl: null,
    prototypeUrl: null,
    previewScreens: [
      "/projects/agriculnet.png",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560414239-d7fe7d2ff990?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
    ],
    projectBackground:
      "AgriculNet is an enterprise-grade B2B marketplace that replaces fragmented WhatsApp/email negotiations with a trust-first digital commerce layer, bringing structured onboarding and real-time order tracking to agricultural trade.",
    problemStatement:
      "Agricultural trade in emerging markets suffers from trust asymmetry, middlemen dominance (absorbing 40-60% of value), and severe payment risks. Manual verification processes lock smallholder farmers out of formal trade.",
    designJourney:
      "The experience architecture focuses on conversion clarity and trust. It features a step-gated verification pipeline (KYC/AML), role-based registration, and a 3-tier trust hierarchy (Green/Gold/Amber) to reduce cognitive load in complex B2B transactions.",
    uxFlow: [
      {
        title: "Landing & Discovery",
        content: "HeroSection anchors on three value props—verified supply, protected payments, export readiness. Includes a trust strip with CountUp animations for real platform metrics."
      },
      {
        title: "Progressive Onboarding",
        content: "A step-gated verification pipeline (Registration → Role selection → Email/Phone OTP → Identity upload → Admin review) with TierBadge status indicators."
      },
      {
        title: "Trust & Verification Layer",
        content: "A 3-tier hierarchy (Green/Blue/Amber) and SellerTrustBar combining star ratings, verification status, and inquiry heat demand signals."
      },
      {
        title: "Listing & Farmer Surfaces",
        content: "Alibaba-style density model crop cards with standalone 'Send Inquiry' CTAs, status badges, and export readiness indicators."
      },
      {
        title: "Order Management & Tracking",
        content: "State-machine workflow with visual status badges (pending_payment → confirmed → in_transit → delivered) and vertical timeline tracking."
      },
      {
        title: "Messaging & Context",
        content: "ListingContextBanner surfaces trade context (crop, quantity, location) inline within chat to eliminate discovery friction."
      },
      {
        title: "Admin Moderation UI",
        content: "Decision velocity workspace with KPI cards, filterable user lists, and a split-pane review system for identity verification."
      }
    ],
    challenges:
      "The primary challenge was balancing the verification bottleneck with user conversion. We implemented progressive onboarding that converts users before asking for heavy KYC, using real-time status tracking.",
    solution:
      "We built a Trust & Verification layer with semantic badges (Verified, Export Ready), inquiry heat indicators, and protected payment rails supporting mobile money and card settlements.",
    outcome:
      "AgriculNet demonstrates end-to-end product thinking for marketplace UX, showing a 25% increase in task completion speed during initial school project testing phases and improved trade visibility."
  }),
  buildProject({
    id: "webdev-company-landing",
    title: "Company Landing Website",
    description:
      "Developed a responsive marketing website with performance optimization, reusable sections, and clean SEO metadata.",
    image: projectImageUrls.webDev[0],
    category: "WEB DEV",
    tags: ["React", "Responsive", "SEO", "Frontend"]
  }),
  buildProject({
    id: "webdev-nephus-internship-ecommerce",
    title: "Internship E-commerce Platform",
    description:
      "Contributed to product pages, checkout UI, and Git team workflows during a production internship project.",
    image: projectImageUrls.webDev[1],
    category: "WEB DEV",
    tags: ["E-commerce", "Internship", "Git", "Teamwork"]
  }),
  buildProject({
    id: "webdev-vision-aid-platform",
    title: "VISION-AID University Platform",
    description:
      "Built core frontend pages for notes, tutorials, and account management in a university productivity ecosystem.",
    image: projectImageUrls.webDev[2],
    category: "WEB DEV",
    tags: ["Web App", "React", "Student Platform", "UI"]
  }),
  buildProject({
    id: "webdev-restaurant-reservation",
    title: "Restaurant Reservation System",
    description:
      "Implemented booking calendars, availability logic, and admin management features for restaurant owners.",
    image: projectImageUrls.webDev[3],
    category: "WEB DEV",
    tags: ["Booking", "JavaScript", "Forms", "Admin"]
  }),
  buildProject({
    id: "webdev-freelance-business-site",
    title: "Small Business Freelance Website",
    description:
      "Delivered a conversion-focused service website with clear call-to-actions and lead capture components.",
    image: projectImageUrls.webDev[4],
    category: "WEB DEV",
    tags: ["Freelance", "Landing Page", "Lead Gen", "Web"]
  }),
  buildProject({
    id: "webdev-online-course-marketplace",
    title: "Online Course Marketplace",
    description:
      "Shipped catalog browsing, instructor pages, and secure enrollment flows for a digital learning marketplace.",
    image: projectImageUrls.webDev[5],
    category: "WEB DEV",
    tags: ["Marketplace", "React", "API", "Routing"]
  }),
  buildProject({
    id: "webdev-portfolio-v2",
    title: "Personal Portfolio V2",
    description:
      "Rebuilt portfolio architecture with modular components, route-level organization, and reusable content blocks.",
    image: projectImageUrls.webDev[6],
    category: "WEB DEV",
    tags: ["Portfolio", "Refactor", "Components", "Frontend"]
  }),
  buildProject({
    id: "webdev-charity-donation-site",
    title: "Charity Donation Website",
    description:
      "Created campaign pages, donation forms, and impact storytelling sections to improve trust and engagement.",
    image: projectImageUrls.webDev[7],
    category: "WEB DEV",
    tags: ["NGO", "Donation", "UX", "Performance"]
  }),
  buildProject({
    id: "webdev-job-board-platform",
    title: "Job Board Platform",
    description:
      "Built role filtering, company profiles, and candidate workflow pages for a modern recruitment web product.",
    image: projectImageUrls.webDev[8],
    category: "WEB DEV",
    tags: ["Job Board", "Search", "Filters", "Web App"]
  }),
  buildProject({
    id: "webdev-hotel-management-ui",
    title: "Hotel Management Web UI",
    description:
      "Developed reservation tracking interfaces, occupancy views, and role-specific dashboards for hotel teams.",
    image: projectImageUrls.webDev[9],
    category: "WEB DEV",
    tags: ["Dashboard", "Hospitality", "Frontend", "Management"]
  })
];

const graphicsDesignProjects = [
  buildProject({
    id: "graphics-minimal-service-flyer",
    title: "Minimal Service Flyer",
    description:
      "Designed a premium flyer concept using strong typography, airy spacing, and clear information grouping.",
    image: projectImageUrls.graphicsDesign[0],
    category: "GRAPHICS DESIGN",
    tags: ["Flyer", "Typography", "Brand", "Photoshop"]
  }),
  buildProject({
    id: "graphics-social-media-campaign",
    title: "Social Media Campaign Kit",
    description:
      "Produced a cross-platform post set with reusable templates for promotional and product storytelling content.",
    image: projectImageUrls.graphicsDesign[1],
    category: "GRAPHICS DESIGN",
    tags: ["Social Media", "Template", "Branding", "Canva"]
  }),
  buildProject({
    id: "graphics-brochure design",
    title: "Brochure Design",
    description:
      "Created logo usage rules, color palettes, menu visuals, and social assets for a food startup launch.",
    image: projectImageUrls.graphicsDesign[2],
    category: "GRAPHICS DESIGN",
    tags: ["Branding", "Brochure", "Identity", "Design"]
  }),
  buildProject({
    id: "graphics-event-poster-series",
    title: "Event Poster Series",
    description:
      "Designed a cohesive poster collection for tech events with strong hierarchy and date-first readability.",
    image: projectImageUrls.graphicsDesign[3],
    category: "GRAPHICS DESIGN",
    tags: ["Poster", "Print", "Layout", "Illustrator"]
  }),
  buildProject({
    id: "graphics-product-packaging",
    title: "Product Packaging Concepts",
    description:
      "Explored packaging structures and visual systems for retail shelf impact and premium product perception.",
    image: projectImageUrls.graphicsDesign[4],
    category: "GRAPHICS DESIGN",
    tags: ["Packaging", "Mockup", "Brand", "Visual Design"]
  }),
  buildProject({
    id: "graphics-magazine-layout",
    title: "Magazine Layout Design",
    description:
      "Built editorial spreads balancing photography, long-form text, and callout modules for easy reading.",
    image: projectImageUrls.graphicsDesign[5],
    category: "GRAPHICS DESIGN",
    tags: ["Editorial", "InDesign", "Grid", "Publication"]
  }),
  buildProject({
    id: "graphics-conference-banner-set",
    title: "Conference Banner Set",
    description:
      "Designed web and print banner assets for conference registration, schedules, and speaker highlight zones.",
    image: projectImageUrls.graphicsDesign[6],
    category: "GRAPHICS DESIGN",
    tags: ["Banner", "Marketing", "Digital", "Print"]
  }),
  buildProject({
    id: "graphics-startup-pitch-deck",
    title: "Startup Pitch Deck Visuals",
    description:
      "Styled slide visuals and infographic charts for stronger investor storytelling and cleaner data presentation.",
    image: projectImageUrls.graphicsDesign[7],
    category: "GRAPHICS DESIGN",
    tags: ["Pitch Deck", "Infographic", "Slides", "Brand"]
  }),
  buildProject({
    id: "graphics-album-cover-collection",
    title: "Album Cover Collection",
    description:
      "Created expressive cover art concepts mixing photomanipulation, texture overlays, and bold type systems.",
    image: projectImageUrls.graphicsDesign[8],
    category: "GRAPHICS DESIGN",
    tags: ["Cover Art", "Creative", "Compositing", "Typography"]
  }),
  buildProject({
    id: "graphics-fashion-lookbook",
    title: "Fashion Lookbook Design",
    description:
      "Designed a clean lookbook presentation with product callouts and seasonal style direction blocks.",
    image: projectImageUrls.graphicsDesign[9],
    category: "GRAPHICS DESIGN",
    tags: ["Fashion", "Lookbook", "Brand Story", "Layout"]
  })
];

const programmingProjects = [
  buildProject({
    id: "programming-library-management-c",
    title: "Library Management System in C",
    description:
      "Built a CLI system to manage books, borrowers, and due dates with structured data handling in C.",
    image: projectImageUrls.programming[0],
    category: "PROGRAMMING",
    tags: ["C", "CLI", "Data Structures", "School Project"]
  }),
  buildProject({
    id: "programming-maze-game-cpp",
    title: "2D Maze Game in C++",
    description:
      "Developed core game logic for movement, collisions, score tracking, and level progression in C++.",
    image: projectImageUrls.programming[1],
    category: "PROGRAMMING",
    tags: ["C++", "Game Logic", "OOP", "Algorithms"]
  }),
  buildProject({
    id: "programming-student-record-java",
    title: "Student Record Manager (Java)",
    description:
      "Implemented CRUD operations and sorting utilities for student data in a menu-driven Java application.",
    image: projectImageUrls.programming[2],
    category: "PROGRAMMING",
    tags: ["Java", "OOP", "CRUD", "Console"]
  }),
  buildProject({
    id: "programming-expense-tracker-python",
    title: "Expense Tracker in Python",
    description:
      "Created a lightweight finance tracker with category budgets, monthly summaries, and CSV export support.",
    image: projectImageUrls.programming[3],
    category: "PROGRAMMING",
    tags: ["Python", "Automation", "Data", "Utility"]
  }),
  buildProject({
    id: "programming-attendance-system-csharp",
    title: "Attendance System in C#",
    description:
      "Designed a desktop attendance tool for student check-ins, absence reports, and class-level summaries.",
    image: projectImageUrls.programming[4],
    category: "PROGRAMMING",
    tags: ["C#", ".NET", "Desktop", "Records"]
  }),
  buildProject({
    id: "programming-sorting-visualizer-js",
    title: "Sorting Algorithm Visualizer",
    description:
      "Built an interactive visual tool demonstrating bubble, merge, and quick sort with speed controls.",
    image: projectImageUrls.programming[5],
    category: "PROGRAMMING",
    tags: ["JavaScript", "Algorithms", "Visualization", "Learning"]
  }),
  buildProject({
    id: "programming-inventory-api-node",
    title: "Inventory API with Node.js",
    description:
      "Developed REST endpoints for stock tracking, low-item alerts, and transaction logs for a small store.",
    image: projectImageUrls.programming[6],
    category: "PROGRAMMING",
    tags: ["Node.js", "API", "Backend", "JSON"]
  }),
  buildProject({
    id: "programming-chat-server-go",
    title: "Realtime Chat Server in Go",
    description:
      "Implemented concurrent socket handling and room-based broadcasting for a minimal realtime chat service.",
    image: projectImageUrls.programming[7],
    category: "PROGRAMMING",
    tags: ["Go", "Concurrency", "Sockets", "Backend"]
  }),
  buildProject({
    id: "programming-ai-flashcards",
    title: "AI Flashcard Generator",
    description:
      "Programmed a study helper that converts notes into flashcards with topic grouping and quiz mode logic.",
    image: projectImageUrls.programming[8],
    category: "PROGRAMMING",
    tags: ["Python", "NLP", "Education", "Tooling"]
  }),
  buildProject({
    id: "programming-compiler-mini-project",
    title: "Mini Compiler Project",
    description:
      "Created tokenizer and parser modules for a tiny language supporting expressions, variables, and errors.",
    image: projectImageUrls.programming[9],
    category: "PROGRAMMING",
    tags: ["Compiler", "Parsing", "Data Structures", "CS"]
  })
];

export const projects = [
  ...uiUxProjects,
  ...webDevProjects,
  ...graphicsDesignProjects,
  ...programmingProjects
];

export const featuredCaseStudy = {
  title: "Netflix Clone - UI/UX Study",
  summary:
    "A complete UI/UX exploration of a streaming app flow, designed to sharpen hierarchy, interaction design, and onboarding patterns.",
  // Featured large preview image on the Portfolio page.
  // Replace this URL with your real image path, e.g. "/projects/featured-netflix-clone.jpg"
  image:
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1400&q=80",
  bullets: [
    "Replicated 15+ high-fidelity screens across onboarding, login, and content discovery.",
    "Applied typography systems and spacing rules inspired by production streaming interfaces.",
    "Tested transitions and interaction states for a smoother mobile-first experience."
  ],
  ctaLink: "/projects/netflix-clone/case-study"
};
