import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const siteUrl = 'https://global-finance-dashboard.vercel.app';

    const title = t('app.title');
    const description = currentLang === 'en'
        ? 'Calculate your future wealth with our Dividend Compound and Digital Asset Profit calculators. Optimize your investment strategy today.'
        : '배당금 복리 계산기와 디지털 자산 수익률 계산기로 당신의 부를 설계하세요. 최적의 투자 전략을 세워보세요.';

    return (
        <Helmet>
            <html lang={currentLang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#0f172a" />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}/og-image.png`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />

            <link rel="canonical" href={siteUrl} />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Global Finance Dashboard",
                    "description": description,
                    "applicationCategory": "FinanceApplication",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                })}
            </script>
        </Helmet>
    );
}
