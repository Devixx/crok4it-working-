import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CareersPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Join Our Team
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          We are always looking for talented and passionate individuals to join
          Crok4IT. If you are driven by innovation and committed to excellence,
          we would love to hear from you.
        </p>

        {/* Why Work With Us Section */}
        <div className="text-left max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Crok4IT?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Impactful Work
              </h3>
              <p className="text-gray-600">
                Solve complex challenges and deliver real-world solutions that
                drive success for our clients in Luxembourg and beyond.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Continuous Learning
              </h3>
              <p className="text-gray-600">
                We invest in your growth with dedicated training programs,
                certifications, and opportunities to master new technologies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Collaborative Culture
              </h3>
              <p className="text-gray-600">
                Join a supportive and inclusive team where every voice is heard
                and collective intelligence is our greatest asset.
              </p>
            </div>
          </div>
        </div>

        {/* Current Openings Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-left max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Current Openings
          </h2>
          <div className="space-y-6">
            {/* Example Job Opening */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold text-blue-600">
                Senior IT Consultant
              </h3>
              <p className="text-gray-500 mb-2">Luxembourg | Full-time</p>
              <p className="text-gray-700">
                We are seeking an experienced IT Consultant to lead client
                projects, provide strategic guidance, and contribute to our
                growing practice.
              </p>
            </div>

            {/* Placeholder for no open roles */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                There are currently no open positions, but we are always
                interested in hearing from talented professionals. Feel free to
                send your resume to{" "}
                <a
                  href="mailto:careers@crok4it.com"
                  className="text-blue-600 hover:underline"
                >
                  careers@crok4it.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CareersPage;
