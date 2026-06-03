import type { Metadata } from 'next';
import AboutPage from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Shiveshwar Textiles, our manufacturing capabilities, production infrastructure, quality standards, and commitment to textile excellence.',
  openGraph: {
    title: 'Shiveshwar Textiles | About Us',
    description: 'Learn about Shiveshwar Textiles, our manufacturing capabilities, production infrastructure, quality standards, and commitment to textile excellence.',
    url: 'https://shiveshwartextiles.com/about',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shiveshwar Textiles - About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiveshwar Textiles | About Us',
    description: 'Learn about Shiveshwar Textiles, our manufacturing capabilities, production infrastructure, quality standards, and commitment to textile excellence.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <AboutPage />;
}
