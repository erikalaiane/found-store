import type { Metadata } from "next";
import {
  Abril_Fatface,
  Bebas_Neue,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ToastProvider } from "@/components/ui/ToastProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});
const abril = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: "400",
});
const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Found Store",
  description: "Moda, tecnologia, casa e beleza com identidade própria.",
};

const themeScript = `try{if(localStorage.getItem("theme")==="light"){document.documentElement.dataset.theme="light"}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${bebas.variable} ${abril.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ToastProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}