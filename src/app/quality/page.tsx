import type { Metadata } from 'next';
import QualityPage from './QualityClient';

export const metadata: Metadata = {
  title: 'Quality Assurance',
  description: 'Discover our quality control processes, fabric inspection standards, GSM monitoring, and manufacturing systems that ensure consistent textile quality.',
  openGraph: {
    title: 'Shiveshwar Textiles | Quality Assurance',
    description: 'Discover our quality control processes, fabric inspection standards, GSM monitoring, and manufacturing systems that ensure consistent textile quality.',
    url: 'https://shiveshwartextiles.com/quality',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shiveshwar Textiles - Quality Assurance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiveshwar Textiles | Quality Assurance',
    description: 'Discover our quality control processes, fabric inspection standards, GSM monitoring, and manufacturing systems that ensure consistent textile quality.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <QualityPage />;
}
