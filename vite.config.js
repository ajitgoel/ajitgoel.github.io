import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resume: resolve(__dirname, 'resume.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog_authentication_spring_boot: resolve(__dirname, 'how-authentication-actually-works-spring-boot.html'),
        blog_event_driven_interview: resolve(__dirname, 'event-driven-architecture-message-brokers-interview-walkthrough.html'),
        blog_protobuf: resolve(__dirname, 'use-protobuf-net-to-improve-serialization-performance.html'),
        blog_sql_perf: resolve(__dirname, 'improving-sql-performance-encrypted-columns.html'),
        valentine_artha_reel: resolve(__dirname, 'valentine-artha-reel/index.html'),
      },
    },
  },
});
