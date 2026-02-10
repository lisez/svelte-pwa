# Copilot Instructions

## Build, Test, and Lint Commands

This is an Nx monorepo supporting both Bun and npm. Use the following commands:

- **Start Dev Server**: `npm run dev` or `bun dev`
  - Runs `nx dev @bun-svelte-pwa/app`
- **Build Production**: `npm run build` or `bun run build`
  - Runs `nx build @bun-svelte-pwa/app`
- **Type Check**: `npm run type-check` or `bun run type-check`
  - Runs `tsc` across all workspace modules
- **Run Unit Tests**: `npm test` or `bun test`
  - Runs Vitest for the app module
  - Example: `nx test @bun-svelte-pwa/app`
- **Run E2E Tests**: `npm run test:e2e` or `bun run test:e2e`
  - Runs Playwright tests
  - Example: `nx test:e2e @bun-svelte-pwa/app`

## High-Level Architecture

- **Monorepo Structure**: Managed by Nx, with code in `modules/`.
  - `modules/app`: The main Svelte PWA application.
  - `modules/shared`: Shared TypeScript utilities library.
- **Frontend Stack**: Svelte (Components), Vite (Build tool), Tailwind CSS (Styling).
- **PWA**: Configured in `modules/app/vite.config.ts` using `vite-plugin-pwa`.
- **Testing Strategy**:
  - **Unit**: Vitest with `@testing-library/svelte`. Note that Bun uses `happydom.ts` and `svelte-loader.ts` for native test runner compatibility.
  - **E2E**: Playwright configured in `modules/app/playwright.config.ts`.
- **Runtime Support**: Fully compatible with both Node.js/npm and Bun.

## Key Conventions

- **Module Management**: Use Nx commands to manage dependencies and task execution order.
- **Path Aliases**: Shared code is imported via `@bun-svelte-pwa/shared`.
- **Bun Specifics**: When working with Bun test runner, ensure `bunfig.toml` and `test-setup.ts` are respected.
- **Styling**: Use Tailwind utility classes directly in Svelte markup. Configuration is in `modules/app/tailwind.config.js`.
- **Project Configuration**: Each module has its own `project.json` (Nx config) and `package.json`.
