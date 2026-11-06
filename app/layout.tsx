import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import Header, { HeaderFallback } from "./components/Header";
import "./globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dongbaek-website.vercel.app"),
  title: "bLOOM | 너의 방식대로 피어나",
  description: "동백마을과 A2O Lite의 만남. 꽃과 씨앗, 오일에서 시작되는 bLOOM의 이야기를 만나보세요.",
  openGraph: {
    title: "bLOOM | 너의 방식대로 피어나",
    description: "동백마을과 A2O Lite의 만남. 꽃과 씨앗, 오일에서 시작되는 bLOOM의 이야기를 만나보세요.",
    siteName: "bLOOM 동백마을",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bLOOM | 너의 방식대로 피어나",
    description: "동백마을과 A2O Lite의 만남. 꽃과 씨앗, 오일에서 시작되는 bLOOM의 이야기를 만나보세요.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<HeaderFallback />}><Header /></Suspense>
        {children}
      </body>
    </html>
  );
}
