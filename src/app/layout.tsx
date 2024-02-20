import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Quiz",
  description: "React Quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-full !min-h-screen  flex-col justify-center`}
      >
        <Header />
        <main className="flex-1 flex flex-col max-w-screen-2xl mx-auto w-full justify-center items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
