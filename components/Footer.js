"use client";
import MyIcons from "@/public/assests/svg/MyIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Footer = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/about", label: "about" },
    { href: "/portfolio", label: "portfolio" },
    { href: "/blog", label: "blog" },
    { href: "/contact", label: "contact" },
  ];

  function handleTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="footer_head">
      <div className="backToTop">
        <div className="arrow" onClick={handleTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            className="svgarrow"
          >
            <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
          </svg>
        </div>
      </div>
      <div className="footer_wrapper">
        <div className="footer_content">
          <div className="port_name">
            <span className="port_span">© 2024 Rishi Varma</span>
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
        </div>
      </div>
    </div>
  );
};

export default Footer;
