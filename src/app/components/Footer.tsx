"use client";

import React from "react";
import BackToTopButton from "./BackToTopButton";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-brand-dark text-white border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Logo and Mission Statement */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo theme="dark" />
              </div>
              <p className="text-gray-400 max-w-md">
                Your strategic partner in architecting, building, and securing
                the technology foundations that drive business growth.
              </p>
            </div>

            {/* Navigation and Social Links */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">
                  Navigate
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#services"
                      className="text-gray-400 hover:text-brand-teal transition-colors"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#case-studies"
                      className="text-gray-400 hover:text-brand-teal transition-colors"
                    >
                      Success Stories
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-400 hover:text-brand-teal transition-colors"
                    >
                      Insights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-400 hover:text-brand-teal transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:contact@crok4it.com"
                      className="text-gray-400 hover:text-brand-teal transition-colors"
                    >
                      Email Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+352288008"
                      className="text-gray-400 hover:text-brand-teal transition-colors"
                    >
                      Call Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#contact"
                      className="text-gray-400 hover:text-brand-teal transition-colors"
                    >
                      Get in Touch
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-brand-purple transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-brand-purple transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.065.084.616 1.923 2.441 3.282 4.545 3.319-1.853 1.44-4.138 2.16-6.553 1.832 2.023 1.304 4.433 2.064 6.993 2.064 8.36 0 12.932-6.926 12.932-12.933 0-.197-.005-.393-.014-.587.887-.64 1.657-1.442 2.278-2.357z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Crok4IT. All Rights Reserved. |
              Luxembourg
            </p>
          </div>
        </div>
      </footer>
      <BackToTopButton />
    </>
  );
};

export default Footer;
