"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  theme?: "dark" | "light";
}

const Logo: React.FC<LogoProps> = ({ theme = "dark" }) => {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      {/* This SVG is a simplified, code-based version of your logo */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        <path d="M75.2 128V90.8L112.3 53.7V90.8L75.2 128Z" fill="#6C22D9" />
        <path d="M52.8 0V37.2L15.7 74.3V37.2L52.8 0Z" fill="#6C22D9" />
        <path d="M64 42.1L21.9 0H90.2L64 25.6V42.1Z" fill="#4ADBC8" />
        <path d="M64 85.9L106.1 128H37.8L64 102.4V85.9Z" fill="#4ADBC8" />
      </svg>
      <span
        className={`text-2xl font-bold transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-purple-700"
        }`}
      >
        CROK
        <span
          className={`${theme === "dark" ? "text-white" : "text-teal-400"}`}
        >
          4IT
        </span>
      </span>
    </Link>
  );
};

export default Logo;
