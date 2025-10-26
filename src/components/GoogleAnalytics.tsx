import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams]);

  // Only load GA in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    console.warn('Google Analytics ID not configured');
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `,
        }}
      />
      {/* Google Ads Conversion Tracking */}
      {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
            `,
          }}
        />
      )}
    </>
  );
}

