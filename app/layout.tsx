import type { Metadata } from 'next';
import { NbArchitekt } from './fonts';
import './css/normalize.css';
import './css/webflow.css';
import './css/globals.css';
import Script from 'next/script';
import { Web3Provider } from './web3-context';

export const metadata: Metadata = {
  title: 'Many',
  description: 'Many Site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={NbArchitekt.variable}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
