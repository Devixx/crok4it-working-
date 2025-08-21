import React from "react";
import { Metadata } from "next"; // Import the Metadata type
import Link from "next/link";
import { getArticleBySlug } from "../../../lib/api";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// This function generates dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getArticleBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.attributes.title} | Crok4IT`,
    description: post.attributes.excerpt,
  };
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getArticleBySlug(params.slug);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl font-bold">Post not found</h1>
          <Link
            href="/blog"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            &larr; Back to all posts
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
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {post.attributes.title}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            By {post.attributes.author} on{" "}
            {format(new Date(post.attributes.publishedAt), "MMMM d, yyyy")}
          </p>

          <article className="prose lg:prose-xl max-w-none">
            <Markdown>{post.attributes.content}</Markdown>
          </article>

          <div className="mt-12 border-t pt-6">
            <Link
              href="/blog"
              className="font-semibold text-blue-600 hover:underline"
            >
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default BlogPostPage;
