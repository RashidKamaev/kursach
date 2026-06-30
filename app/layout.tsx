import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Header, Footer } from "@/components/site";
const inter = Inter({ subsets:["latin","cyrillic"], variable:"--font-sans" });
const playfair = Playfair_Display({ subsets:["latin","cyrillic"], variable:"--font-serif" });
export const metadata: Metadata = { title: { default:"Cosmetos — красота рядом", template:"%s · Cosmetos" }, description:"Поиск мастеров и салонов красоты с онлайн-записью" };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ru"><body className={`${inter.variable} ${playfair.variable} font-sans`}><Header/><main className="min-h-[70vh]">{children}</main><Footer/><Toaster richColors position="top-center"/></body></html>;
}
