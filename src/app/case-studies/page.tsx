/* ─────────────────────────  app/case-studies/page.tsx  ───────────────────────── */
"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ── three.js particle wave background ─────────────────────────────── */
const ParticleWaveBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    console.log("✅ Starting CaseStudies Three.js setup");

    // COMMENT OUT FOR TESTING - uncomment for production
    // if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    //   console.log("⚠️ Reduced motion detected, skipping animation");
    //   return;
    // }

    /* scene setup */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* Create particle system with wave motion */
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Brand colors for particles
    const color1 = new THREE.Color(0x4adbc8); // teal
    const color2 = new THREE.Color(0x6c22d9); // purple
    const color3 = new THREE.Color(0xffffff); // white

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position particles in a grid-like pattern with some randomness
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      // Random colors from brand palette
      const colorChoice = Math.random();
      let selectedColor;
      if (colorChoice < 0.4) selectedColor = color1;
      else if (colorChoice < 0.7) selectedColor = color2;
      else selectedColor = color3;

      colors[i3] = selectedColor.r;
      colors[i3 + 1] = selectedColor.g;
      colors[i3 + 2] = selectedColor.b;

      // Random sizes
      sizes[i] = Math.random() * 3 + 1;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    /* Particle material */
    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      uniforms: {
        time: { value: 0.0 },
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Wave motion
          pos.y += sin(pos.x * 0.1 + time) * 2.0;
          pos.z += cos(pos.x * 0.1 + time * 0.7) * 1.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          float alpha = 1.0 - (distanceToCenter * 2.0);
          alpha = smoothstep(0.0, 1.0, alpha);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    console.log(`✅ Created ${particleCount} animated particles`);

    /* Create connecting lines between nearby particles */
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const updateLines = () => {
      // Clear existing lines
      lineGroup.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
        }
      });
      lineGroup.clear();

      const positionArray = particles.getAttribute("position").array;
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4adbc8,
        transparent: true,
        opacity: 0.1,
      });

      // Sample subset of particles for performance
      const sampleSize = 150;
      const indices = [];
      for (let i = 0; i < sampleSize; i++) {
        indices.push(Math.floor(Math.random() * particleCount));
      }

      for (let i = 0; i < indices.length; i++) {
        for (let j = i + 1; j < indices.length; j++) {
          const idx1 = indices[i] * 3;
          const idx2 = indices[j] * 3;

          const x1 = positionArray[idx1],
            y1 = positionArray[idx1 + 1],
            z1 = positionArray[idx1 + 2];
          const x2 = positionArray[idx2],
            y2 = positionArray[idx2 + 1],
            z2 = positionArray[idx2 + 2];

          const distance = Math.sqrt(
            (x2 - x1) * (x2 - x1) +
              (y2 - y1) * (y2 - y1) +
              (z2 - z1) * (z2 - z1)
          );

          if (distance < 12) {
            const geometry = new THREE.BufferGeometry();
            const linePositions = new Float32Array([x1, y1, z1, x2, y2, z2]);
            geometry.setAttribute(
              "position",
              new THREE.BufferAttribute(linePositions, 3)
            );

            const line = new THREE.Line(geometry, lineMaterial);
            lineGroup.add(line);
          }
        }
      }
    };

    /* Animation loop */
    const clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      const t = clock.getElapsedTime();
      frameCount++;

      // Update shader time uniform
      particleMaterial.uniforms.time.value = t * 0.5;

      // Update particle positions for wave effect
      const positionArray = particles.getAttribute("position").array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Add gentle drift
        positionArray[i3] += Math.sin(t * 0.1 + i * 0.01) * 0.002;
        positionArray[i3 + 2] += Math.cos(t * 0.15 + i * 0.01) * 0.002;
      }
      particles.getAttribute("position").needsUpdate = true;

      // Update connection lines periodically
      if (frameCount % 10 === 0) {
        updateLines();
      }

      // Gentle camera movement
      camera.position.x = Math.sin(t * 0.05) * 3;
      camera.position.y = Math.cos(t * 0.03) * 2;
      camera.lookAt(0, 0, 0);

      // Rotate particle system slowly
      particleSystem.rotation.y = t * 0.02;

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
      console.log("🧹 Cleaning up CaseStudies Three.js");
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particles.dispose();
      particleMaterial.dispose();

      lineGroup.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });

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
        opacity: 0.6,
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

const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Cloud Migration Success",
      client: "FinTech Innovators S.A.",
      description:
        "Complete cloud infrastructure transformation resulting in 30% cost reduction and 99.9% uptime.",
      results: ["30% cost reduction", "99.9% uptime", "50% faster deployment"],
      industry: "Financial Services",
      duration: "6 months",
      technologies: ["AWS", "Kubernetes", "Docker", "Terraform"],
    },
    {
      id: 2,
      title: "Digital Transformation",
      client: "LuxLogistics",
      description:
        "End-to-end digitalization of logistics operations increasing efficiency by 50%.",
      results: [
        "50% efficiency increase",
        "Real-time tracking",
        "Automated workflows",
      ],
      industry: "Logistics",
      duration: "8 months",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    },
    {
      id: 3,
      title: "Cybersecurity Implementation",
      client: "Weber & Fils",
      description:
        "Comprehensive security framework deployment protecting critical business assets.",
      results: [
        "Zero security incidents",
        "Full compliance",
        "Employee training",
      ],
      industry: "Manufacturing",
      duration: "4 months",
      technologies: ["SIEM", "Firewall", "VPN", "Multi-factor Auth"],
    },
    {
      id: 4,
      title: "API Modernization",
      client: "Luxembourg Bank Group",
      description:
        "Legacy system modernization with microservices architecture and API-first approach.",
      results: [
        "90% faster response times",
        "Improved scalability",
        "Better developer experience",
      ],
      industry: "Banking",
      duration: "12 months",
      technologies: ["GraphQL", "Microservices", "API Gateway", "MongoDB"],
    },
  ];

  return (
    <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden">
      <ParticleWaveBackground />
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold mb-6"
            >
              Success <span className="text-brand-teal">Stories</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Discover how we've helped businesses across Luxembourg transform
              their IT infrastructure and achieve remarkable results.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-20 md:pb-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -6,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-teal/50 hover:shadow-2xl"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span className="px-3 py-1 text-sm bg-brand-teal/20 text-brand-teal rounded-full font-semibold">
                          {study.industry}
                        </span>
                        <span className="text-sm text-gray-400">
                          Duration: {study.duration}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-brand-teal transition-colors">
                        {study.title}
                      </h2>
                      <p className="text-brand-teal text-lg font-semibold mb-4">
                        {study.client}
                      </p>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {study.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm bg-brand-purple/20 text-white rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-brand-teal mb-6">
                      Key Results
                    </h3>
                    <ul className="space-y-4">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center mr-3 mt-0.5">
                            <svg
                              className="w-4 h-4 text-brand-teal"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-lg">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 md:py-28 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "99.9%", label: "Uptime Achieved" },
              { number: "40%", label: "Average Cost Savings" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeUp} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-teal mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold mb-6"
            >
              Ready to Write Your{" "}
              <span className="text-brand-teal">Success Story</span>?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Let's discuss how we can help transform your business with
              cutting-edge IT solutions tailored to your unique needs.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="/#contact"
              className="inline-block rounded-md bg-brand-purple px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CaseStudiesPage;
