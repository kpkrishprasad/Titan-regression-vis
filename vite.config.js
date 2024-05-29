import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  base: './',  // Adjust this if deploying to a subpath
  build: {
    outDir: 'dist',  // Customize the output directory
  },
  // If you have issues with paths, this might be useful
  resolve: {
    alias: {
      '@': '/src',  // This allows you to use '@/somePath' as an alias to '/src/somePath'
    }
  }
});
