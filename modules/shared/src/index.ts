/**
 * Shared utilities for the Bun Svelte PWA monorepo
 */

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check if code is running in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Get environment name
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  // Check if running in Node.js environment using a type-safe approach
  try {
    // Use dynamic property access to avoid TypeScript errors
    const g = globalThis as Record<string, unknown>;
    if ('process' in g && g.process !== null && typeof g.process === 'object') {
      const proc = g.process as { env?: Record<string, string> };
      const env = proc.env?.NODE_ENV;
      if (env === 'development' || env === 'production' || env === 'test') {
        return env;
      }
    }
  } catch {
    // If any error occurs, fall through to default
  }
  return 'development'
}
