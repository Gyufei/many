import { Inter_Tight } from 'next/font/google'
import localFont from "next/font/local";

export const inter = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
})

export const NbArchitekt = localFont({
  src: [
    {
      path: "../public/fonts/nb_architekt_light-webfont.baf952ea.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/nb_architekt_regular-webfont.dc17dc5f.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nb_architekt_bold-webfont.ddb6111d.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-video",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Segoe UI",
    "Ubuntu",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});
