import { MetadataRoute } from "next";

// Re-using our mock data to generate dynamic URLs
// In a real app, this data would be fetched from your CMS
const allCaseStudies = [
  { slug: "fintech-cloud-migration" },
  { slug: "logistics-app-development" },
];

const blogPosts = [
  { slug: "digital-transformation-trends-2025" },
  { slug: "cybersecurity-for-smes" },
  { slug: "leveraging-ai-in-business" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.crok4it.com"; // Replace with your actual domain

  const caseStudyUrls = allCaseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
  }));

  const blogPostUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...caseStudyUrls,
    ...blogPostUrls,
  ];
}
