export interface Resource {
  id: string;
  title: string;
  version: string;
  category: "ui-kits" | "3d" | "mockups" | "fonts";
  categoryLabel: string;
  description: string;
  price: string;
  author: string;
  format: string;
  fileSize: string;
  downloadUrl: string;
  image?: string;
  isTypographyCard?: boolean;
  featured?: boolean;
  tags: string[];
  sha256?: string;
  packageCommand?: string;
  certificatePdfUrl?: string;
  certificateId?: string;
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
    price: "$0.00",
    author: "Agnel Studio",
    format: "Figma • Web",
    fileSize: "148 MB",
    downloadUrl: "/resources/downloads/lumina-glass-ui-kit.zip",
    image: "/resources/images/lumina-glass.png",
    featured: true,
    tags: ["Figma", "Tailwind", "Design System", "Dashboard", "Dark Mode"],
    sha256: "e83c7918a93e3d2f98fbc18596a241b1049f4",
    packageCommand: "npm i @lumina/tokens --save-dev",
    certificatePdfUrl: "/resources/downloads/lumina-commercial-certificate.pdf",
    certificateId: "AGN-2026-LUMINA-8849-FREE",
  },
  {
    id: "nebula-3d-icons",
    title: "Nebula 3D Icons",
    version: "48 Items",
    category: "3d",
    categoryLabel: "3D Assets",
    description: "Monochrome, frosted glass and metallic procedural 3D icons optimized for contemporary web interfaces.",
    price: "$0.00",
    author: "Forma Lab",
    format: "Blender • PNG",
    fileSize: "42 MB",
    downloadUrl: "/resources/downloads/nebula-3d-icons.zip",
    image: "/resources/images/nebula-icons.png",
    featured: false,
    tags: ["Blender", "PNG", "3D Icons", "Glassmorphism", "Spatial"],
    sha256: "7f21a8c9b31e04d49a78bc3410e599a8126b8f10",
  },
  {
    id: "studio-iphone-16-pro",
    title: "Studio iPhone 16 Pro",
    version: "8 Angles",
    category: "mockups",
    categoryLabel: "Mockups",
    description: "Meticulously modeled titanium device mockup with isolated shadows, realistic reflections, and customizable dynamic island states.",
    price: "$0.00",
    author: "Studio K",
    format: "PSD • Figma",
    fileSize: "96 MB",
    downloadUrl: "/resources/downloads/studio-iphone-16-pro.zip",
    image: "/resources/images/iphone-mockup.png",
    featured: false,
    tags: ["Figma", "PSD", "iPhone 16 Pro", "Device Mockup", "Titanium"],
    sha256: "3b18f4a9c02d18e907a51cf64188b02ea662319f",
  },
  {
    id: "hyperdash-analytics",
    title: "HyperDash Analytics",
    version: "Pro Kit",
    category: "ui-kits",
    categoryLabel: "UI Kits",
    description: "Enterprise-grade flow sequences for financial telemetry, multi-tenant billing, and system audit logs.",
    price: "$0.00",
    author: "Agnel Studio",
    format: "32 Flows • Figma",
    fileSize: "64 MB",
    downloadUrl: "/resources/downloads/hyperdash-analytics.zip",
    image: "/resources/images/hyperdash.png",
    featured: false,
    tags: ["Analytics", "Figma", "Enterprise", "Wireframes", "SaaS"],
    sha256: "d94a1120eb78a4f9103c8b6631ad02eef5a881cb",
    packageCommand: "npm i @hyperdash/flows --save-dev",
  },
  {
    id: "aura-fluid-gradients",
    title: "Aura Fluid Gradients",
    version: "24 Textures",
    category: "3d",
    categoryLabel: "3D Assets",
    description: "Noise-free calm vector meshes and 4K raster maps engineered for deep-toned hero backgrounds and ambient lighting.",
    price: "$0.00",
    author: "Elena Rostova",
    format: "Vector • 4K",
    fileSize: "38 MB",
    downloadUrl: "/resources/downloads/aura-fluid-gradients.zip",
    image: "/resources/images/aura-gradients.png",
    featured: false,
    tags: ["Gradients", "4K", "Vector", "Textures", "Wallpapers"],
    sha256: "6c4a91b24e0df7a1928b553e18ad019cae674129",
  },
  {
    id: "monotype-display-serif",
    title: "MonoType Display Serif",
    version: "3 Styles",
    category: "fonts",
    categoryLabel: "Fonts",
    description: "High-contrast editorial serif typeface crafted for architectural journals, mastheads, and modern luxury commerce.",
    price: "$0.00",
    author: "Agnel Foundry",
    format: "OTF • WOFF2",
    fileSize: "12 MB",
    downloadUrl: "/resources/downloads/monotype-display-serif.zip",
    isTypographyCard: true,
    featured: false,
    tags: ["Typography", "Serif", "Editorial", "Web Fonts", "Luxury"],
    sha256: "a159f8021cbb6920ad83492ee146ba88f9103822",
  },
];
