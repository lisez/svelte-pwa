import { plugin } from 'bun';
import { compile, preprocess } from 'svelte/compiler';
import { readFileSync } from 'fs';
import sveltePreprocess from 'svelte-preprocess';

plugin({
  name: 'svelte-loader',
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      try {
        const source = readFileSync(path, 'utf-8');
        
        // Preprocess TypeScript and other features
        const preprocessed = await preprocess(source, sveltePreprocess(), {
          filename: path,
        });
        
        const { js } = compile(preprocessed.code, {
          filename: path,
          generate: 'dom',
          hydratable: false,
          css: 'injected',
        });

        return {
          contents: js.code,
          loader: 'js',
        };
      } catch (error) {
        throw new Error(`Failed to compile Svelte component at ${path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
  },
});
