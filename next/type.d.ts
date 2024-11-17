interface WPPost {
    id: number;
    date: string; // date in ISO 8601 format
    date_gmt: string; // date in ISO 8601 format
    guid: {
      rendered: string;
    };
    modified: string; // date in ISO 8601 format
    modified_gmt: string; // date in ISO 8601 format
    slug: string;
    status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
    type: string; // e.g., 'post'
    link: string; // URL to the post
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
      protected: boolean;
    };
    excerpt: {
      rendered: string;
      protected: boolean;
    };
    author: number; // user ID
    featured_media: number; // ID of featured media
    comment_status: 'open' | 'closed';
    ping_status: 'open' | 'closed';
    sticky: boolean;
    template: string;
    format: string; // e.g., 'standard', 'aside', etc.
    meta: any[]; // Custom meta fields, flexible
    categories: number[]; // Array of category IDs
    tags: number[]; // Array of tag IDs
    _links: {
      self: { href: string }[];
      collection: { href: string }[];
      about: { href: string }[];
      author: { embeddable: boolean; href: string }[];
      replies: { embeddable: boolean; href: string }[];
      'version-history': { href: string; count: number }[];
      'predecessor-version'?: { id: number; href: string }[];
      'wp:featuredmedia'?: { embeddable: boolean; href: string }[];
      'wp:attachment': { href: string }[];
      'wp:term': { taxonomy: string; embeddable: boolean; href: string }[];
      curies?: { name: string; href: string; templated: boolean }[];
    };
  }
  