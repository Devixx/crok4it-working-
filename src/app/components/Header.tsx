/* ─────────────────────────  Header.tsx  ───────────────────────── */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

/*
  Tailwind prerequisites:
  • text-brand-dark   → dark gray / black (#141414 or similar)
  • text-brand-teal   → #4ADBC8
  • bg-brand-purple   → #6C22D9
*/

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll(); // initialise once
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* smooth-scroll helper */
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId?: string
  ) => {
    if (targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  /* classes */
  const linkColour = isScrolled ? "text-black" : "text-white";

  const navLink = `
  relative text-lg font-medium ${linkColour}
  transition-colors duration-300 group
  hover:text-brand-teal
`.trim();

  const iconStroke = isScrolled ? "brand-dark" : "text-white";
  const headerBg = isScrolled
    ? "bg-white/90 backdrop-blur shadow-md"
    : "bg-transparent";

  /* JSX */
  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${headerBg}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* logo swaps theme */}
        <Logo theme={isScrolled ? "light" : "dark"} />

        {/* desktop navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href="/#services"
            className={navLink}
            onClick={(e) => handleLinkClick(e, "services")}
          >
            Services
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-teal transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/#case-studies"
            className={navLink}
            onClick={(e) => handleLinkClick(e, "case-studies")}
          >
            Success&nbsp;Stories
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-teal transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link href="/blog" className={navLink}>
            Insights
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-teal transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link href="/careers" className={navLink}>
            Careers
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-teal transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className={navLink}
          >
            Contact&nbsp;Us
          </Link>
        </nav>

        {/* hamburger */}
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 ${iconStroke}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <nav className="absolute top-full left-0 flex w-full flex-col items-center space-y-6 bg-white p-6 shadow-lg md:hidden">
          <Link
            href="/#services"
            className="text-lg text-brand-dark transition-colors hover:text-brand-teal"
            onClick={(e) => handleLinkClick(e, "services")}
          >
            Our&nbsp;Services
          </Link>
          <Link
            href="/#case-studies"
            className="text-lg text-brand-dark transition-colors hover:text-brand-teal"
            onClick={(e) => handleLinkClick(e, "case-studies")}
          >
            Success&nbsp;Stories
          </Link>
          <Link
            href="/blog"
            className="text-lg text-brand-dark transition-colors hover:text-brand-teal"
            onClick={(e) => handleLinkClick(e)}
          >
            Insights
          </Link>
          <Link
            href="/careers"
            className="text-lg text-brand-dark transition-colors hover:text-brand-teal"
            onClick={(e) => handleLinkClick(e)}
          >
            Careers
          </Link>
          <Link
            href="/#contact"
            className="w-full rounded-md bg-brand-purple px-6 py-3 text-center text-lg text-white transition-colors hover:bg-brand-purple/90"
            onClick={(e) => handleLinkClick(e, "contact")}
          >
            Contact&nbsp;Us
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
