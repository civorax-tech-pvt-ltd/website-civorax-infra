export type BlogCategory = 
  | "construction-cost"
  | "house-design"
  | "permits-regulations"
  | "materials-engineering"
  | "interior-renovation";

export type BlogAuthor = {
  name: string;
  role: string;
  avatar: string;
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  categoryLabel: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  author: BlogAuthor;
  featured?: boolean;
  relatedServices: { label: string; href: string }[];
  relatedProjects?: { slug: string; title: string; category: string }[];
  relatedEstimatorAnchor?: boolean;
  faqs?: BlogFaqItem[];
};