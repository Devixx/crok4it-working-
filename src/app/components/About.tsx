/* ─────────────────────────  About.tsx  ───────────────────────── */
"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

/* ── data ────────────────────────────────────────────────────── */
const teamMembers = [
  {
    name: "Marouen Chaouachi",
    role: "Founder & CEO",
    imageUrl: "https://placehold.co/400x400/6C22D9/ffffff?text=MC",
  },
  {
    name: "Jane Doe",
    role: "Lead Cloud Architect",
    imageUrl: "https://placehold.co/400x400/4ADBC8/ffffff?text=JD",
  },
  {
    name: "John Smith",
    role: "Head of Cybersecurity",
    imageUrl: "https://placehold.co/400x400/1a202c/ffffff?text=JS",
  },
];

/* motion presets ------------------------------------------------ */
const imgVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -4 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7 } },
};

const cardVariants = {
  off: { opacity: 0, y: 40 },
  on: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const About: React.FC = () => {
  /* trigger main block once 20 % is visible */
  const ref = React.useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      className="w-full bg-brand-dark py-20 md:py-28 text-white"
    >
      <div className="container mx-auto px-4">
        {/* ── intro split block ────────────────────────────── */}
        <motion.div
          ref={ref}
          variants={imgVariants}
          initial="hidden"
          animate={shown ? "visible" : "hidden"}
          className="grid items-center gap-16 md:grid-cols-2 mb-24"
        >
          <div className="relative">
            {/* decorative skewed shadow */}
            <div className="absolute -top-4 -left-4 h-full w-full -rotate-3 rounded-lg bg-brand-purple/50"></div>

            <img
              src="https://placehold.co/600x400/1a202c/ffffff?text=Crok4IT+Workspace"
              alt="Crok4IT Team Collaborating"
              className="relative z-10 rounded-lg shadow-2xl"
            />
          </div>

          <div>
            <h2 className="mb-6 text-4xl font-extrabold md:text-5xl">
              We're Not Just Consultants.
              <br />
              We're Your{" "}
              <span className="text-brand-teal">Technology Partners.</span>
            </h2>
            <p className="mb-4 text-lg text-gray-300">
              Founded in Luxembourg, Crok4IT was built on a single principle: to
              provide unparalleled IT expertise with a deeply collaborative,
              client-first approach. We believe that technology should be an
              enabler of ambition, not a barrier to it.
            </p>
            <p className="text-lg text-gray-300">
              Our mission is to work alongside you as a true partner, embedding
              ourselves in your challenges and dedicating our collective
              experience to architecting solutions that deliver measurable,
              lasting value.
            </p>
          </div>
        </motion.div>

        {/* ── leadership grid ─────────────────────────────── */}
        <h3 className="mb-16 text-center text-4xl font-extrabold">
          Meet&nbsp;Our&nbsp;Leadership
        </h3>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map(({ name, role, imageUrl }, i) => (
            <motion.article
              key={name}
              variants={cardVariants}
              initial="off"
              animate={shown ? "on" : "off"}
              transition={{ delay: 0.15 * i }}
              whileHover={{
                y: -6,
                scale: 1.04,
                transition: { type: "spring", stiffness: 260, damping: 18 },
              }}
              className="group text-center"
            >
              <div className="relative inline-block mb-4">
                <motion.img
                  whileHover={{ rotate: 2 }}
                  src={imageUrl}
                  alt={name}
                  className="h-48 w-48 rounded-full object-cover shadow-lg"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent transition-colors duration-300 group-hover:border-brand-teal"></div>
              </div>
              <h4 className="text-2xl font-bold">{name}</h4>
              <p className="font-semibold text-brand-teal">{role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
