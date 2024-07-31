import type { Metadata } from 'next';
import { inter } from './fonts';
import './css/normalize.css';
import './css/webflow.css';
import './css/globals.css';
import Script from 'next/script';
import { Web3Provider } from './web3-context';
import { NFTProvider } from './nft-context';
import Head from 'next/head';
import { isProduction } from './lib/PathMap';
import { GlobalMsgProvider } from './global-msg-context';
import GlobalActionTip from './global-action-tip';

export const metadata = {
  title: {
    template: '%s | Many',
    default: 'Many',
  },
  description: '',
  metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  openGraph: {
    title: 'Many',
    description: '',
    url: `https://${process.env.VERCEL_DOMAIN}`,
    siteName: 'Many',
    images: '/images/GGzCP6QaAAAm9YG.png',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/images/favs/favicon-32x32.png' }, { url: '/images/favs/favicon-16x16.png', sizes: '16x16', type: 'image/png' }],
    shortcut: '/images/shortcut-icon.png',
    apple: [
      { url: '/images/favs/apple-touch-icon.png' },
      {
        url: '/images/favs/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/favs/apple-touch-icon-precomposed.png',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Many',
    description: '',
    creator: '@Many',
    images: ['/images/GGzCP6QaAAAm9YG.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>{!isProduction ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}</Head>
      <body className={`${inter.variable}`}>
        <GlobalMsgProvider>
          <Web3Provider>
            <NFTProvider>{children}</NFTProvider>
          </Web3Provider>
          <GlobalActionTip />
        </GlobalMsgProvider>
      </body>
    </html>
  );
}
