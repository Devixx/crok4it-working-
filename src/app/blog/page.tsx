import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { getArticles } from "../../lib/api"; // Import the new API function
import { format } from "date-fns"; // A library to format dates nicely

const BlogPage = async () => {
  // Fetch articles from the Strapi API instead of using mock data
  const articles = await getArticles();

  // A check to ensure articles exist and is an array before trying to map
  if (!articles || !Array.isArray(articles)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 md:py-28 text-center">
          <p>Could not load articles.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our latest articles, insights, and analysis on the world of
            IT and digital transformation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {articles
            .filter((post) => post && post.attributes) // Add this line to filter out invalid posts
            .map((post) => (
              <div
                key={post.id}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  <Link
                    href={`/blog/${post.attributes.slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.attributes.title}
                  </Link>
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  By {post.attributes.author} on{" "}
                  {format(
                    new Date(post.attributes.publishedAt),
                    "MMMM d, yyyy"
                  )}
                </p>
                <p className="text-gray-600 mb-6">{post.attributes.excerpt}</p>
                <Link
                  href={`/blog/${post.attributes.slug}`}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Read More &rarr;
                </Link>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default BlogPage;
