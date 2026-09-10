import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://koffi-cobbin.web.app';
const SITE_NAME = 'Koffi Cobbin';
const DEFAULT_IMAGE = `${SITE_URL}/images/koffi_cobbin.png`;
const TWITTER_HANDLE = '@koffi_cobbin';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: Record<string, unknown>;
}

export default function SEO({
  title,
  description = 'Building ruthless survival-grade systems across hardware, software, impact and pushing products to the edge of physics, efficiency, and economics.',
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Entrepreneur · Engineer · Builder`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${fullTitle} preview image`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${fullTitle} preview image`} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
