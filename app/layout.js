import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import "@/styles/index.scss";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
  port: 1423
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="wrapper">
            <Header />
            <div className="children">{children}</div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
