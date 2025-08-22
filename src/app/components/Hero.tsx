/* ─────────────────────────  Hero.tsx  ───────────────────────── */
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BRAND_TEAL = "#4ADBC8";
const BRAND_PURPLE = "#6C22D9";

const PARALLAX = 0.5; // how far group moves toward cursor (0-1)

const Hero = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* scene, camera, renderer */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      el.clientWidth / el.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    /* geometry */
    const COUNT = 1_000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const teal = new THREE.Color(BRAND_TEAL);
    const purple = new THREE.Color(BRAND_PURPLE);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const c = Math.random() > 0.5 ? teal : purple;
      colors.set([c.r, c.g, c.b], i3);

      sizes[i] = 0.6 * Math.min(window.devicePixelRatio, 2); // ~1 px
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    /* shader material (unchanged) */
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec3 p = position;
          p.xy += vec2(
            sin(uTime*0.3 + p.y)*0.12,
            cos(uTime*0.25+ p.x)*0.12
          );
          vec4 mv = modelViewMatrix * vec4(p,1.);
          gl_PointSize = size * (300. / -mv.z);
          gl_Position  = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float a = smoothstep(0.5,0.0,length(d));
          gl_FragColor = vec4(vColor, a*0.8);
        }`,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* mouse parallax – move the whole group */
    const mouse = new THREE.Vector2();
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2; // −1 → 1
      mouse.y = (e.clientY / window.innerHeight - 0.5) * -2; // same
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* resize */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* loop */
    const clock = new THREE.Clock();
    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();

      /* ease group toward mouse */
      points.position.x += (mouse.x * PARALLAX - points.position.x) * 0.05;
      points.position.y += (mouse.y * PARALLAX - points.position.y) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    /* cleanup */
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      el.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  /* layout */
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen w-full flex-col justify-center overflow-hidden bg-brand-dark text-white"
    >
      <div ref={mountRef} className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Your Strategic Partner in{" "}
          <span className="text-brand-teal">Digital Transformation</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300 sm:text-xl">
          We architect, build, and secure the technology foundations that drive
          business growth for Luxembourg’s most ambitious companies.
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block rounded-md bg-purple-700 px-8 py-4 text-lg font-semibold transition-transform duration-300 hover:scale-105 hover:bg-brand-purple/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
        >
          Book a Free Consultation
        </a>
      </div>
    </section>
  );
};

export default Hero;
