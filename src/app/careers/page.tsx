/* ─────────────────────────  page.tsx (Careers)  ───────────────────────── */
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ── three.js background with DEBUGGING ─────────────────────────────────────── */
const NetworkBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      console.log("❌ Container not found");
      return;
    }

    console.log("✅ Starting Three.js setup");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      console.log("⚠️ Reduced motion detected, skipping animation");
      return;
    }

    /* scene setup */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    console.log("✅ Three.js renderer created");

    /* Create simple test cube first to verify everything works */
    const testGeometry = new THREE.BoxGeometry(2, 2, 2);
    const testMaterial = new THREE.MeshBasicMaterial({
      color: 0x4adbc8,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const testCube = new THREE.Mesh(testGeometry, testMaterial);
    scene.add(testCube);

    console.log("✅ Test cube added");

    /* Create nodes */
    const nodeCount = 30;
    const nodes: THREE.Mesh[] = [];

    const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x4adbc8,
      transparent: true,
      opacity: 1.0,
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      nodes.push(node);
      scene.add(node);
    }

    console.log(`✅ Created ${nodeCount} nodes`);

    /* Create static connections */
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6c22d9,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });

    const linePositions: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 8) {
          linePositions.push(
            nodes[i].position.x,
            nodes[i].position.y,
            nodes[i].position.z,
            nodes[j].position.x,
            nodes[j].position.y,
            nodes[j].position.z
          );
        }
      }
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    console.log(`✅ Created ${linePositions.length / 6} connections`);

    /* Animation loop */
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Rotate test cube
      testCube.rotation.x = t * 0.5;
      testCube.rotation.y = t * 0.3;

      // Animate nodes
      nodes.forEach((node, i) => {
        node.position.x += Math.sin(t * 0.5 + i) * 0.01;
        node.position.y += Math.cos(t * 0.3 + i) * 0.01;

        // Pulsing effect
        const scale = 1 + Math.sin(t * 3 + i) * 0.3;
        node.scale.setScalar(scale);
      });

      // Gentle camera movement
      camera.position.x = Math.sin(t * 0.2) * 3;
      camera.position.y = Math.cos(t * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    console.log("✅ Animation loop started");

    /* Resize handler */
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* Cleanup */
    return () => {
      console.log("🧹 Cleaning up Three.js");
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      testGeometry.dispose();
      testMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      style={{
        background: "transparent",
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
};

/* ── motion variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ── main component ──────────────────────────────────────────── */
const CareersPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const whyInView = useInView(whyRef, { once: true, amount: 0.2 });
  const jobsInView = useInView(jobsRef, { once: true, amount: 0.2 });

  const benefits = [
    {
      icon: "🚀",
      title: "Impactful Work",
      description:
        "Solve complex challenges and deliver real-world solutions that drive success for our clients in Luxembourg and beyond.",
    },
    {
      icon: "📚",
      title: "Continuous Learning",
      description:
        "We invest in your growth with dedicated training programs, certifications, and opportunities to master new technologies.",
    },
    {
      icon: "🤝",
      title: "Collaborative Culture",
      description:
        "Join a supportive and inclusive team where every voice is heard and collective intelligence is our greatest asset.",
    },
  ];

  const jobs = [
    {
      title: "Senior IT Consultant",
      location: "Luxembourg",
      type: "Full-time",
      description:
        "We are seeking an experienced IT Consultant to lead client projects, provide strategic guidance, and contribute to our growing practice.",
    },
    {
      title: "Cloud Architect",
      location: "Luxembourg",
      type: "Full-time",
      description:
        "Join our team to design and implement scalable cloud solutions for enterprise clients across various industries.",
    },
    {
      title: "Cybersecurity Specialist",
      location: "Luxembourg",
      type: "Full-time",
      description:
        "Help protect our clients' digital assets by implementing comprehensive security frameworks and incident response protocols.",
    },
  ];

  return (
    <main className="min-h-screen bg-brand-dark text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <NetworkBackground />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            ref={heroRef}
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-4xl font-extrabold md:text-6xl"
            >
              Join Our <span className="text-brand-teal">Innovation</span> Team
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-8 max-w-3xl text-lg text-gray-300 md:text-xl"
            >
              We are always looking for talented and passionate individuals to
              join Crok4IT. If you are driven by innovation and committed to
              excellence, we would love to hear from you.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#openings"
              className="inline-block rounded-md bg-brand-purple px-8 py-4 text-lg font-semibold transition-transform hover:scale-105"
            >
              View Opportunities
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            ref={whyRef}
            variants={stagger}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={fadeUp}
              className="mb-16 text-center text-3xl font-extrabold md:text-4xl"
            >
              Why <span className="text-brand-teal">Crok4IT</span>?
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-3">
              {benefits.map(({ icon, title, description }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-colors hover:border-brand-teal/50"
                >
                  <div className="mb-4 text-4xl">{icon}</div>
                  <h3 className="mb-4 text-xl font-bold text-brand-teal">
                    {title}
                  </h3>
                  <p className="text-gray-300">{description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            ref={jobsRef}
            variants={stagger}
            initial="hidden"
            animate={jobsInView ? "visible" : "hidden"}
            className="mx-auto max-w-4xl"
          >
            <motion.h2
              variants={fadeUp}
              className="mb-12 text-center text-3xl font-extrabold md:text-4xl"
            >
              Current <span className="text-brand-teal">Openings</span>
            </motion.h2>

            <div className="space-y-6">
              {jobs.map(({ title, location, type, description }, index) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-brand-teal/30"
                >
                  <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="mb-2 text-xl font-bold text-brand-teal">
                        {title}
                      </h3>
                      <p className="mb-3 text-gray-400">
                        {location} | {type}
                      </p>
                      <p className="text-gray-300">{description}</p>
                    </div>
                    <button className="rounded-md border border-brand-teal px-6 py-2 text-brand-teal transition-colors hover:bg-brand-teal hover:text-brand-dark">
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact for unlisted roles */}
            <motion.div
              variants={fadeUp}
              className="mt-12 rounded-lg border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <h3 className="mb-4 text-xl font-bold text-brand-teal">
                Don't See Your Role?
              </h3>
              <p className="mb-4 text-gray-300">
                We're always interested in hearing from talented professionals
                who share our passion for innovation.
              </p>
              <p className="text-gray-300">
                Send your resume to{" "}
                <a
                  href="mailto:careers@crok4it.com"
                  className="font-semibold text-brand-teal transition-colors hover:text-brand-teal/80 hover:underline"
                >
                  careers@crok4it.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeUp}
              className="mb-6 text-3xl font-extrabold md:text-4xl"
            >
              Ready to Shape the Future of{" "}
              <span className="text-brand-teal">Technology</span>?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-8 max-w-2xl text-lg text-gray-300"
            >
              Join a team that values innovation, collaboration, and excellence.
              Let's build something extraordinary together.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="mailto:careers@crok4it.com"
              className="inline-block rounded-md bg-brand-teal px-8 py-4 text-lg font-semibold text-brand-dark transition-transform hover:scale-105"
            >
              Start Your Journey
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CareersPage;
