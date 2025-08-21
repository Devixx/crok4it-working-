// Define the structure of the Article object based on Strapi's API response
export interface Article {
  id: number;
  attributes: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Helper function to fetch data from the Strapi API
async function fetchAPI(path: string) {
  const requestUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      console.error(
        "Failed to fetch API:",
        response.status,
        response.statusText
      );
      return { data: [] }; // Return empty data on error
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from API:", error);
    return { data: [] }; // Return empty data on network error
  }
}

// Function to get all articles
export async function getArticles() {
  const data = await fetchAPI("/api/articles");
  return data.data as Article[];
}

// Function to get a single article by its slug
export async function getArticleBySlug(slug: string) {
  const data = await fetchAPI(`/api/articles?filters[slug][$eq]=${slug}`);
  // The response will be an array, so we return the first element
  if (data && data.data && data.data.length > 0) {
    return data.data[0] as Article;
  }
  return null;
}
