import "./globals.css";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from 'next/script'

const GTM_ID = 'GTM-NRTCMXXT'

const aeonikPro = localFont({
  src: "../assets/fonts/AeonikProTRIAL-Regular.otf",
  variable: "--font-aeonik",
  weight: "100 900",
  display: "swap",
});

const aeonikMediumPro = localFont({
  src: "../assets/fonts/Aeonik-Medium.ttf",
  variable: "--font-aeonik-medium",
  weight: "100 900",
  display: "swap",
});


const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});



const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const verah = localFont({
  src: [
    {
      path: "../../public/fonts/Verah___.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Verahb__.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-verah",
})

const gotham = localFont({
  src: [
    {
      path: "../../public/fonts/icielgothammediumregular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/iCielGothamBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/icielgothamultraregular.otf",
      weight: "900",
      style: "normal",
    },

  ],
  variable: "--font-gotham",
})

export const metadata = {
  title: {
    default: "Invent Elevator | Premium Vertical Mobility",
    template: "%s | Invent Elevator",
  },
  description:
    "Invent Elevator designs, installs, and supports premium residential and commercial lift systems with modern digital service experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${aeonikPro.variable} ${montserrat.variable} ${gotham.variable} ${verah.variable} ${aeonikMediumPro.variable}`}>
      <head>
        {/* GTM Added */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body>
      {/* GTM NoScript Fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#102239",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
