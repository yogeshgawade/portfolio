import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/' is required for real URL paths such as /projects/ecommerce-platform.
// Deploying under a sub-path? Change it here; the router reads it as its basename.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
