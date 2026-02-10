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
  // @ts-ignore - process may not exist in browser
  if (typeof process !== 'undefined' && process?.env?.NODE_ENV) {
    // @ts-ignore
    return process.env.NODE_ENV as 'development' | 'production' | 'test'
  }
  return 'development'
}
