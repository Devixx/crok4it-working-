/* ─────────────────────────  Contact.tsx  ───────────────────────── */
"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";

/* ── motion presets ──────────────────────────────────────────── */
const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* reusable floating-label input ------------------------------- */
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  textarea?: boolean;
}
const FloatingInput: React.FC<InputProps> = ({ label, textarea, ...props }) => {
  const Tag: React.ElementType = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Tag
        {...props}
        className={`peer w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-white
          placeholder-transparent focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/50
          transition-all duration-300 ${textarea ? "min-h-[120px]" : ""}`}
        placeholder={label}
      />
      <label
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all
          duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm
          peer-focus:text-brand-teal"
      >
        {label}
      </label>
    </div>
  );
};

const Contact: React.FC = () => {
  /* form state */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  /* scroll reveal */
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  React.useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  /* handlers */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* Simulate async submit */
    setTimeout(() => {
      setFormStatus("Thank you! We'll be in touch shortly.");
      setFormData({ name: "", email: "", message: "" });
    }, 400);
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-brand-dark py-20 text-white md:py-32"
    >
      {/* decorative blurred gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-1/2 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-teal-500/20 blur-[120px]"
      />

      <div className="container mx-auto px-4">
        {/* heading */}
        <motion.div
          ref={ref}
          variants={containerStagger}
          initial="hidden"
          animate={controls}
          className="mb-20 text-center"
        >
          <motion.h2
            variants={itemFade}
            className="text-4xl font-extrabold md:text-5xl"
          >
            Let’s Build Something Great Together
          </motion.h2>
          <motion.p
            variants={itemFade}
            className="mx-auto mt-4 max-w-3xl text-lg text-gray-400"
          >
            Have a project in mind or just want to learn more about our process?
            We’d love to hear from you.
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          {/* ── contact info ─────────────────────────────── */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate={controls}
            className="space-y-10"
          >
            <motion.div variants={itemFade}>
              <h3 className="mb-4 text-3xl font-bold">Contact Information</h3>
              <p className="text-lg text-gray-400">
                Fill out the form or reach us directly:
              </p>
            </motion.div>

            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                ),
                heading: "Our Office",
                body: (
                  <>
                    123 Innovation Drive
                    <br />
                    Luxembourg City, L-1234
                  </>
                ),
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                ),
                heading: "Email Us",
                body: (
                  <a
                    href="mailto:contact@crok4it.com"
                    className="hover:underline"
                  >
                    contact@crok4it.com
                  </a>
                ),
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257
                       1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493
                       1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                ),
                heading: "Call Us",
                body: (
                  <a href="tel:+352288008" className="hover:underline">
                    +352 28 80 08
                  </a>
                ),
              },
            ].map(({ icon, heading, body }) => (
              <motion.div
                key={heading}
                variants={itemFade}
                className="flex items-start space-x-4"
              >
                <span className="rounded-full bg-purple-700/20 p-3 text-brand-teal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {icon}
                  </svg>
                </span>
                <div>
                  <h4 className="text-xl font-semibold">{heading}</h4>
                  <p className="text-gray-400">{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── form ─────────────────────────────────────── */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate={controls}
            className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemFade}>
                <FloatingInput
                  type="text"
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={itemFade}>
                <FloatingInput
                  type="email"
                  name="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={itemFade}>
                <FloatingInput
                  textarea
                  name="message"
                  label="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              {/* submit button */}
              <motion.div variants={itemFade}>
                <button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-md bg-purple-700 px-6 py-3 text-lg font-bold
                    text-white shadow-lg transition-transform duration-300 hover:scale-[1.03] focus:outline-none"
                >
                  <span className="relative z-10">Send Message</span>
                  {/* animated gradient shine */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -left-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent
                      opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                  />
                </button>
              </motion.div>

              {/* success message */}
              <AnimatePresence>
                {formStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-center font-semibold text-brand-teal"
                  >
                    {formStatus}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
