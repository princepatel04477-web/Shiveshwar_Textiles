import type { Metadata } from 'next';
import HomePage from './HomeClient';

export const metadata: Metadata = {
  title: 'Premium Textile Manufacturing',
  description: 'Shiveshwar Textiles is a textile manufacturing company based in Surat, Gujarat, specializing in cotton fabrics, polyester fabrics, blended fabrics, custom weaving, and large-scale textile production.',
  openGraph: {
    title: 'Shiveshwar Textiles | Premium Textile Manufacturing',
    description: 'Shiveshwar Textiles is a textile manufacturing company based in Surat, Gujarat, specializing in cotton fabrics, polyester fabrics, blended fabrics, custom weaving, and large-scale textile production.',
    url: 'https://shiveshwartextiles.com',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shiveshwar Textiles - Premium Textile Manufacturing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiveshwar Textiles | Premium Textile Manufacturing',
    description: 'Shiveshwar Textiles is a textile manufacturing company based in Surat, Gujarat, specializing in cotton fabrics, polyester fabrics, blended fabrics, custom weaving, and large-scale textile production.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <HomePage />;
}
