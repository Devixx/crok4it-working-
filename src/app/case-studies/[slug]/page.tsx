import React from "react";
import { Metadata } from "next"; // Import the Metadata type
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import Markdown from "markdown-to-jsx";

// Mock data for all case studies. In a real app, you'd fetch this from a CMS.
const allCaseStudies = [
  {
    slug: "fintech-cloud-migration",
    client: "FinTech Innovators S.A.",
    title: "Seamless Cloud Migration Reduces Infrastructure Costs by 30%",
    summary:
      "We architected and executed a full-scale cloud migration to AWS for a leading Luxembourg FinTech, enhancing security, scalability, and reducing operational overhead.",
    imageUrl:
      "https://placehold.co/1200x600/3b82f6/ffffff?text=FinTech+Cloud+Architecture",
    content: `
### The Challenge
FinTech Innovators S.A., a rapidly growing financial technology firm in Luxembourg, was facing significant challenges with their on-premise server infrastructure. As their customer base expanded, they struggled with scalability issues, rising maintenance costs, and concerns about meeting stringent financial industry security and compliance standards. They needed a modern, secure, and scalable solution that would support their future growth without compromising performance.

### Our Solution
Crok4IT was engaged to design and execute a comprehensive cloud migration strategy. Our certified cloud architects conducted a thorough audit of their existing systems and developed a phased migration plan to Amazon Web Services (AWS).

1.  **Infrastructure as Code (IaC):** We utilized Terraform to define and manage the entire cloud infrastructure, ensuring a repeatable, secure, and easily auditable environment.
2.  **Security & Compliance:** A multi-layered security approach was implemented, leveraging AWS security groups, IAM roles, and advanced threat detection services to meet and exceed financial regulatory requirements.
3.  **CI/CD Pipeline:** We established a robust continuous integration and continuous delivery (CI/CD) pipeline using AWS CodePipeline and CodeDeploy, automating the testing and deployment process to accelerate development cycles and reduce manual errors.

### The Results
The migration to AWS was completed on schedule and under budget, delivering transformative results for the client.

- **30% Reduction in Infrastructure Costs:** By moving to a consumption-based cloud model, the client eliminated capital expenditure on hardware and significantly reduced operational overhead.
- **Enhanced Scalability:** The new infrastructure can now scale automatically to handle peak transaction loads, ensuring a seamless experience for their customers.
- **Improved Security Posture:** The solution provided a more secure and compliant environment, giving the client and their customers greater confidence.
- **Increased Developer Velocity:** The automated CI/CD pipeline enabled their development team to release new features 50% faster.
    `,
  },
  // ... other case studies would go here
];

// This function generates dynamic metadata for each case study
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const study = allCaseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} | Crok4IT Case Study`,
    description: study.summary,
  };
}

const CaseStudyPage = ({ params }: { params: { slug: string } }) => {
  const study = allCaseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl font-bold">Case Study not found</h1>
          <Link
            href="/"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            &larr; Back to Homepage
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-semibold">{study.client}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 my-4">
            {study.title}
          </h1>
          <img
            src={study.imageUrl}
            alt={study.title}
            className="w-full rounded-lg shadow-lg my-8"
          />

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
            <article className="prose lg:prose-xl max-w-none">
              <Markdown>{study.content}</Markdown>
            </article>
            <div className="mt-12 border-t pt-6">
              <Link
                href="/"
                className="font-semibold text-blue-600 hover:underline"
              >
                &larr; Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CaseStudyPage;
