import Head from 'next/head';
import React from 'react';
import { metaI18n } from '../../i18n';

const Meta: React.FunctionComponent = () => {
  return (
    <Head>
      <title>{metaI18n.title}</title>
      <meta name="description" content={metaI18n.description} />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
      {/* TODO review when cors issue fixed */}
      <link rel="manifest" crossOrigin="use-credentials" href="/manifest.json" /> {/* next-pwa START */}
      <meta name="application-name" content={metaI18n.title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={metaI18n.title} />
      <meta name="description" content={metaI18n.description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico" />
      {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" />*/}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={metaI18n.url} />
      <meta name="twitter:title" content={metaI18n.title} />
      <meta name="twitter:description" content={metaI18n.description} />
      <meta name="twitter:image" content={`${metaI18n.url}/icons/android-chrome-192x192.png`} />
      <meta name="twitter:creator" content="@Stavros" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaI18n.title} />
      <meta property="og:description" content={metaI18n.description} />
      <meta property="og:site_name" content={metaI18n.title} />
      <meta property="og:url" content={metaI18n.url} />
      <meta property="og:image" content={`${metaI18n.url}/icons/apple-touch-icon.png`} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      {/* next-pwa END */}
      {/* pwa-asset-generated START */}
      <link rel="icon" type="image/png" sizes="196x196" href="./app_icons/favicon-196.png" />
      <link rel="apple-touch-icon" href="./app_icons/apple-icon-180.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2048-2732.jpg"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2732-2048.jpg"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1668-2388.jpg"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2388-1668.jpg"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1536-2048.jpg"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2048-1536.jpg"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1488-2266.jpg"
        media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2266-1488.jpg"
        media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1640-2360.jpg"
        media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2360-1640.jpg"
        media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1668-2224.jpg"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2224-1668.jpg"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1620-2160.jpg"
        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2160-1620.jpg"
        media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1290-2796.jpg"
        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2796-1290.jpg"
        media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1179-2556.jpg"
        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2556-1179.jpg"
        media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1284-2778.jpg"
        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2778-1284.jpg"
        media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1170-2532.jpg"
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2532-1170.jpg"
        media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1125-2436.jpg"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2436-1125.jpg"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1242-2688.jpg"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2688-1242.jpg"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-828-1792.jpg"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1792-828.jpg"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1242-2208.jpg"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-2208-1242.jpg"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-750-1334.jpg"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1334-750.jpg"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-640-1136.jpg"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        href="./app_icons/apple-splash-1136-640.jpg"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      />
      {/* pwa-asset-generated END */}
    </Head>
  );
};
Meta.whyDidYouRender = true;
export default Meta;
