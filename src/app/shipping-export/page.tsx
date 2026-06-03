import type { Metadata } from 'next';
import ShippingExportPage from './ShippingExportClient';

export const metadata: Metadata = {
  title: 'Shipping & Export',
  description: 'Learn about our production workflow, documentation process, FOB shipping arrangements, and textile order fulfillment systems.',
  openGraph: {
    title: 'Shiveshwar Textiles | Shipping & Export',
    description: 'Learn about our production workflow, documentation process, FOB shipping arrangements, and textile order fulfillment systems.',
    url: 'https://shiveshwartextiles.com/shipping-export',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shiveshwar Textiles - Shipping & Export',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiveshwar Textiles | Shipping & Export',
    description: 'Learn about our production workflow, documentation process, FOB shipping arrangements, and textile order fulfillment systems.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ShippingExportPage />;
}
