import type { Metadata } from 'next';
import ProductDetailPage from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

const productsMetadata: Record<string, { title: string; description: string }> = {
  'cotton-fabrics': {
    title: 'Shiveshwar Textiles | Cotton Fabrics',
    description: 'Premium organic & carded cotton fabrics ranging from 50 to 150 GSM. Ideal for shirting, uniforms, and light apparel.',
  },
  'polyester-fabrics': {
    title: 'Shiveshwar Textiles | Greig Polyester Fabric',
    description: 'High-density filament & spun polyester weaves from 50 to 250 GSM. Built for durability, strength, and form stability.',
  },
  'blended-fabrics': {
    title: 'Shiveshwar Textiles | Blended Fabrics',
    description: 'Balanced performance fabrics combining natural comfort and synthetic strength. Excellent wrinkle resistance and wearability.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = productsMetadata[slug] || {
    title: 'Shiveshwar Textiles | Product Detail',
    description: 'Premium quality wholesale fabric and custom textile manufacturing directly from our advanced mill infrastructure.',
  };

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
    },
  };
}

export default function Page({ params }: Props) {
  return <ProductDetailPage params={params} />;
}
