import { plugin } from 'bun';
import { compile, compileModule, preprocess } from 'svelte/compiler';
import { readFileSync } from 'fs';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Create preprocessor once for reuse
const preprocessor = vitePreprocess();

plugin({
  name: 'svelte-loader',
  setup(build) {
    build.onLoad({ filter: /\.svelte(\.[jt]s)?$/ }, async ({ path }) => {
      try {
        const source = readFileSync(path, 'utf-8');
        const isSvelteFile = path.endsWith('.svelte');
        
        let js;

        if (isSvelteFile) {
          // Preprocess TypeScript and other features
          let codeToCompile = source;
          try {
            const preprocessed = await preprocess(source, preprocessor, {
              filename: path,
            });
            codeToCompile = preprocessed.code;
          } catch (error) {
            throw new Error(`Failed to preprocess Svelte component at ${path}: ${error instanceof Error ? error.message : String(error)}`);
          }
          
          // Compile the preprocessed code
          try {
            const result = compile(codeToCompile, {
              filename: path,
              generate: 'client',
              css: 'injected',
            });
            js = result.js;
          } catch (error) {
            throw new Error(`Failed to compile Svelte component at ${path}: ${error instanceof Error ? error.message : String(error)}`);
          }
        } else {
          // Compile Svelte module (.svelte.js/.svelte.ts)
          try {
            const result = compileModule(source, {
              filename: path,
              generate: 'client',
            });
            js = result.js;
          } catch (error) {
             throw new Error(`Failed to compile Svelte module at ${path}: ${error instanceof Error ? error.message : String(error)}`);
          }
        }

        return {
          contents: js.code,
          loader: 'js',
        };
      } catch (error) {
        // Re-throw if it's already our formatted error
        if (error instanceof Error && (error.message.includes('Failed to preprocess') || error.message.includes('Failed to compile'))) {
          throw error;
        }
        // Otherwise, wrap in a generic error
        throw new Error(`Failed to process Svelte component at ${path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
  },
});
