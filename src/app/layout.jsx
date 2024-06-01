"use client";

import { Inter } from "next/font/google";
import SideMenu from "@/components/SideMenu";
import GeneralHeader from "@/components/GeneralHeader";
import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";
import {
  BottomNavProvider,
  BottomNavContext,
} from "@/contexts/BottomNavContext";
import { useContext, useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <BottomNavProvider>
      <html lang="en">
        <body>
          <div className="pages-wrapper">
            <Pages>{children}</Pages>
          </div>
        </body>
      </html>
    </BottomNavProvider>
  );
}

function Pages({ children }) {
  const [viewportWidth, setViewportWidth] = useState(null);

  useEffect(() => {
    setViewportWidth(window.innerWidth);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { hideBottomNav } = useContext(BottomNavContext);

  const style = {};

  const pagesStyle = hideBottomNav
    ? viewportWidth > 1000
      ? {}
      : {
          gridTemplateAreas: '"generalHeader generalHeader" "pageRight pageRight" "pageRight pageRight"',
        }
    : viewportWidth > 768
    ? {}
    : {};

  return (
    <div className="pages" style={pagesStyle}>
      <SideMenu />
      <div className="page-right">{children}</div>
      <GeneralHeader />
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
}

// export const metadata = {
//   title: "Edvantage",
//   description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
//   metadataBase: new URL('https://BUESALibrary.com'),
//   // Open Graph for social media sharing
//   openGraph: {
//     url: ".",
//     title: "Edvantage - Your go-to Organiser",
//     description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
//     siteName: "BUESA Library",
//     images: [
//       {
//         url: "./Images/Logo.png",
//         width: 800,
//         height: 600,
//       },
//     ],
//   },
//   // Twitter card specifically
//   twitter: {
//     card: "summary_large_image",
//     site: "@Edvantage",
//     title: "Edvantage - Your go-to Organiser",
//     description: "A platform college students to organise, manage their time effectively and gain access relevant educational materials.",
//     imageUrl: "./images/Logo.png",
//   },
//   // Favicon and other optional general metadata
//   icon: './Images/Logo.png', // Replace with your favicon path relative to your project root
//   manifest: './manifest.json'
// };
