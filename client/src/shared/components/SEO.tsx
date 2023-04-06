import { Helmet } from 'react-helmet-async';
import defaultCover from '/cover.png';
import { APP_NAME, APP_URL, TWITTER_ACCOUNT } from '@/App/constants/env';

type SEOProps = {
  url?: string;
  title?: string;
  description?: string;
  cover?: string;
};

const SEO = ({ url, title = 'Opus', description = 'Project management platform', cover }: SEOProps) => {
  return (
    <Helmet>
      {/* TODO: Add structured data <script type="application/ld+json">{structuredData}</script> */}
      {title && (
        <title>
          {APP_NAME} | {title}
        </title>
      )}
      <meta name="description" content={description} />
      <meta property="og:title" content={title || APP_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${APP_URL}${url}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={TWITTER_ACCOUNT || ''} />
      <meta name="twitter:url" content={`${APP_URL}${url}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="image" content={cover || defaultCover} />
      <meta property="og:image" content={cover || defaultCover} />
      <meta name="twitter:image:src" content={cover ? `${APP_URL}/${cover}` : defaultCover} />
    </Helmet>
  );
};

export default SEO;
