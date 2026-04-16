import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resume: resolve(__dirname, 'resume.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog_recommendations: resolve(__dirname, 'personalized-health-recommendations.html'),
        blog_config_editor: resolve(__dirname, 'config-editor-technical-challenge.html'),
        blog_caas: resolve(__dirname, 'caas-orchestration-spel.html'),
      },
    },
  },
});
