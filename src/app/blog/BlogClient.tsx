/* ─────────────────────────  BlogClient.tsx  ───────────────────────── */
"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { format } from "date-fns";

/* ── three.js floating geometric background ─────────────────────────────── */
const FloatingGeometryBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    console.log("✅ Starting BlogClient Three.js setup");

    // COMMENT OUT FOR TESTING - uncomment for production
    // if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    //   console.log("⚠️ Reduced motion detected, skipping animation");
    //   return;
    // }

    /* scene setup */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* Create floating geometric shapes */
    const shapes: THREE.Mesh[] = [];
    const shapeCount = 25;

    // Different geometric shapes
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 8, 6),
      new THREE.ConeGeometry(0.3, 0.8, 8),
      new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8),
      new THREE.TetrahedronGeometry(0.4),
      new THREE.OctahedronGeometry(0.4),
    ];

    // Materials with brand colors
    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x4adbc8,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x6c22d9,
        transparent: true,
        opacity: 0.4,
        wireframe: false,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x4adbc8,
        transparent: true,
        opacity: 0.3,
        wireframe: false,
      }),
    ];

    // Create shapes with random properties
    for (let i = 0; i < shapeCount; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material =
        materials[Math.floor(Math.random() * materials.length)].clone();

      const shape = new THREE.Mesh(geometry, material);

      // Random positioning
      shape.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );

      // Random rotation
      shape.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Random scale
      const scale = 0.5 + Math.random() * 1.5;
      shape.scale.setScalar(scale);

      // Store initial values for animation
      (shape as any).userData = {
        initialY: shape.position.y,
        speedY: 0.01 + Math.random() * 0.02,
        speedRotation: 0.005 + Math.random() * 0.01,
        amplitude: 2 + Math.random() * 3,
      };

      shapes.push(shape);
      scene.add(shape);
    }

    console.log(`✅ Created ${shapeCount} floating shapes`);

    /* Create subtle connecting lines between nearby shapes */
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

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4adbc8,
        transparent: true,
        opacity: 0.15,
      });

      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const distance = shapes[i].position.distanceTo(shapes[j].position);
          if (distance < 8) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
              shapes[i].position.x,
              shapes[i].position.y,
              shapes[i].position.z,
              shapes[j].position.x,
              shapes[j].position.y,
              shapes[j].position.z,
            ]);

            geometry.setAttribute(
              "position",
              new THREE.BufferAttribute(positions, 3)
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

      // Animate shapes
      shapes.forEach((shape, i) => {
        const userData = (shape as any).userData;

        // Floating motion
        shape.position.y =
          userData.initialY +
          Math.sin(t * userData.speedY + i) * userData.amplitude;

        // Rotation
        shape.rotation.x += userData.speedRotation;
        shape.rotation.y += userData.speedRotation * 0.7;
        shape.rotation.z += userData.speedRotation * 0.5;

        // Subtle scaling pulse
        const pulse = 1 + Math.sin(t * 2 + i * 0.5) * 0.1;
        const baseScale = 0.5 + Math.random() * 0.1;
        shape.scale.setScalar(baseScale * pulse);

        // Drift slowly
        shape.position.x += Math.sin(t * 0.1 + i) * 0.005;
        shape.position.z += Math.cos(t * 0.15 + i) * 0.003;
      });

      // Update connection lines every few frames
      if (frameCount % 5 === 0) {
        updateLines();
      }

      // Gentle camera movement
      camera.position.x = Math.sin(t * 0.05) * 2;
      camera.position.y = Math.cos(t * 0.03) * 1;
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
      console.log("🧹 Cleaning up BlogClient Three.js");
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      geometries.forEach((geo) => geo.dispose());
      materials.forEach((mat) => mat.dispose());

      shapes.forEach((shape) => {
        if (shape.geometry) shape.geometry.dispose();
        if (shape.material) {
          if (Array.isArray(shape.material)) {
            shape.material.forEach((mat) => mat.dispose());
          } else {
            shape.material.dispose();
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
        opacity: 0.4,
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
  visible: { transition: { staggerChildren: 0.12 } },
};

interface Article {
  id: string;
  attributes: {
    title: string;
    slug: string;
    author: string;
    publishedAt: string;
    excerpt: string;
  };
}

interface BlogClientProps {
  articles: Article[] | null;
}

const BlogClient: React.FC<BlogClientProps> = ({ articles }) => {
  // Check if articles exist and is an array
  if (!articles || !Array.isArray(articles)) {
    return (
      <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden">
        <FloatingGeometryBackground />
        <Header />
        <div className="container mx-auto px-4 py-20 md:py-28 text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-brand-teal mb-4">
            Our Insights
          </h1>
          <p className="text-gray-300 text-lg">
            Could not load articles at this time. Please try again later.
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden">
      <FloatingGeometryBackground />
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
              Our <span className="text-brand-teal">Insights</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Explore our latest articles, insights, and analysis on the world
              of IT and digital transformation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 md:pb-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto space-y-8"
          >
            {articles
              .filter((post) => post && post.attributes)
              .map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  whileHover={{
                    y: -4,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="group rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-teal/50 hover:bg-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-brand-teal transition-colors">
                        <Link
                          href={`/blog/${post.attributes.slug}`}
                          className="hover:text-brand-teal"
                        >
                          {post.attributes.title}
                        </Link>
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          By {post.attributes.author}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {format(
                            new Date(post.attributes.publishedAt),
                            "MMMM d, yyyy"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {post.attributes.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.attributes.slug}`}
                    className="inline-flex items-center font-semibold text-brand-teal hover:text-brand-teal/80 transition-colors group-hover:translate-x-1 transform transition-transform"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.article>
              ))}
          </motion.div>

          {/* No Articles Message */}
          {articles.filter((post) => post && post.attributes).length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-brand-teal mb-2">
                  No Articles Yet
                </h3>
                <p className="text-gray-300">
                  We're working on some great content. Check back soon!
                </p>
              </div>
            </motion.div>
          )}
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
              Stay Updated with Our{" "}
              <span className="text-brand-teal">Latest Insights</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Subscribe to our newsletter to get the latest technology insights,
              industry trends, and expert analysis delivered directly to your
              inbox.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="/#contact"
              className="inline-block rounded-md bg-purple-700 px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogClient;
