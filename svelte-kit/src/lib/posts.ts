export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  cover?: string;
  content: string; // HTML for simplicity
};

export const posts: Post[] = [
  {
    slug: 'welcome-to-our-blog',
    title: 'Welcome to our blog',
    excerpt: 'News, tips and updates about our services and products.',
    date: new Date().toISOString(),
    cover: '/images/blog1.png',
    content: '<p>Thanks for stopping by! We will post updates, guides, and product highlights here.</p>'
  },
  {
    slug: 'maintaining-your-tools',
    title: 'Maintaining your tools',
    excerpt: 'Simple tips to extend the life of your gear.',
    date: new Date().toISOString(),
    cover: '/images/blog2.png',
    content: '<p>Keep blades sharp, clean after use, and store in a dry place. Regular maintenance goes a long way.</p>'
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
} 
