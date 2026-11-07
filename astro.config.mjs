// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://boliviaunpacked.tourground.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline all CSS: no render-blocking stylesheet requests.
    inlineStylesheets: 'always',
  },
  prefetch: false,
  devToolbar: { enabled: false },
});
