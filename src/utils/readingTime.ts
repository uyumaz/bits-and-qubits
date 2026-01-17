/**
 * Calculate estimated reading time for content
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
