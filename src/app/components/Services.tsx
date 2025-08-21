/* ─────────────────────────  Services.tsx  ───────────────────────── */
"use client";

import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

/* ── service data (unchanged text, brand SVG icons) ───────── */
const services = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    title: "IT Audit & Consulting",
    description:
      "We provide a clear roadmap for success by analyzing your IT infrastructure to identify weaknesses and unlock opportunities for improvement.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "Application Development",
    description:
      "From concept to launch, we build custom, scalable, and secure applications that are perfectly tailored to your business needs.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Cybersecurity Solutions",
    description:
      "Protect your digital assets with our comprehensive cybersecurity services, from vulnerability assessments to incident response.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
    title: "IT Training",
    description:
      "Empower your team with the latest technology skills through our customized training programs and hands-on workshops.",
  },
];

/* ── motion variants ───────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Services: React.FC = () => {
  /* Reveal once when grid enters the viewport */
  const gridRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section
      id="services"
      className="w-full bg-brand-dark py-20 md:py-28 text-white"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Our Core Capabilities
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            We provide a comprehensive suite of services designed to address
            your most critical IT challenges and drive business growth.
          </p>
        </div>

        {/* Service grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map(({ icon, title, description }, i) => (
            <motion.article
              key={title}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: i * 0.12 }} /* 120 ms stagger */
              whileHover={{
                rotateX: -4,
                rotateY: 4,
                scale: 1.04,
                transition: { type: "spring", stiffness: 250, damping: 18 },
              }}
              className="group rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm
                         transition-transform duration-300 will-change-transform"
            >
              <div className="mb-6 text-brand-teal">{icon}</div>
              <h3 className="mb-3 text-2xl font-bold">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
