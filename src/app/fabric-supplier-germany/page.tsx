import type { Metadata } from 'next';
import GermanyLandingClient from './GermanyLandingClient';

export const metadata: Metadata = {
  title: 'Fabric Supplier & Textile Manufacturer for Germany & Europe | Shiveshwar Textiles',
  description: 'Premium Indian fabric manufacturer exporting high-quality cotton, polyester, and blended fabrics directly to Germany and Europe. Custom GSM, certifications support, flexible MOQs, and reliable ocean/air logistics.',
  alternates: {
    canonical: '/fabric-supplier-germany',
  },
};

export default function GermanyLandingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://shiveshwartextiles.com/#organization',
        'name': 'Shiveshwar Textiles',
        'url': 'https://shiveshwartextiles.com',
        'logo': 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+919316189146',
          'contactType': 'export sales',
          'areaServed': ['DE', 'EU'],
          'availableLanguage': ['en', 'de']
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://shiveshwartextiles.com/fabric-supplier-germany/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Do you export to Germany?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, Shiveshwar Textiles exports fabrics directly under Ex-Works (EXW) and FOB terms. We handle all custom export documentation including Certificate of Origin.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is your MOQ for German and European buyers?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Our standard MOQ starts at 500 meters per color/spec for stock developments and 1000-1500 meters for custom fabrications.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What quality assurance do you provide?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We provide comprehensive test sheets for GSM & shrinkage, and we work with OEKO-TEX Standard 100 certified yarns for compliance with market regulations.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How fast is sampling?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We prepare and dispatch fabric swatches, lab dips, and custom handlooms within 20 days.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Do you support bulk manufacturing?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, our mill has a monthly capacity exceeding 1 million meters, allowing us to support small sample lines up to continuous monthly container orders.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GermanyLandingClient />
    </>
  );
}
