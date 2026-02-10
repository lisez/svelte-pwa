import { plugin } from 'bun';
import { compile } from 'svelte/compiler';
import { readFileSync } from 'fs';

plugin({
  name: 'svelte-loader',
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, ({ path }) => {
      try {
        const source = readFileSync(path, 'utf-8');
        const { js } = compile(source, {
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
