/* ─────────────────────────  Testimonials.tsx  ───────────────────────── */
"use client";

import React from "react";
import { motion, AnimatePresence, wrap } from "framer-motion";

/* ── data ────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Crok4IT's expertise in cloud architecture was a game-changer for our business. Their solution cut our infrastructure costs by 30 %.",
    name: "Marc Schmit",
    title: "CTO, FinTech Innovators S.A.",
    imageUrl: "https://placehold.co/100x100/6C22D9/ffffff?text=MS",
  },
  {
    quote:
      "The application they built streamlined our logistics. We’ve seen a 50 % jump in operational efficiency—phenomenal.",
    name: "Sophie Muller",
    title: "Head of Operations, LuxLogistics",
    imageUrl: "https://placehold.co/100x100/4ADBC8/ffffff?text=SM",
  },
  {
    quote:
      "Navigating cybersecurity is daunting. Crok4IT delivered a clear roadmap and robust defences that let us sleep at night.",
    name: "Paul Weber",
    title: "CEO, Weber & Fils",
    imageUrl: "https://placehold.co/100x100/1a202c/ffffff?text=PW",
  },
];

/* ── animation logic ─────────────────────────────────────────── */
const swipeConfidence = 80; // px needed to trigger swipe
const swipePower = (o: number, v: number) => Math.abs(o) * v;

/* variants for sliding card */
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 0.8, 0.35, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.5 },
  }),
};

const Testimonials: React.FC = () => {
  const [[page, dir], setPage] = React.useState<[number, number]>([0, 0]);
  const idx = wrap(0, testimonials.length, page); // wrap for continuity

  /* autoplay */
  React.useEffect(() => {
    const id = setInterval(() => paginate(1), 6500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const paginate = (d: number) => setPage([page + d, d]);

  /* current testimonial data */
  const { imageUrl, quote, name, title } = testimonials[idx];

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-brand-dark py-24 text-white"
    >
      {/* background blur accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-purple-700/15 blur-[160px]"
      />

      <div className="container mx-auto px-4">
        {/* heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            What&nbsp;Our&nbsp;Clients&nbsp;Say
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            Straight from Luxembourg’s boldest teams.
          </p>
        </div>

        {/* quote card */}
        <div className="relative mx-auto max-w-3xl">
          {/* decorative big quote */}
          <svg
            className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 text-brand-purple/25"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M9.33 2C4.7 2 1 5.7 1 10.33c0 4.64 3.7 8.34 8.33 8.34V22c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H9.33C6.9 19 5 16.54 5 13.66c0-2.39 1.94-4.33 4.33-4.33.55 0 1-.45 1-1V3c0-.55-.45-1-1-1M22.33 2C17.7 2 14 5.7 14 10.33c0 4.64 3.7 8.34 8.33 8.34V22c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1h-1.33c-3.1 0-5-2.46-5-5.34 0-2.39 1.94-4.33 4.33-4.33.55 0 1-.45 1-1V3c0-.55-.45-1-1-1" />
          </svg>

          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => {
                const swipe = swipePower(info.offset.x, info.velocity.x);
                if (swipe < -swipeConfidence) paginate(1);
                else if (swipe > swipeConfidence) paginate(-1);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <div className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-full border-4 border-brand-teal shadow-lg">
                <img
                  src={imageUrl}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mx-auto mb-6 text-2xl font-light italic md:text-3xl">
                “{quote}”
              </p>

              <p className="text-xl font-bold text-brand-teal">{name}</p>
              <p className="text-gray-400">{title}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center justify-center space-x-8">
          <button
            aria-label="Previous testimonial"
            onClick={() => paginate(-1)}
            className="group rounded-full border border-brand-teal/40 p-3 transition hover:bg-teal-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-white transition group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* dots */}
          <div className="flex space-x-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => i !== idx && setPage([i, i > idx ? 1 : -1])}
                aria-label={`Jump to testimonial ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition
                  ${
                    i === idx
                      ? "scale-125 bg-teal-500"
                      : "bg-gray-500 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>

          <button
            aria-label="Next testimonial"
            onClick={() => paginate(1)}
            className="group rounded-full border border-brand-teal/40 p-3 transition hover:bg-teal-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-white transition group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
