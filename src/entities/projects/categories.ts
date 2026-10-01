export type ProjectCategory = {
  /**
   * Category slug, used for filtering and URLs.
   *
   * Example: /our-work/home-concepts
   */
  id: string;

  /** Display name. */
  label: string;

  /** URL slug. */
  slug: string;

  /** Short description, shown on the category page. */
  description?: string;

  /** Optional SEO overrides (managed in the admin). */
  seoTitle?: string;
  seoDescription?: string;

  /** Display order. */
  order: number;

  /** Show in navigation / filters. */
  visible: boolean;

  /** Published projects in the category. */
  projectsCount?: number;

  updatedAt?: string;
};

/** The "All" filter tab: not a real category, always first. */
export const allCategory: ProjectCategory = {
  id: "all",
  label: "All",
  slug: "all",
  description: "Browse all architectural projects.",
  order: 0,
  visible: true,
};
