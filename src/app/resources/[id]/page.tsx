import { notFound } from "next/navigation";
import { Metadata } from "next";
import { resourcesData } from "@/data/resources";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return resourcesData.map((resource) => ({
    id: resource.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resource = resourcesData.find((r) => r.id === id);

  if (!resource) {
    return {
      title: "Resource Not Found | Agnel Vault",
      description: "The requested digital resource could not be found in the vault.",
    };
  }

  return {
    title: `${resource.title} (${resource.version}) — Free Download | Agnel Vault`,
    description: resource.description,
    openGraph: {
      title: `${resource.title} — Free Architecture Asset`,
      description: resource.description,
      images: resource.image ? [{ url: resource.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.title} | Agnel Vault`,
      description: resource.description,
    },
  };
}

export default async function ResourceProductPage({ params }: Props) {
  const { id } = await params;
  const resource = resourcesData.find((r) => r.id === id);

  if (!resource) {
    notFound();
  }

  return <ProductDetailClient resource={resource} />;
}
