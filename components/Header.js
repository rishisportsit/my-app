"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gallery from "@/utils/gallery";

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/about", label: "about" },
    { href: "/portfolio", label: "portfolio" },
    { href: "/blog", label: "blog" },
    { href: "/contact", label: "contact" },
  ];

  const socialLinks = [
    {
      href: "https://x.com/home",
      logo: gallery.logos.twitterLogo,
      alt: "Twitter",
    },
    {
      href: "https://www.linkedin.com/in/rishi-varma-669219282/",
      logo: gallery.logos.linkedinLogo,
      alt: "LinkedIn",
    },
    {
      href: "https://facebook.com",
      logo: gallery.logos.facebookLogo,
      alt: "Facebook",
    },
    {
      href: "https://instagram.com",
      logo: gallery.logos.instagramLogo,
      alt: "Instagram",
    },
  ];

  return (
    <>
      <div className="header_container">
        <header className="header">
          <div className="header-logo">
            <Link href="/">
              <Image
                src={gallery.logos.mainLogo}
                className="logo-img"
                alt="Main Logo"
              />
            </Link>
          </div>
          <nav className="navLinks">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`navLink ${pathname === href ? "active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="socialLinks">
            {socialLinks.map(({ href, logo, alt }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image className="img_hover" src={logo} alt={alt} />
              </Link>
            ))}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
