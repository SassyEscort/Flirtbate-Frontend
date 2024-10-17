/* eslint-disable @next/next/no-img-element */
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ProviderWrapper from './ProviderWrapper';
import { SEO_DATA } from 'constants/seoConstants';
import Script from 'next/script';
import Head from 'next/head';
// import '../app/globals.scss';

const AuthFeaturProvider = React.lazy(() => import('../../context/AuthContext').then((module) => ({ default: module.AuthFeaturProvider })));
const TawkProvider = React.lazy(() => import('../../context/TawkContext').then((module) => ({ default: module.TawkProvider })));

export const metadata: Metadata = {
  title: SEO_DATA.TITLE,
  description: SEO_DATA.DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: JSX.Element;
}>) {
  const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="robots" content="index, follow" />
        <link rel="preload" as="image" href="/images/home/home-banner-model1.webp" />
      </Head>
      <Script
        async
        id="gtag-script"
        type="text/javascript"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16620775104/u-m-CLqVyb0ZEMDNs_U9',
                  'event_callback': callback
              });
              return false;
            }`
        }}
      />
      {isProduction && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
          <Script
            async
            id="dataLayer-script"
            type="text/javascript"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `
            }}
          />
        </>
      )}
      <body>
        {/* <Script
          defer
          id="clarity-script"
          type="text/javascript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "mxxnph7kub");`
          }}
        /> */}
        {/* <Script
          async
          id="gtag-script"
          type="text/javascript"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16620775104/u-m-CLqVyb0ZEMDNs_U9',
                  'event_callback': callback
              });
              return false;
            }`
          }}
        />
        {isProduction && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
            <Script
              async
              id="dataLayer-script"
              type="text/javascript"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `
              }}
            />
          </>
        )} */}
        <ProviderWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthFeaturProvider>
              <TawkProvider>{children}</TawkProvider>
            </AuthFeaturProvider>
          </Suspense>
        </ProviderWrapper>
      </body>
    </html>
  );
}
