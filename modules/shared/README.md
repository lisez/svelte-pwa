# @bun-svelte-pwa/shared

Shared utilities and types for the Bun Svelte PWA monorepo.

## Usage

```typescript
import { formatDate, generateId, delay } from '@bun-svelte-pwa/shared'

// Format a date
const formatted = formatDate(new Date())

// Generate a unique ID
const id = generateId()

// Add a delay
await delay(1000)
```

## Available Functions

- `formatDate(date: Date): string` - Format a date to a readable string
- `generateId(): string` - Generate a random unique ID
- `delay(ms: number): Promise<void>` - Async delay utility
- `isBrowser(): boolean` - Check if running in browser
- `getEnvironment()` - Get current environment (development/production/test)
