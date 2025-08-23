/* ─────────────────────────  About.tsx  ───────────────────────── */
"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import crok4itWorkspace from "../../assets/img/crok4it.png";

/* ── data (unchanged) ─────────────────────────────────────────── */
const teamMembers = [
  {
    name: "Dorra Saihi",
    role: "Founder & CEO",
    imageUrl: "https://placehold.co/400x400/6C22D9/ffffff?text=DS",
  },
  {
    name: "Yassine Khalfaoui",
    role: "Lead Cloud Architect",
    imageUrl: "https://placehold.co/400x400/4ADBC8/ffffff?text=YK",
  },
  {
    name: "Marouen Chaouachi",
    role: "Senior Software Engineer",
    imageUrl: "https://placehold.co/400x400/1a202c/ffffff?text=MC",
  },
];

/* ── helpers ──────────────────────────────────────────────────── */
/* card parallax based on cursor position */
function useCardParallax(range = 20) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      x.set((dx / rect.width) * range);
      y.set((dy / rect.height) * range);
    };

    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", () => {
      x.set(0);
      y.set(0);
    });

    return () => {
      el.removeEventListener("mousemove", handle);
    };
  }, [range, x, y]);

  return { ref, x, y };
}

/* variant presets */
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};
const cardShow = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About: React.FC = () => {
  /* reveal triggers */
  const blockRef = React.useRef<HTMLDivElement>(null);
  const blockIn = useInView(blockRef, { once: true, amount: 0.25 });

  const teamRef = React.useRef<HTMLDivElement>(null);
  const teamIn = useInView(teamRef, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      className="relative w-full bg-brand-dark py-20 md:py-32 text-white overflow-hidden"
    >
      {/* decorative radial gradient blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 left-1/2 top-1/2 h-[900px] w-[900px] rounded-full bg-purple-700/20 blur-[150px]"
      />

      <div className="container mx-auto px-4">
        {/* split block */}
        <div
          ref={blockRef}
          className="grid items-center gap-16 md:grid-cols-2 mb-28"
        >
          {/* image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={blockIn ? "visible" : "hidden"}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 h-full w-full -rotate-3 rounded-lg bg-purple-700/50" />
            <Image
              src={crok4itWorkspace}
              alt="Crok4it workspace"
              width={800} // Adjust based on your layout
              height={600} // Adjust based on your layout
              className="workspace-img"
            />
          </motion.div>

          {/* copy */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={blockIn ? "visible" : "hidden"}
          >
            <h2 className="text-4xl font-extrabold md:text-5xl">
              We&apos;re Not Just Consultants.
              <br />
              We&#39;re Your{" "}
              <span className="text-brand-teal">Technology Partners.</span>
            </h2>

            <p className="mt-6 text-lg text-gray-300">
              Founded in Luxembourg, Crok4IT was built on a single principle: to
              provide unparalleled IT expertise with a deeply collaborative,
              client-first approach.
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Our mission is to embed ourselves in your challenges and dedicate
              our collective experience to architecting solutions that deliver
              measurable, lasting value.
            </p>
          </motion.div>
        </div>

        {/* leadership grid */}
        <h3 className="text-center text-4xl font-extrabold">
          Meet&nbsp;Our&nbsp;Leadership
        </h3>

        <div
          ref={teamRef}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3"
        >
          {teamMembers.map(({ name, role, imageUrl }, i) => {
            const { ref, x, y } = useCardParallax(10);
            const rotateX = useTransform(y, [-10, 10], [8, -8]);
            const rotateY = useTransform(x, [-10, 10], [-8, 8]);

            return (
              <motion.article
                key={name}
                variants={cardShow}
                initial="hidden"
                animate={teamIn ? "visible" : "hidden"}
                transition={{ delay: 0.15 * i }}
              >
                <motion.div
                  ref={ref}
                  style={{ rotateX, rotateY }}
                  className="relative mx-auto mb-4 h-48 w-48 rounded-full shadow-xl will-change-transform"
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent transition-colors duration-300 group-hover:border-brand-teal" />
                </motion.div>
                <h4 className="text-center text-2xl font-bold">{name}</h4>
                <p className="text-center font-semibold text-brand-teal">
                  {role}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
