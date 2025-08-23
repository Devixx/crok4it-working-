"use client";

import React, { useState } from "react";

const LeadMagnetCTA = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Lead magnet email submitted:", email);
      setStatus("Thank you! Your guide is on its way.");
      setEmail("");
    }
  };

  return (
    <section className="relative w-full bg-purple-700 text-white py-20 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Unlock Your Business Potential
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Download our free guide, &quot;The Luxembourg SME&#39;s Roadmap to
          Secure Cloud Adoption,&quot; and learn the 5 critical steps to
          modernize your infrastructure.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-5 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-brand-teal/50 transition-shadow duration-300"
            required
          />
          <button
            type="submit"
            className="bg-teal-500 text-brand-dark px-8 py-3 rounded-md font-bold hover:bg-white transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Download Now
          </button>
        </form>
        {status && <p className="mt-4 text-white font-semibold">{status}</p>}
      </div>
    </section>
  );
};

export default LeadMagnetCTA;
