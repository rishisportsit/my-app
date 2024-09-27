import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import "@/styles/index.scss";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
