import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // other plugins,
  ],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
});