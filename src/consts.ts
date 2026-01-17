export const SITE_TITLE = 'Bits & Qubits';
export const SITE_DESCRIPTION = 'Exploring AI-driven software engineering, architecture decisions, and the occasional journey into space and quantum realms.';
export const SITE_AUTHOR = 'Your Name';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export const CATEGORIES = {
  'ai-engineering': {
    name: 'AI-Driven Engineering',
    color: 'indigo',
    description: 'Exploring how AI transforms software development practices',
  },
  'architecture': {
    name: 'Software Architecture',
    color: 'emerald',
    description: 'Design patterns, system design, and architectural decisions',
  },
  'leadership': {
    name: 'Engineering Leadership',
    color: 'amber',
    description: 'Leading teams, building culture, and growing engineers',
  },
  'curiosity': {
    name: 'The Curiosity Corner',
    color: 'pink',
    description: 'Adventures in quantum computing, space, and beyond',
  },
} as const;

export type Category = keyof typeof CATEGORIES;

export const SOCIAL_LINKS = {
  github: 'https://github.com/uyumaz',
  linkedin: 'https://linkedin.com/in/uyumaz',
};
