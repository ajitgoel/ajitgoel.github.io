import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resume: resolve(__dirname, 'resume.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog_helpdesk_1: resolve(__dirname, 'helpdesk-agent-series-1-from-prd-to-prototype.html'),
        blog_helpdesk_2: resolve(__dirname, 'helpdesk-agent-series-2-request-lifecycle.html'),
        blog_helpdesk_3: resolve(__dirname, 'helpdesk-agent-series-3-rag-and-knowledge-pipeline.html'),
        blog_helpdesk_4: resolve(__dirname, 'helpdesk-agent-series-4-guardrails-and-tool-scoping.html'),
        blog_helpdesk_5: resolve(__dirname, 'helpdesk-agent-series-5-hitl-observability-and-production-path.html'),
        blog_event_driven_interview: resolve(__dirname, 'event-driven-architecture-message-brokers-interview-walkthrough.html'),
        blog_recommendations: resolve(__dirname, 'personalized-health-recommendations.html'),
        blog_config_editor: resolve(__dirname, 'config-editor-technical-challenge.html'),
        blog_caas: resolve(__dirname, 'caas-orchestration-spel.html'),
        blog_protobuf: resolve(__dirname, 'use-protobuf-net-to-improve-serialization-performance.html'),
        blog_sql_perf: resolve(__dirname, 'improving-sql-performance-encrypted-columns.html'),
      },
    },
  },
});
