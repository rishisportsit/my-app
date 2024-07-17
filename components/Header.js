"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gallery from "@/utils/gallery";

const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link
            href="/"
            // className={`navLink ${pathname === "/" ? "active" : ""}`} 
          >
            <Image src={gallery.logos.mainLogo} className="logo-img" />
          </Link>
        </div>
        <div className="navLinks">
          <Link
            href="/about"
            className={`navLink ${pathname === "/about" ? "active" : ""}`}
          >
            about
          </Link>
          <Link
            href="/portfolio"
            className={`navLink ${pathname === "/portfolio" ? "active" : ""}`}
          >
            portfolio
          </Link>
          <Link
            href="/blog"
            className={`navLink ${pathname === "/blog" ? "active" : ""}`}
          >
            blog
          </Link>
          <Link
            href="/contact"
            className={`navLink ${pathname === "/contact" ? "active" : ""}`}
          >
            contact
          </Link>
        </div>
        <div className="socialLinks">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="img_hover"
              src={gallery.logos.twitterLogo}
              alt="Twitter"
            />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="img_hover"
              src={gallery.logos.linkedinLogo}
              alt="LinkedIn"
            />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="img_hover"
              src={gallery.logos.facebookLogo}
              alt="Facebook"
            />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="img_hover"
              src={gallery.logos.instagramLogo}
              alt="Instagram"
            />
          </Link>
        </div>
      </header>
      <footer className="footer"></footer>
    </>
  );
};

export default Header;
