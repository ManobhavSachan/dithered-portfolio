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
      <head>
        <link
          rel="icon"
          href="/dino-light-favicon/favicon.ico"
          sizes="any"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/dino-dark-favicon/favicon.ico"
          sizes="any"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/dino-light-favicon/favicon-32x32.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/dino-dark-favicon/favicon-32x32.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/dino-light-favicon/favicon-16x16.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/dino-dark-favicon/favicon-16x16.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/dino-light-favicon/apple-touch-icon.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/dino-dark-favicon/apple-touch-icon.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="manifest"
          href="/dino-light-favicon/site.webmanifest"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="manifest"
          href="/dino-dark-favicon/site.webmanifest"
          media="(prefers-color-scheme: dark)"
        />
      </head>
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
