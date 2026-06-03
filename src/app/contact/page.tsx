import type { Metadata } from 'next';
import ContactPage from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Shiveshwar Textiles for fabric manufacturing inquiries, custom weaving requirements, wholesale textile orders, and business partnerships.',
  openGraph: {
    title: 'Shiveshwar Textiles | Contact Us',
    description: 'Contact Shiveshwar Textiles for fabric manufacturing inquiries, custom weaving requirements, wholesale textile orders, and business partnerships.',
    url: 'https://shiveshwartextiles.com/contact',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shiveshwar Textiles - Contact Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiveshwar Textiles | Contact Us',
    description: 'Contact Shiveshwar Textiles for fabric manufacturing inquiries, custom weaving requirements, wholesale textile orders, and business partnerships.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ContactPage />;
}
