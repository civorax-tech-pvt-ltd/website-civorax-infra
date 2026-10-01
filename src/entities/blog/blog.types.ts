export type BlogCategory = {
  slug: string;
  label: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  postsCount: number;
};

export type BlogAuthor = {
  name: string;
  role?: string;
  avatar: string | null;
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Custom SEO title written in the admin (used as-is); undefined = post title + site template. */
  seoTitle?: string;
  seoDescription: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  coverImage: string | null;
  coverAlt: string;
  /** ISO date-time. */
  publishedAt: string;
  updatedAt: string;
  /** YYYY-MM-DD, for display. */
  publishedDate: string;
  readingTime: string;
  author: BlogAuthor;
  featured?: boolean;
};

export type BlogPostDetail = BlogPost & {
  content: string;
  relatedServices: { label: string; href: string }[];
  relatedProjects: { slug: string; title: string; category: string }[];
  relatedEstimatorAnchor: boolean;
  faqs: BlogFaqItem[];
  related: BlogPost[];
};
