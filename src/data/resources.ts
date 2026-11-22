export interface ResourceFeature {
  title: string;
  desc: string;
  icon: string;
  tag: string;
}

export interface ResourceFileItem {
  name: string;
  size: string;
  icon: string;
}

export interface ResourceGalleryItem {
  label: string;
  img: string;
}

export interface Resource {
  id: string;
  title: string;
  version: string;
  category: "ui-kits" | "3d" | "mockups" | "fonts";
  categoryLabel: string;
  description: string;
  longDescription?: string;
  price: string;
  originalPrice?: string;
  author: string;
  format: string;
  fileSize: string;
  downloadUrl: string;
  image?: string;
  previewMain?: string;
  gallery?: ResourceGalleryItem[];
  features?: ResourceFeature[];
  filesIncluded?: ResourceFileItem[];
  isTypographyCard?: boolean;
  featured?: boolean;
  tags: string[];
  sha256?: string;
  packageCommand?: string;
  certificatePdfUrl?: string;
  certificateId?: string;
  downloadCount?: string;
  updatedAt?: string;
  releaseTag?: string;
}

export interface ResourceCategory {
  id: "all" | "ui-kits" | "3d" | "mockups" | "fonts";
  label: string;
  count?: number;
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { id: "all", label: "All" },
  { id: "ui-kits", label: "UI Kits" },
  { id: "3d", label: "3D Assets" },
  { id: "mockups", label: "Mockups" },
  { id: "fonts", label: "Fonts" },
];

export const resourcesData: Resource[] = [
  {
    id: "lumina-glass-ui-kit",
    title: "Lumina Glass UI Kit",
    version: "v2.4",
    category: "ui-kits",
    categoryLabel: "UI Kits",
    description: "Complete multi-layout dark aesthetic dashboard kit with pristine token hierarchy, responsive components, and modular charts.",
    longDescription: "Comprehensive, production-ready SaaS dashboard components, tokens, and multi-device templates. Designed with mathematical precision for dark architectural software and cognitive clarity.",
    price: "$0.00",
    originalPrice: "$89",
    author: "Agnel Studio",
    format: "Figma • Web",
    fileSize: "148.2 MB",
    downloadUrl: "/resources/downloads/lumina-glass-ui-kit.zip",
    image: "/resources/images/lumina-glass.png",
    previewMain: "/resources/images/lumina-detail-main.png",
    gallery: [
      { label: "01. Token Architecture", img: "/resources/images/lumina-detail-thumb1.png" },
      { label: "02. Analytics Matrix", img: "/resources/images/lumina-detail-thumb2.png" },
      { label: "03. Responsive Layouts", img: "/resources/images/lumina-detail-thumb3.png" },
    ],
    features: [
      {
        title: "450+ UI Components",
        desc: "Form elements, datagrid configurations, interactive graphs, dropdowns, and modals fully wired to Figma Variants & Auto Layout 5.0.",
        icon: "layers",
        tag: "Component set verified v2.4",
      },
      {
        title: "Tailwind 3.4 Config",
        desc: "Includes copy-paste JSON tokens, CSS variable sheets, and configured Tailwind themes mapping directly to Figma design tokens.",
        icon: "code",
        tag: "Ready for React & Next.js",
      },
      {
        title: "8 SaaS Archetypes",
        desc: "Complete end-to-end layouts: Executive Dashboard, Multi-tenant Settings, Billing Matrix, Analytics Canvas, and API Management.",
        icon: "web",
        tag: "Desktop & Tablet specs",
      },
      {
        title: "Fluid Breakpoints",
        desc: "Designed with fluid min-max scaling principles, ensuring all typography, metrics, and nested components adapt gracefully to viewport shifts.",
        icon: "devices",
        tag: "Mobile first architecture",
      },
    ],
    filesIncluded: [
      { name: "Lumina_Master_Design_System.fig", size: "128.4 MB", icon: "description" },
      { name: "lumina-tokens.tailwind.config.js", size: "14.2 KB", icon: "data_object" },
      { name: "Vector_Icons_And_Glyphs.zip", size: "19.5 MB", icon: "folder" },
      { name: "DOCUMENTATION_AND_SPECS.pdf", size: "2.8 MB", icon: "menu_book" },
    ],
    featured: true,
    tags: ["Figma", "Tailwind", "Design System", "Dashboard", "Dark Mode"],
    sha256: "e83c7918a93e3d2f98fbc18596a241b1049f4",
    packageCommand: "npm i @lumina/tokens --save-dev",
    certificatePdfUrl: "/resources/downloads/lumina-commercial-certificate.pdf",
    certificateId: "AGN-2026-LUMINA-8849-FREE",
    downloadCount: "14,248 downloads",
    updatedAt: "Updated 2 days ago",
    releaseTag: "Release 2.4 • Refined Obsidian Series",
  },
  {
    id: "nebula-3d-icons",
    title: "Nebula 3D Icons",
    version: "48 Items",
    category: "3d",
    categoryLabel: "3D Assets",
    description: "Monochrome, frosted glass and metallic procedural 3D icons optimized for contemporary web interfaces.",
    longDescription: "A curated spatial suite of 48 procedurally crafted 3D objects. Rendered in matte frosted glass, brushed titanium, and deep obsidian with pre-configured directional lighting rigs.",
    price: "$0.00",
    originalPrice: "$45",
    author: "Forma Lab",
    format: "Blender • PNG",
    fileSize: "42.5 MB",
    downloadUrl: "/resources/downloads/nebula-3d-icons.zip",
    image: "/resources/images/nebula-icons.png",
    previewMain: "/resources/images/nebula-icons.png",
    gallery: [
      { label: "01. Matte Glass Solids", img: "/resources/images/nebula-icons.png" },
      { label: "02. Wireframe Meshes", img: "/resources/images/lumina-detail-thumb2.png" },
      { label: "03. Render Environments", img: "/resources/images/lumina-detail-thumb3.png" },
    ],
    features: [
      {
        title: "48 Procedural Solids",
        desc: "Includes geometric prisms, floating toruses, curved conduits, and interface symbols rendered at 4000x4000px resolution.",
        icon: "view_in_ar",
        tag: "Cycles & Eevee ready",
      },
      {
        title: "Transparent PNGs",
        desc: "Isolated alpha cutouts with realistic contact drop-shadows and glass edge transmission for instant drag-and-drop web composition.",
        icon: "image",
        tag: "Zero clipping artifacts",
      },
      {
        title: "Raw Blender Scenes",
        desc: "Complete .blend project files containing procedural shader nodes, camera rigs, and clean polygon topology.",
        icon: "deployed_code",
        tag: "Blender 4.0+ compliant",
      },
      {
        title: "Spatial GLTF Binaries",
        desc: "Web-ready compressed GLTF files for Three.js, React Three Fiber, and WebGL interactive hero presentations.",
        icon: "3d_rotation",
        tag: "Sub-500KB per model",
      },
    ],
    filesIncluded: [
      { name: "Nebula_Master_Scene.blend", size: "28.6 MB", icon: "deployed_code" },
      { name: "Rendered_PNG_Assets_4K.zip", size: "12.8 MB", icon: "folder_zip" },
      { name: "Spatial_GLTF_Models.zip", size: "4.1 MB", icon: "view_in_ar" },
    ],
    featured: false,
    tags: ["Blender", "PNG", "3D Icons", "Glassmorphism", "Spatial"],
    sha256: "7f21a8c9b31e04d49a78bc3410e599a8126b8f10",
    downloadCount: "8,920 downloads",
    updatedAt: "Updated 1 week ago",
    releaseTag: "Spatial Series • Vol. 02",
  },
  {
    id: "studio-iphone-16-pro",
    title: "Studio iPhone 16 Pro",
    version: "8 Angles",
    category: "mockups",
    categoryLabel: "Mockups",
    description: "Meticulously modeled titanium device mockup with isolated shadows, realistic reflections, and customizable dynamic island states.",
    longDescription: "Architectural apparatus staging for iOS and mobile software showcases. Photorealistic natural reflections, separate specular maps, and isolated drop shadows calibrated for neutral dark canvases.",
    price: "$0.00",
    originalPrice: "$59",
    author: "Studio K",
    format: "PSD • Figma",
    fileSize: "96.4 MB",
    downloadUrl: "/resources/downloads/studio-iphone-16-pro.zip",
    image: "/resources/images/iphone-mockup.png",
    previewMain: "/resources/images/iphone-mockup.png",
    gallery: [
      { label: "01. Frontal Staging", img: "/resources/images/iphone-mockup.png" },
      { label: "02. Dynamic Island Float", img: "/resources/images/lumina-detail-thumb1.png" },
      { label: "03. Oblique Isometric", img: "/resources/images/lumina-detail-thumb3.png" },
    ],
    features: [
      {
        title: "8 Canonical Angles",
        desc: "Frontal, isometric left/right, portrait floating, and dramatic perspective tilts matching standard Apple marketing fidelity.",
        icon: "crop_rotate",
        tag: "6000x4500px 300 DPI",
      },
      {
        title: "Smart Object Screens",
        desc: "One-click screen replacement in Photoshop and native component overrides in Figma with auto-clipping masks.",
        icon: "smart_toy",
        tag: "Zero distortion mapping",
      },
      {
        title: "Natural Titanium Finishes",
        desc: "Natural, Black, White, and Desert Titanium shader layers with togglable ambient occlusion and realistic micro-scratches.",
        icon: "palette",
        tag: "4 official finishes",
      },
      {
        title: "Dynamic Island States",
        desc: "Interactive overlays for live activity alerts, call banners, audio waveforms, and FaceID authentication sweeps.",
        icon: "touch_app",
        tag: "Pixel-perfect iOS 18",
      },
    ],
    filesIncluded: [
      { name: "iPhone_16_Pro_Figma_Kit.fig", size: "48.2 MB", icon: "description" },
      { name: "Photoshop_Smart_Objects_Pack.psd", size: "84.1 MB", icon: "image" },
      { name: "Shadow_And_Reflections_Pass.png", size: "14.1 MB", icon: "layers" },
    ],
    featured: false,
    tags: ["Figma", "PSD", "iPhone 16 Pro", "Device Mockup", "Titanium"],
    sha256: "3b18f4a9c02d18e907a51cf64188b02ea662319f",
    downloadCount: "22,410 downloads",
    updatedAt: "Updated 3 days ago",
    releaseTag: "Hardware Staging • Titanium Edition",
  },
  {
    id: "hyperdash-analytics",
    title: "HyperDash Analytics",
    version: "Pro Kit",
    category: "ui-kits",
    categoryLabel: "UI Kits",
    description: "Enterprise-grade flow sequences for financial telemetry, multi-tenant billing, and system audit logs.",
    longDescription: "End-to-end user journeys for high-volume enterprise software. Includes complex data table interactions, real-time audit event streams, role-based access control flows, and billing invoices.",
    price: "$0.00",
    originalPrice: "$99",
    author: "Agnel Studio",
    format: "32 Flows • Figma",
    fileSize: "64.8 MB",
    downloadUrl: "/resources/downloads/hyperdash-analytics.zip",
    image: "/resources/images/hyperdash.png",
    previewMain: "/resources/images/hyperdash.png",
    gallery: [
      { label: "01. Telemetry Dashboard", img: "/resources/images/hyperdash.png" },
      { label: "02. Multi-tenant Matrix", img: "/resources/images/lumina-detail-thumb2.png" },
      { label: "03. Audit Stream Table", img: "/resources/images/lumina-detail-thumb1.png" },
    ],
    features: [
      {
        title: "32 Complete Flows",
        desc: "From initial enterprise onboarding and tenant provisioning to advanced cluster diagnostics and invoice disputes.",
        icon: "account_tree",
        tag: "Tested UX patterns",
      },
      {
        title: "Dense Data Tables",
        desc: "Custom virtualized tables with column reordering, multi-select bulk actions, filter pills, and inline row expanding.",
        icon: "table_chart",
        tag: "High cognitive density",
      },
      {
        title: "Telemetry Sparklines",
        desc: "Vector charts calibrated for sub-second metrics updates, network throughput monitors, and server health gauges.",
        icon: "monitoring",
        tag: "Chart.js / Recharts aligned",
      },
      {
        title: "Security & IAM Modals",
        desc: "Granular permissions assignment matrices, API key generation dialogues, and SSO SAML setup wizards.",
        icon: "security",
        tag: "Enterprise compliant",
      },
    ],
    filesIncluded: [
      { name: "HyperDash_Enterprise_Flows.fig", size: "58.4 MB", icon: "description" },
      { name: "Data_Table_Component_Specs.pdf", size: "6.4 MB", icon: "menu_book" },
    ],
    featured: false,
    tags: ["Analytics", "Figma", "Enterprise", "Wireframes", "SaaS"],
    sha256: "d94a1120eb78a4f9103c8b6631ad02eef5a881cb",
    packageCommand: "npm i @hyperdash/flows --save-dev",
    downloadCount: "6,190 downloads",
    updatedAt: "Updated 5 days ago",
    releaseTag: "Enterprise Telemetry • Architecture Series",
  },
  {
    id: "aura-fluid-gradients",
    title: "Aura Fluid Gradients",
    version: "24 Textures",
    category: "3d",
    categoryLabel: "3D Assets",
    description: "Noise-free calm vector meshes and 4K raster maps engineered for deep-toned hero backgrounds and ambient lighting.",
    longDescription: "Silky, seamless abstract gradients and fluid color fields formulated for midnight interfaces. Zero color banding, engineered with 16-bit color depth and mathematical spline curvature.",
    price: "$0.00",
    originalPrice: "$39",
    author: "Elena Rostova",
    format: "Vector • 4K",
    fileSize: "38.1 MB",
    downloadUrl: "/resources/downloads/aura-fluid-gradients.zip",
    image: "/resources/images/aura-gradients.png",
    previewMain: "/resources/images/aura-gradients.png",
    gallery: [
      { label: "01. Midnight Periwinkle", img: "/resources/images/aura-gradients.png" },
      { label: "02. Deep Indigo Drift", img: "/resources/images/lumina-detail-thumb2.png" },
      { label: "03. Slate Topography", img: "/resources/images/lumina-detail-thumb3.png" },
    ],
    features: [
      {
        title: "24 4K Renderings",
        desc: "3840x2160 UHD wallpaper and hero assets in lossless PNG, ready for production web headers and mobile apps.",
        icon: "gradient",
        tag: "16-bit depth • No banding",
      },
      {
        title: "Raw SVG Mesh Vectors",
        desc: "Infinite resolution vector gradients you can edit in Figma, Illustrator, or CSS inline code.",
        icon: "polyline",
        tag: "Scalable vector paths",
      },
      {
        title: "Curated Nocturnal Tones",
        desc: "Engineered specifically to sit behind white typography and glassmorphic UI without legibility drop.",
        icon: "dark_mode",
        tag: "High contrast verified",
      },
      {
        title: "Ambient Blur Spheres",
        desc: "Individual glow discs designed for CSS backdrop-filter blur implementations.",
        icon: "blur_on",
        tag: "CSS snippet included",
      },
    ],
    filesIncluded: [
      { name: "Aura_Gradients_4K_Lossless.zip", size: "32.0 MB", icon: "folder_zip" },
      { name: "Vector_SVG_Meshes.zip", size: "6.1 MB", icon: "folder_zip" },
    ],
    featured: false,
    tags: ["Gradients", "4K", "Vector", "Textures", "Wallpapers"],
    sha256: "6c4a91b24e0df7a1928b553e18ad019cae674129",
    downloadCount: "11,850 downloads",
    updatedAt: "Updated 2 weeks ago",
    releaseTag: "Chromatic Fluidity • Series 04",
  },
  {
    id: "monotype-display-serif",
    title: "MonoType Display Serif",
    version: "3 Styles",
    category: "fonts",
    categoryLabel: "Fonts",
    description: "High-contrast editorial serif typeface crafted for architectural journals, mastheads, and modern luxury commerce.",
    longDescription: "An intellectual, razor-sharp serif family that pairs classic Renaissance proportions with crisp modern digital geometry. Designed for titles, editorial mastheads, and high-impact hero treatments.",
    price: "$0.00",
    originalPrice: "$65",
    author: "Agnel Foundry",
    format: "OTF • WOFF2",
    fileSize: "12.3 MB",
    downloadUrl: "/resources/downloads/monotype-display-serif.zip",
    isTypographyCard: true,
    previewMain: "/resources/images/lumina-detail-main.png",
    gallery: [
      { label: "01. Regular Specimen", img: "/resources/images/lumina-detail-thumb1.png" },
      { label: "02. Italic Highlight", img: "/resources/images/lumina-detail-thumb2.png" },
      { label: "03. Display Bold", img: "/resources/images/lumina-detail-thumb3.png" },
    ],
    features: [
      {
        title: "3 Master Styles",
        desc: "Regular (400), True Italic (400i), and Display Bold (700) with complete Latin extended character sets.",
        icon: "font_download",
        tag: "Full diacritics support",
      },
      {
        title: "High-Density Kerning",
        desc: "Over 1,200 optical kerning pairs manually tuned for razor-sharp legibility at massive display scale.",
        icon: "format_letter_spacing",
        tag: "Optically calibrated",
      },
      {
        title: "Web Font Binaries",
        desc: "Optimized WOFF2 and WOFF formats with variable font axes for ultra-lightweight web downloads (28KB).",
        icon: "language",
        tag: "WOFF2 + Variable TTF",
      },
      {
        title: "Editorial OpenType Features",
        desc: "Includes discretionary ligatures, tabular numbers, historical alternates, and proportional oldstyle figures.",
        icon: "auto_awesome",
        tag: "OpenType accessible",
      },
    ],
    filesIncluded: [
      { name: "MonoType_Serif_OTF_Desktop.zip", size: "8.2 MB", icon: "folder_zip" },
      { name: "MonoType_Serif_WOFF2_Web.zip", size: "2.1 MB", icon: "folder_zip" },
      { name: "Typographic_Specimen_Guide.pdf", size: "2.0 MB", icon: "menu_book" },
    ],
    featured: false,
    tags: ["Typography", "Serif", "Editorial", "Web Fonts", "Luxury"],
    sha256: "a159f8021cbb6920ad83492ee146ba88f9103822",
    downloadCount: "17,630 downloads",
    updatedAt: "Updated 4 days ago",
    releaseTag: "Typographic Foundry • Specimen № 08",
  },
];
