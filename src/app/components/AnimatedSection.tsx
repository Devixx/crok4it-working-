"use client";

import React from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // The animation will only happen once
    threshold: 0.1, // The element is considered "in view" when 10% of it is visible
  });

  return (
    <div
      ref={ref}
      className={`${className} fade-in-section ${inView ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
