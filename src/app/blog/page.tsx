/* ─────────────────────────  page.tsx (Blog Server Component)  ───────────────────────── */
import React from "react";
import { getArticles } from "../../lib/api";
import BlogClient from "./BlogClient";

const BlogPage = async () => {
  // Fetch articles on the server
  const articles = await getArticles();

  // Pass data to client component
  return <BlogClient articles={articles} />;
};

export default BlogPage;
