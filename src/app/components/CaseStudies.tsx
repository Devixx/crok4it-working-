import React from "react";
import Link from "next/link";

const featuredCaseStudies = [
  {
    slug: "fintech-cloud-migration",
    client: "FinTech Innovators S.A.",
    title: "Seamless Cloud Migration Reduces Infrastructure Costs by 30%",
    summary:
      "We architected and executed a full-scale cloud migration to AWS for a leading Luxembourg FinTech, enhancing security, scalability, and reducing operational overhead.",
    imageUrl: "https://placehold.co/600x400/6C22D9/ffffff?text=Cloud+Migration",
  },
  {
    slug: "logistics-app-development",
    client: "LuxLogistics",
    title: "Custom Application Boosts Operational Efficiency by 50%",
    summary:
      "Developed a bespoke logistics management application that automated key workflows, providing real-time tracking and optimizing delivery routes for a major logistics provider.",
    imageUrl: "https://placehold.co/600x400/4ADBC8/ffffff?text=App+Development",
  },
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="w-full bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark">
            Our Success Stories
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            We deliver tangible results. Discover how we've helped businesses
            like yours overcome complex challenges and achieve their strategic
            goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {featuredCaseStudies.map((study) => (
            <div
              key={study.slug}
              className="group relative rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={study.imageUrl}
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="text-sm font-semibold text-brand-teal mb-2">
                  {study.client}
                </p>
                <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="font-semibold text-white group-hover:text-brand-teal transition-colors duration-300 flex items-center"
                >
                  Read Case Study
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
