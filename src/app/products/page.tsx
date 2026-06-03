import type { Metadata } from 'next';
import ProductsPage from './ProductsClient';

export const metadata: Metadata = {
  title: 'Fabric Catalogue',
  description: 'Explore cotton fabrics, polyester fabrics, blended fabrics, and custom textile manufacturing solutions designed for wholesale buyers and industrial applications.',
  openGraph: {
    title: 'Shiveshwar Textiles | Fabric Catalogue',
    description: 'Explore cotton fabrics, polyester fabrics, blended fabrics, and custom textile manufacturing solutions designed for wholesale buyers and industrial applications.',
    url: 'https://shiveshwartextiles.com/products',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shiveshwar Textiles - Fabric Catalogue',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiveshwar Textiles | Fabric Catalogue',
    description: 'Explore cotton fabrics, polyester fabrics, blended fabrics, and custom textile manufacturing solutions designed for wholesale buyers and industrial applications.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ProductsPage />;
}
