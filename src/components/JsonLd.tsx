import { SiteSettings } from '@/lib/cms/database';

interface JsonLdProps {
    settings: SiteSettings;
}

export default function JsonLd({ settings }: JsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://rhcsolutions.com/#organization',
                name: settings.siteName,
                url: 'https://rhcsolutions.com',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://rhcsolutions.com/logo.png',
                    width: 512,
                    height: 512,
                    caption: settings.siteName
                },
                image: {
                    '@id': 'https://rhcsolutions.com/#logo'
                },
                sameAs: settings.footer.socialLinks?.map(link => link.url) || [],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: settings.contact.phone,
                    contactType: 'customer service',
                    email: settings.contact.email,
                    areaServed: 'Worldwide',
                    availableLanguage: ['en']
                }
            },
            {
                '@type': 'WebSite',
                '@id': 'https://rhcsolutions.com/#website',
                url: 'https://rhcsolutions.com',
                name: settings.siteName,
                description: settings.tagline,
                publisher: {
                    '@id': 'https://rhcsolutions.com/#organization'
                },
                inLanguage: 'en-US'
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
