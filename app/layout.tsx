import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import FlickeringGrid from "./components/FlickeringGrid";

const geistSans = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[110px] overflow-hidden">
          <FlickeringGrid
            className="h-full w-full [mask-image:linear-gradient(to_bottom,black,black_45%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_45%,transparent)]"
            squareSize={2}
            gridGap={2}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
