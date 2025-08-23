/* ─────────────────────────  Header.tsx  ───────────────────────── */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Logo from "./Logo";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Handle hash navigation from any page */
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === "/") {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname]);

  /* Universal navigation handler for sections */
  const handleSectionNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    if (pathname === "/") {
      // Already on home page, smooth scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page with hash
      router.push(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  /* Regular page navigation */
  const handlePageNavigation = () => {
    setIsMenuOpen(false);
  };

  /* classes */
  const linkColour = isScrolled ? "text-black" : "text-white";
  const navLink = `relative text-lg font-medium ${linkColour} transition-colors duration-300 group hover:text-brand-teal`;
  const iconStroke = isScrolled ? "text-black" : "text-white";
  const headerBg = isScrolled
    ? "bg-white/90 backdrop-blur shadow-md"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${headerBg}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* logo - handles its own navigation internally */}
        <Logo theme={isScrolled ? "light" : "dark"} />

        {/* desktop navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <a
            href="/#services"
            onClick={(e) => handleSectionNavigation(e, "services")}
            className={navLink}
          >
            Services
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
          </a>

          {/* SUCCESS STORIES - Navigate to separate page */}
          <Link
            href="/case-studies"
            className={navLink}
            onClick={handlePageNavigation}
          >
            Success&nbsp;Stories
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link href="/blog" className={navLink} onClick={handlePageNavigation}>
            Insights
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/careers"
            className={navLink}
            onClick={handlePageNavigation}
          >
            Careers
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <a
            href="/#contact"
            onClick={(e) => handleSectionNavigation(e, "contact")}
            className="rounded-md bg-purple-700 px-5 py-2 font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-purple-700/90"
          >
            Contact&nbsp;Us
          </a>
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
          <a
            href="/#services"
            onClick={(e) => handleSectionNavigation(e, "services")}
            className="text-lg text-black transition-colors hover:text-brand-teal"
          >
            Our&nbsp;Services
          </a>

          {/* SUCCESS STORIES - Mobile version */}
          <Link
            href="/case-studies"
            className="text-lg text-black transition-colors hover:text-brand-teal"
            onClick={handlePageNavigation}
          >
            Success&nbsp;Stories
          </Link>

          <Link
            href="/blog"
            className="text-lg text-black transition-colors hover:text-brand-teal"
            onClick={handlePageNavigation}
          >
            Insights
          </Link>

          <Link
            href="/careers"
            className="text-lg text-black transition-colors hover:text-brand-teal"
            onClick={handlePageNavigation}
          >
            Careers
          </Link>

          <a
            href="/#contact"
            onClick={(e) => handleSectionNavigation(e, "contact")}
            className="w-full rounded-md bg-purple-700 px-6 py-3 text-center text-lg text-white transition-colors hover:bg-purple-700/90"
          >
            Contact&nbsp;Us
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
